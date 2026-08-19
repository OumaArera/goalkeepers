import React from 'react';
import { MapPin } from 'lucide-react';
import FormSection from '../common/FormSection';
import InputField from '../common/InputField';

export default function PlayerLocationInfo({ formData, errors, onChange }) {
  return (
    <FormSection
      title="Location Information"
      description="Player's countries"
      icon={MapPin}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Country of Birth"
          name="country_of_birth"
          value={formData.country_of_birth}
          onChange={onChange}
          error={errors.country_of_birth}
          required
          placeholder="e.g., Kenya"
        />

        <InputField
          label="Country of Residence"
          name="country_of_residence"
          value={formData.country_of_residence}
          onChange={onChange}
          error={errors.country_of_residence}
          required
          placeholder="e.g., Kenya"
        />
      </div>
    </FormSection>
  );
}