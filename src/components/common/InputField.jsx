import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  step,
  min,
  max,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white">
        {label}
        {required && <span className="text-orange-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-950/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-500/50 focus:ring-red-500/20'
            : 'border-orange-500/20 focus:ring-orange-500/20'
        }`}
      />
      {error && (
        <div className="flex items-center gap-1 text-red-400 text-xs">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}