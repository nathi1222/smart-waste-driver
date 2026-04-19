import React, { useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface EmergencySOSProps {
  onClose: () => void;
  onCallEmergency: () => void;
}

const EmergencySOS: React.FC<EmergencySOSProps> = ({ onClose, onCallEmergency }) => {
  const [countdown, setCountdown] = useState(3);

  const handleSOS = () => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onCallEmergency();
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="text-center max-w-sm w-full">
        <div className="bg-red-600 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <ExclamationTriangleIcon className="h-16 w-16 text-white" />
        </div>
        
        <h2 className="text-white text-2xl font-bold mb-2">Emergency SOS</h2>
        <p className="text-gray-300 text-sm mb-6">
          This will alert dispatch and emergency services with your current location
        </p>

        {countdown === 3 ? (
          <button
            onClick={handleSOS}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-red-700 transition-all transform hover:scale-105 mb-3"
          >
            🚨 ACTIVATE SOS 🚨
          </button>
        ) : (
          <div className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-lg mb-3">
            Calling in {countdown}...
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-gray-700 text-white font-semibold py-3 rounded-xl hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
        >
          <XMarkIcon className="h-5 w-5" />
          Cancel
        </button>

        <p className="text-gray-500 text-xs mt-4">
          Your location will be shared automatically
        </p>
      </div>
    </div>
  );
};

export default EmergencySOS;