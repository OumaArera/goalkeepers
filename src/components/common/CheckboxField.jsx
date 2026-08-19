import React from 'react';
import { Check } from 'lucide-react';

export default function CheckboxField({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 transition-all ${
            checked
              ? 'bg-orange-500 border-orange-500'
              : 'bg-slate-950/50 border-orange-500/20 group-hover:border-orange-500/40'
          }`}
        >
          {checked && <Check className="text-white" size={16} strokeWidth={3} />}
        </div>
      </div>
      <span className="text-sm font-semibold text-white">{label}</span>
    </label>
  );
}