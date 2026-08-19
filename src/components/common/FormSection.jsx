import React from 'react';

export default function FormSection({ title, description, icon: Icon, children }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Icon className="text-orange-500" size={20} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}