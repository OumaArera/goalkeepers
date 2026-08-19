import React from 'react';
import { Loader2, X } from 'lucide-react';

export default function FormActions({
  onSubmit,
  onCancel,
  loading = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitIcon: SubmitIcon,
}) {
  return (
    <div className="flex items-center gap-4 pt-6">
      <button
        type="submit"
        disabled={loading}
        onClick={onSubmit}
        className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white font-black rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Creating...</span>
          </>
        ) : (
          <>
            {SubmitIcon && <SubmitIcon size={20} />}
            <span>{submitText}</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <X size={20} />
        <span>{cancelText}</span>
      </button>
    </div>
  );
}