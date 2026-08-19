import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFormData } from '../api/api.service';
import PlayerBasicInfo from '../components/player/PlayerBasicInfo';
import PlayerPhysicalInfo from '../components/player/PlayerPhysicalInfo';
import PlayerContactInfo from '../components/player/PlayerContactInfo';
import PlayerLocationInfo from '../components/player/PlayerLocationInfo';
import PlayerImageUpload from '../components/player/PlayerImageUpload';
import ReCaptchaComponent from '../components/common/ReCapture';
import {
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  Activity,
  Phone,
  MapPin,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

const STEPS = [
  {
    id: 0,
    key: 'photo',
    title: 'Photo',
    label: 'Player Photo',
    subtitle: 'Upload a profile picture',
    icon: ImageIcon,
    fields: ['avatar'],
  },
  {
    id: 1,
    key: 'basic',
    title: 'Identity',
    label: 'Basic Information',
    subtitle: "Player's personal details",
    icon: User,
    fields: ['first_name', 'last_name', 'date_of_birth', 'sex'],
  },
  {
    id: 2,
    key: 'physical',
    title: 'Physical',
    label: 'Physical Information',
    subtitle: "Player's physical attributes",
    icon: Activity,
    fields: ['height', 'weight', 'preferred_foot'],
  },
  {
    id: 3,
    key: 'contact',
    title: 'Contact',
    label: 'Contact Information',
    subtitle: 'How to reach the player',
    icon: Phone,
    fields: ['phone', 'email'],
  },
  {
    id: 4,
    key: 'location',
    title: 'Location',
    label: 'Location Information',
    subtitle: "Player's countries",
    icon: MapPin,
    fields: ['country_of_birth', 'country_of_residence'],
  },
];

export default function NewPlayer() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    middle_names: '',
    last_name: '',
    date_of_birth: '',
    height: '',
    weight: '',
    preferred_foot: 'Right',
    sex: 'Male',
    injured: false,
    phone: '',
    email: '',
    country_of_birth: '',
    country_of_residence: '',
    is_active: true,
    avatar: null,
    is_active: false
  });

  const [errors, setErrors] = useState({});
  const [stepVisited, setStepVisited] = useState({ 0: true });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, avatar: file }));
    if (errors.avatar) {
      setErrors((prev) => ({ ...prev, avatar: null }));
    }
  };

  const validateStep = (stepIndex) => {
    const step = STEPS[stepIndex];
    const newErrors = {};

    if (step.key === 'basic') {
      if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
      if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
      if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
      if (formData.date_of_birth) {
        const birthDate = new Date(formData.date_of_birth);
        if (birthDate > new Date()) newErrors.date_of_birth = 'Date of birth cannot be in the future';
      }
    }

    if (step.key === 'physical') {
      if (!formData.height || parseFloat(formData.height) <= 0) newErrors.height = 'Valid height is required';
      if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Valid weight is required';
    }

    if (step.key === 'contact') {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (step.key === 'location') {
      if (!formData.country_of_birth.trim()) newErrors.country_of_birth = 'Country of birth is required';
      if (!formData.country_of_residence.trim()) newErrors.country_of_residence = 'Country of residence is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (targetStep, dir = null) => {
    if (animating) return;
    const resolvedDir = dir ?? (targetStep > currentStep ? 'forward' : 'back');
    setDirection(resolvedDir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(targetStep);
      setStepVisited((prev) => ({ ...prev, [targetStep]: true }));
      setAnimating(false);
    }, 260);
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < STEPS.length - 1) {
      goToStep(currentStep + 1, 'forward');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1, 'back');
    }
  };

  const handleStepClick = (idx) => {
    if (idx === currentStep || animating) return;
    // Allow jumping back freely, jumping forward only if previous steps valid
    if (idx < currentStep) {
      goToStep(idx);
    } else {
      // Validate all steps up to target
      let valid = true;
      for (let i = currentStep; i < idx; i++) {
        if (!validateStep(i)) { valid = false; break; }
      }
      if (valid) goToStep(idx, 'forward');
    }
  };

  const handleCaptchaVerify = (verified, token) => {
    setCaptchaVerified(verified);
    setCaptchaToken(token);
    if (verified) setCaptchaError(false);
  };

  const handleCaptchaError = () => {
    setCaptchaVerified(false);
    setCaptchaToken(null);
    setCaptchaError(true);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    if (!captchaVerified) {
      setCaptchaError(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'avatar') {
          if (formData.avatar) formDataToSend.append('avatar', formData.avatar);
        } else if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await createFormData('players/', formDataToSend);
      if (response?.success) {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to create player. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;
  const isLastStep = currentStep === STEPS.length - 1;
  const StepIcon = STEPS[currentStep].icon;

  // Slide animation classes
  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 translate-x-8'
      : 'opacity-0 -translate-x-8'
    : 'opacity-100 translate-x-0';

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top nav bar */}
      <header className="relative z-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight">Register Player</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10">

        {/* Success overlay */}
        {success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-black text-white">Player Created!</h2>
              <p className="text-gray-400">Redirecting to dashboard…</p>
            </div>
          </div>
        )}

        {/* Step header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>Step {currentStep + 1}</span>
            <ChevronRight size={14} />
            <span className="text-orange-400">{STEPS[currentStep].label}</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">{STEPS[currentStep].label}</h1>
          <p className="text-gray-400">{STEPS[currentStep].subtitle}</p>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => handleStepClick(idx)}
                  title={step.label}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200
                    ${isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : isPast
                      ? 'bg-slate-800 text-orange-400 hover:bg-slate-700 cursor-pointer'
                      : 'bg-slate-900 text-gray-600 cursor-default'
                    }`}
                >
                  <Icon size={12} />
                  <span className={`hidden sm:inline transition-all ${isActive ? 'max-w-24' : 'max-w-0 overflow-hidden sm:max-w-24'}`}>
                    {step.title}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-1 h-px transition-all duration-500 ${idx < currentStep ? 'bg-orange-500/50' : 'bg-slate-800'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="text-red-400 shrink-0" size={18} />
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Step card */}
        <div
          className={`transition-all duration-250 ease-in-out ${slideClass}`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <div className="bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8">

            {currentStep === 0 && (
              <PlayerImageUpload
                currentImage={formData.avatar}
                onImageChange={handleImageChange}
                error={errors.avatar}
              />
            )}

            {currentStep === 1 && (
              <PlayerBasicInfo
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {currentStep === 2 && (
              <PlayerPhysicalInfo
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {currentStep === 3 && (
              <PlayerContactInfo
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {currentStep === 4 && (
              <>
                <PlayerLocationInfo
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-sm font-semibold text-gray-300 mb-1">Security Check</p>
                  <p className="text-xs text-gray-500 mb-3">Complete the challenge below before submitting.</p>
                  <ReCaptchaComponent
                    onVerify={handleCaptchaVerify}
                    onError={handleCaptchaError}
                  />
                  {captchaError && !captchaVerified && (
                    <div className="mt-3 flex items-center gap-2 text-red-400 text-xs font-semibold">
                      <AlertCircle size={14} />
                      Please complete the security check to continue.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick summary strip (shows filled fields) */}
        {currentStep > 0 && (formData.first_name || formData.last_name) && (
          <div className="mt-4 px-4 py-2.5 bg-slate-900/40 border border-white/5 rounded-xl flex items-center gap-3">
            {formData.avatar && (
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover border border-orange-500/30"
              />
            )}
            <span className="text-sm text-gray-400 font-medium">
              {[formData.first_name, formData.middle_names, formData.last_name].filter(Boolean).join(' ') || '—'}
            </span>
            {formData.date_of_birth && (
              <span className="text-xs text-gray-600">· {formData.date_of_birth}</span>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center gap-3">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all disabled:opacity-50"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          <div className="flex-1" />

          {!isLastStep ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white font-black text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !captchaVerified}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white font-black text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating…
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Create Player
                </>
              )}
            </button>
          )}
        </div>

        {/* Step count hint */}
        <p className="mt-4 text-center text-xs text-gray-600">
          {currentStep + 1} of {STEPS.length} steps
          {currentStep === 0 && ' · Photo is optional, you can skip it'}
        </p>
      </main>
    </div>
  );
}