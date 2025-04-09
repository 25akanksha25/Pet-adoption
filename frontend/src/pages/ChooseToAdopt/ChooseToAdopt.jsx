import React, { useEffect, useState } from "react";
import "./ChooseToAdopt.css";
import FormStep1 from "../../components/FormSteps/FormStep1";
import FormStep2 from "../../components/FormSteps/FormStep2";
import FormStep3 from "../../components/FormSteps/FormStep3";
import FormStep4 from "../../components/FormSteps/FormStep4";
import FormStep5 from "../../components/FormSteps/FormStep5";
import FormStep6 from "../../components/FormSteps/FormStep6";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Payment Link Function
export const paymentLink = async () => {
  try {
    const response = await axios.post(`http://localhost:8080/api/payment`);
    return response.data.data.paymentLinkUrl;
  } catch (err) {
    console.log(err);
  }
};

const ChooseToAdopt = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;
  const navigate = useNavigate();
  const progressBarImage = `/assets/steps/step${currentStep + 1}.png`;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get petId from location state or query params
  const [selectedPet, setSelectedPet] = useState(() => {
    if (location.state?.petId) {
      return { petId: location.state.petId, petName: location.state.petName || '' };
    }
    const searchParams = new URLSearchParams(location.search);
    const petId = searchParams.get('petId');
    const petName = searchParams.get('petName') || '';
    return petId ? { petId, petName } : null;
  });

  const [paymentLinkUrl, setPaymentLinkUrl] = useState("");

  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    email: "",
    phone: "",
    govtId: "",
    agreedToTerms: false,
    
    // Address Information
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    country: "India",
    zipcode: "",
    
    // Housing Details
    residenceType: "",
    housingStatus: "",
    
    // Home Environment
    spaceSize: "",
    hasYard: false,
    hasFence: "",
    neighborhoodType: "",
    nearbyAreas: "",
    timeAtHome: "",
    
    // Household Information
    totalMembers: 0,
    hasChildren: false,
    allAgree: false,
    
    // Pet Experience
    hadPetsBefore: false,
    currentlyHasPets: false,
    adoptionReason: "",
    petCareKnowledge: [],
    
    // Single image upload
    image: null,
    
    // Default status
    status: "pending"
  });

  const handleFormDataChange = (field, value, nestedObject = null) => {
    if (nestedObject) {
      setFormData(prevData => ({
        ...prevData,
        [nestedObject]: {
          ...prevData[nestedObject],
          [field]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [field]: value
      }));
    }
  };

  // Handle terms agreement changes from FormStep1
  const handleTermsChange = (isAgreed) => {
    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions to proceed");
    }
    handleFormDataChange("agreedToTerms", isAgreed);
  };

  const handleImageUpload = (uploadedImage) => {
    setFormData(prevData => ({
      ...prevData,
      image: uploadedImage
    }));
  };

  useEffect(() => {
    const fetchPaymentLink = async () => {
      const response = await paymentLink();
      setPaymentLinkUrl(response);
    };
    fetchPaymentLink();
  }, []);

  const validateForm = () => {
    if (!selectedPet?.petId) {
      toast.error("Please select a pet first");
      return false;
    }

    // Terms and conditions validation
    if (currentStep === 0 && !formData.agreedToTerms) {
      toast.error("You must agree to the terms and conditions");
      return false;
    }

    // Phone validation (10 digits)
    if (currentStep === 0 && formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    // ZIP code validation (6 digits)
    if (currentStep === 1 && formData.zipcode && !/^[1-9][0-9]{5}$/.test(formData.zipcode)) {
      toast.error("ZIP code must be 6 digits");
      return false;
    }

    const requiredFields = {
      0: {
        base: ["fullName", "email", "phone", "govtId", "agreedToTerms"],
      },
      1: {
        base: ["streetAddress", "city", "state", "country", "zipcode", "residenceType", "housingStatus"]
      },
      2: {
        base: ["spaceSize", "hasYard", "hasFence", "neighborhoodType", "timeAtHome"]
      },
      4: {
        base: ["totalMembers", "hasChildren", "allAgree"]
      },
      5: {
        base: ["hadPetsBefore", "currentlyHasPets"]
      }
    };

    const currentRequired = requiredFields[currentStep] || {};
    let isValid = true;

    for (const [objectName, fields] of Object.entries(currentRequired)) {
      for (const field of fields) {
        if (objectName === "base") {
          if (!formData[field]) {
            toast.error(`${field} is required`);
            isValid = false;
          }
        } else {
          if (formData[objectName]?.[field] === undefined || formData[objectName]?.[field] === "") {
            toast.error(`${field} is required`);
            isValid = false;
          }
        }
      }
    }

    // Check for image upload
    if (currentStep === 3 && !formData.image) {
      toast.error("Please upload an image of your home");
      isValid = false;
    }

    return isValid;
  };

  const handleNext = async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    if (currentStep === totalSteps - 2) {
      setIsSubmitting(true);
      try {
        // Restructure the data to match backend expectations
        const adopterInfo = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          govtId: formData.govtId,
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipcode: formData.zipcode,
          residenceType: formData.residenceType,
          housingStatus: formData.housingStatus,
          spaceSize: formData.spaceSize,
          hasYard: formData.hasYard,
          hasFence: formData.hasFence,
          neighborhoodType: formData.neighborhoodType,
          nearbyAreas: formData.nearbyAreas,
          timeAtHome: formData.timeAtHome,
          totalMembers: formData.totalMembers,
          hasChildren: formData.hasChildren,
          allAgree: formData.allAgree,
          hadPetsBefore: formData.hadPetsBefore,
          currentlyHasPets: formData.currentlyHasPets,
          adoptionReason: formData.adoptionReason,
          petCareKnowledge: formData.petCareKnowledge,
          // Extract just the URL string from the image object
          image: formData.image?.url || ""
        };

        const submissionData = {
          petId: selectedPet.petId,
          adopterInfo: adopterInfo
        };

        const response = await axios.post(
          "http://localhost:8080/api/adoption/adopt",
          submissionData
        );
        
        console.log("Adoption submitted:", response.data);
        toast.success("Adoption request submitted successfully!");
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        toast.error(
          err.response?.data?.message || 
          "Failed to submit adoption request. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }

    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handlePayment = () => {
    if (!paymentLinkUrl) {
      toast.error("Payment link is not available.");
      return;
    }
    window.location.href = paymentLinkUrl;
  };

  const renderFormContent = () => {
    const steps = [
      <FormStep1 
        formData={formData} 
        setFormData={handleFormDataChange}
        onTermsChange={handleTermsChange}
      />,
      <FormStep2 
        formData={formData} 
        setFormData={handleFormDataChange} 
      />,
      <FormStep3
        formData={formData}
        setFormData={handleFormDataChange}
        toast={toast}
      />,
      <FormStep4 
        image={formData.image} 
        setImage={handleImageUpload} 
      />,
      <FormStep5
        formData={formData}
        setFormData={handleFormDataChange}
        toast={toast}
      />,
      <FormStep6 
        formData={formData} 
        setFormData={handleFormDataChange} 
      />,
      <div className="thank-you-section text-center">
        <h1 className="thank-you-heading">Thanks For Submitting!</h1>
        {selectedPet?.petName && (
          <p className="pet-name-message">
            Your application for {selectedPet.petName} has been received.
          </p>
        )}
        <button onClick={handlePayment} className="payment-button">
          Complete Payment
        </button>
      </div>,
    ];

    return steps[currentStep] || <div>Error: Step not found</div>;
  };

  return (
    <div className="choose-to-adopt">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {selectedPet?.petName && (
        <div className="pet-selection-banner">
          You're applying to adopt: <strong>{selectedPet.petName}</strong>
        </div>
      )}

      <div className="progress-bar">
        <img
          src={progressBarImage}
          alt={`Step ${currentStep + 1}`}
          className="progress-bar-image"
        />
      </div>

      <div className="form-content">{renderFormContent()}</div>

      {currentStep < totalSteps - 1 && (
        <div className="navigation-buttons">
          <button 
            onClick={handleBack} 
            disabled={currentStep === 0}
            className="back-button"
          >
            Back
          </button>
          <button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="next-button"
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChooseToAdopt;
