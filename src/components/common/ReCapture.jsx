import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const ReCaptchaComponent = ({ onVerify, onError }) => {

  const handleRecaptchaChange = (token) => {
    if (token) {
      onVerify(true, token);
    } else {
      onVerify(false, null);
    }
  };

  const handleRecaptchaError = (error) => {
    console.error("reCAPTCHA Error:", error);
    onError(true);
  };

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <label className="block text-sm font-medium text-gray-700">
            Security Challenge <span className="text-red-500">*</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">Please check the box below to prove you are not a robot.</p>
        
        <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            onExpired={() => onVerify(false, null)}
            onErrored={handleRecaptchaError}
            className="mt-2"
        />
        
        {RECAPTCHA_SITE_KEY.includes("PLACEHOLDER") && (
            <p className="text-sm text-red-500 mt-2 font-medium">
                ⚠️ **RECAPTCHA SETUP REQUIRED**: Replace "YOUR_PLACEHOLDER_SITE_KEY" with your actual Google reCAPTCHA Site Key.
            </p>
        )}
    </div>
  );
};

export default ReCaptchaComponent;