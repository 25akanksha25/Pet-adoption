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

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have an active adoption request for this pet"
      });
    }

    // Create and save adopter record
    const adopter = new Adopter({
      ...adopterInfo,
      petId,
      createdAt: new Date(),
    });

    await adopter.save();

    // Fetch pet details
    const pet = await Pet.findById(petId);
    if (!pet) return next(createError(404, "Pet not found"));

    // Check if rehomer email exists
    if (!pet.rehomerEmail) {
      return res.status(400).json({
        success: false,
        message: "Unable to process adoption request. Rehomer information not found."
      });
    }

    // Find the rehomer's user details
    const rehomer = await User.findOne({ email: pet.rehomerEmail });
    if (!rehomer) {
      return res.status(400).json({
        success: false,
        message: "Unable to process adoption request. Rehomer account not found."
      });
    }

    // Send email notification to the rehomer
    const emailSubject = "New Adoption Request for Your Pet";
    const emailBody = `
      <p>Hello ${rehomer.name || 'Pet Rehomer'},</p>
      <p>Someone has shown interest in adopting <strong>${pet.name}</strong>.</p>
      <p><strong>Adopter Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${adopterInfo.fullName}</li>
        <li><strong>Email:</strong> ${adopterInfo.email}</li>
        <li><strong>Phone:</strong> ${adopterInfo.phone}</li>
      </ul>
      <p>Please reach out to the adopter directly to proceed.</p>
      <p>Best Regards,<br>Pet Adoption Team</p>
    `;

    await sendEmail(pet.rehomerEmail, emailSubject, emailBody);

    res.status(201).json({
      success: true,
      message: "Adoption request submitted successfully",
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