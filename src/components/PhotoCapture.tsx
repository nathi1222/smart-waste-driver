import React, { useState, useRef } from 'react';
import { CameraIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface PhotoCaptureProps {
  onCapture: (photo: string) => void;
  onClose: () => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture, onClose }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (photo) {
      onCapture(photo);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Take Photo</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {photo ? (
          <div className="mb-4">
            <img src={photo} alt="Captured" className="w-full rounded-xl mb-3" />
            <div className="flex gap-3">
              <button
                onClick={() => setPhoto(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Retake
              </button>
              <button
                onClick={handleCapture}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Use Photo
              </button>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 rounded-xl mb-3 flex flex-col items-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              <CameraIcon className="h-12 w-12" />
              <span className="font-semibold">Take Photo</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-green-500 hover:text-green-600 transition-all"
            >
              <PhotoIcon className="h-5 w-5" />
              Upload from Gallery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCapture;