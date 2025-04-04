import React, { useEffect, useState } from "react";
import "./ChooseToAdopt.css";
import FormStep1 from "../../components/FormSteps/FormStep1";
import FormStep3 from "../../components/FormSteps/FormStep3";
import FormStep2 from "../../components/FormSteps/FormStep2";
import FormStep4 from "../../components/FormSteps/FormStep4";
import FormStep5 from "../../components/FormSteps/FormStep5";
import FormStep6 from "../../components/FormSteps/FormStep6";
import FormStep7 from "../../components/FormSteps/FormStep7";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const paymentLink=async()=>{
  try{
    const response=await axios.post(`http://localhost:8080/api/payment`);
    return response.data.data.paymentLinkUrl;
    
  }catch(err){
    console.log(err); 
    
  }
}

const ChooseToAdopt = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 8;
  const progressBarImage = `/assets/steps/step${currentStep + 1}.png`;
  const Navigate = useNavigate();
  const [paymentLinkUrl, setPaymentLinkUrl] = useState("");
  const handleNext = () => {
  
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };
  useEffect(() => {
    const fetchPaymentLink = async () => {
      const response = await paymentLink();
      setPaymentLinkUrl(response);
      // console.log("Aditya's data ", response);
    };
    fetchPaymentLink();
  }, []);

 

  const handleBack = () => {
 
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleProfile = () => {
    window.location.href=paymentLinkUrl;
    // Navigate('/profile');
  };

  // Render form content based on the step
  const renderFormContent = () => {
    switch (currentStep) {
      case 0:
        return <FormStep1 />;
      case 1:
        return <FormStep2 />;
      case 2:
        return <FormStep3 />;
      case 3:
        return <FormStep4 />;
      case 4:
        return <FormStep5 />;
      case 5:
        return <FormStep6 />;
      case 6:
        return <div className="thank-you-section text-center">
        <h1 className="thank-you-heading">Thanks For Submitting!</h1>
        <h4 className="thank-you-subheading">Complete the payment process and the pet's owner will be sent a link to your profile when your application has been approved by Paws4Home</h4>
        <div className="payment-button-container">
          <button onClick={handleProfile} className="payment-button">
            <i className="fas fa-credit-card"></i> Payment
          </button>
        </div>
      </div>; 
      default:
        return    <div className="text-center">
        <button onClick={handleProfile}>
        Payment 
       </button>
       
       </div>  
    }
  };

  return (
    <div className="choose-to-adopt">
      <div className="progress-bar">
        <img
          src={progressBarImage}
          alt={`Step ${currentStep + 1}`}
          className="progress-bar-image"
        />
      </div>

      <div className="form-content">{renderFormContent()}</div>

      {/* Navigation Buttons */}
      {currentStep < 6 && (
        <div className="navigation-buttons">
          <button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>
          {
            currentStep === totalSteps - 2 ? 
            <button onClick={handleProfile}>
             Payment 
            </button>
            :
            <button onClick={handleNext}>
              Next
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default ChooseToAdopt;
