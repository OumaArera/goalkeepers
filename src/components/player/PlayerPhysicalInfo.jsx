import React from 'react';
import { Activity } from 'lucide-react';
import FormSection from '../common/FormSection';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import CheckboxField from '../common/CheckboxField';

export default function PlayerPhysicalInfo({ formData, errors, onChange }) {
  const footOptions = [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
  ];

  return (
    <FormSection
      title="Physical Information"
      description="Player's physical attributes"
      icon={Activity}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Height (cm)"
          name="height"
          type="number"
          step="0.1"
          value={formData.height}
          onChange={onChange}
          error={errors.height}
          required
          placeholder="e.g., 185.00"
        />

        <InputField
          label="Weight (kg)"
          name="weight"
          type="number"
          step="0.01"
          value={formData.weight}
          onChange={onChange}
          error={errors.weight}
          required
          placeholder="e.g., 75.50"
        />

        <SelectField
          label="Preferred Foot"
          name="preferred_foot"
          value={formData.preferred_foot}
          onChange={onChange}
          options={footOptions}
          error={errors.preferred_foot}
          required
        />

        <div className="flex items-center gap-4 pt-6">
          <CheckboxField
            label="Currently Injured"
            name="injured"
            checked={formData.injured}
            onChange={onChange}
          />

          <CheckboxField
            label="Active Player"
            name="is_active"
            checked={formData.is_active}
            onChange={onChange}
          />
        </div>
      </div>
    </FormSection>
  );
}