import Pet from "../Models/pet.models.js";
import Adopter from "../Models/adopt.model.js";
import User from "../Models/user.models.js";
import { createError } from "../utils/error.js";
import sendEmail from "../utils/emailservice.js"; 

// Submit an adoption request
export const submitAdoptionRequest = async (req, res, next) => {
  try {
    const { petId, adopterInfo } = req.body;

    // Check if this person (email) already has a pending request for this specific pet
    const existingRequest = await Adopter.findOne({
      email: adopterInfo.email,
      petId: petId,
      status: { $in: ["pending", "approved"] } // Check both pending and approved status
    });

    // if (existingRequest) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You already have an active adoption request for this pet"
    //   });
    // }

    // Fetch pet details
    const pet = await Pet.findById(petId);
    if (!pet) return next(createError(404, "Pet not found"));

    // Create and save adopter record
    const adopter = new Adopter({
      ...adopterInfo,
      petId,
      createdAt: new Date(),
    });

    await adopter.save();

    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Unable to process adoption request. Admin account not found."
      });
    }

    // Send email notification to the adopter
    const emailSubject = "Adoption Request Confirmation";
    const emailBody = `
      <p>Hello ${adopterInfo.fullName},</p>
      <p>Thank you for your adoption request for <strong>${pet.name}</strong>.</p>
      <p><strong>Pet Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${pet.name}</li>
        <li><strong>Type:</strong> ${pet.type}</li>
        <li><strong>Breed:</strong> ${pet.breed}</li>
      </ul>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${adopterInfo.fullName}</li>
        <li><strong>Email:</strong> ${adopterInfo.email}</li>
        <li><strong>Phone:</strong> ${adopterInfo.phone}</li>
      </ul>
      <p>Our admin team will review your request and get back to you soon.</p>
      <p>Best Regards,<br>Pet Adoption System</p>
    `;

    const emailSent = await sendEmail(adopterInfo.email, emailSubject, emailBody);
    
    if (!emailSent) {
      console.error("Failed to send email to adopter");
      // Still return success to user since the adoption request was saved
    }

    res.status(201).json({
      success: true,
      message: "Your adoption request has been submitted successfully. Our admin team will review your request and get back to you soon.",
    });
  } catch (err) {
    next(err);
  }
};

// Get all adoption requests for admin
export const getAdoptionRequests = async (req, res, next) => {
  try {
    const requests = await Adopter.find()
      .populate("petId", "name type breed") // Fixed: Changed 'pet' to 'petId' to match schema
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (err) {
    next(err);
  }
};