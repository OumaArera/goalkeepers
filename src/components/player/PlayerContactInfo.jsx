import React from 'react';
import { Phone } from 'lucide-react';
import FormSection from '../common/FormSection';
import InputField from '../common/InputField';

export default function PlayerContactInfo({ formData, errors, onChange }) {
  return (
    <FormSection
      title="Contact Information"
      description="How to reach the player"
      icon={Phone}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          error={errors.phone}
          required
          placeholder="+254 700 000000"
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          placeholder="player@example.com (optional)"
        />
      </div>
    </FormSection>
  );
}