import React, { useState, useRef } from 'react';
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const handleManualEntry = () => {
    if (scannedData) {
      onScan(scannedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Scan QR Code</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
            <CameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Position the QR code in the frame</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
              Start Scanner
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Or enter bin ID manually
          </label>
          <input
            type="text"
            value={scannedData}
            onChange={(e) => setScannedData(e.target.value)}
            placeholder="Enter bin ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
          />
          <button
            onClick={handleManualEntry}
            disabled={!scannedData}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            Confirm Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;