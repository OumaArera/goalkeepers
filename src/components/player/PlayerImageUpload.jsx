import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function PlayerImageUpload({ currentImage, onImageChange, error }) {
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError('Please upload a valid image (JPEG, JPG, PNG, or WebP)');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setUploadError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Pass file to parent
    onImageChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadError(null);
    onImageChange(null);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <ImageIcon className="text-orange-500" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-white">Player Photo</h3>
          <p className="text-sm text-gray-400">Upload a profile picture (optional)</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Preview or Upload Area */}
        {preview || currentImage ? (
          <div className="relative">
            <div className="w-full max-w-xs mx-auto">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-950/50 border border-orange-500/20">
                <img
                  src={preview || (currentImage instanceof File ? URL.createObjectURL(currentImage) : currentImage)}
                  alt="Player preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="text-white" size={16} />
              </button>
            </div>
          </div>
        ) : (
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-orange-500/30 rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors">
              <Upload className="mx-auto text-orange-500 mb-3" size={32} />
              <p className="text-white font-semibold mb-1">Click to upload photo</p>
              <p className="text-gray-400 text-sm">JPEG, JPG, PNG, or WebP (max 5MB)</p>
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}

        {/* Error Messages */}
        {(uploadError || error) && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
            <AlertCircle className="text-red-400" size={16} />
            <p className="text-red-400 text-sm">{uploadError || error}</p>
          </div>
        )}
      </div>
    </div>
  );
}