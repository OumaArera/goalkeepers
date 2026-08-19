import React from 'react';
import { User } from 'lucide-react';
import FormSection from '../common/FormSection';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';

export default function PlayerBasicInfo({ formData, errors, onChange }) {
  const sexOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <FormSection
      title="Basic Information"
      description="Player's personal details"
      icon={User}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={onChange}
          error={errors.first_name}
          required
          placeholder="Enter first name"
        />

        <InputField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={onChange}
          error={errors.last_name}
          required
          placeholder="Enter last name"
        />

        <div className="md:col-span-2">
          <InputField
            label="Middle Names"
            name="middle_names"
            value={formData.middle_names}
            onChange={onChange}
            error={errors.middle_names}
            placeholder="Enter middle names (optional)"
          />
        </div>

        <InputField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={onChange}
          error={errors.date_of_birth}
          required
        />

        <SelectField
          label="Sex"
          name="sex"
          value={formData.sex}
          onChange={onChange}
          options={sexOptions}
          error={errors.sex}
          required
        />
      </div>
    </FormSection>
  );
}