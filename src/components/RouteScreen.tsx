import React from 'react';
import { ChevronLeftIcon, PhoneIcon, FlagIcon, MapPinIcon, ClockIcon, CheckCircleIcon, CameraIcon, QrCodeIcon } from '@heroicons/react/24/outline';

interface RouteScreenProps {
  completedStops: number;
  totalStops: number;
  onMarkCollected: () => void;
  onBackToDashboard: () => void;
  onOpenCallDispatch: () => void;
  onOpenQRScanner: () => void;
  onOpenPhotoCapture: () => void;
}

const RouteScreen: React.FC<RouteScreenProps> = ({ 
  completedStops, totalStops, onMarkCollected, onBackToDashboard, 
  onOpenCallDispatch, onOpenQRScanner, onOpenPhotoCapture 
}) => {
  const currentStopNumber = completedStops + 1;
  const isRouteComplete = completedStops >= totalStops;

  const getStopNumbers = () => {
    const stops = [];
    const start = Math.max(1, currentStopNumber - 3);
    const end = Math.min(totalStops, currentStopNumber + 3);
    for (let i = start; i <= end; i++) stops.push(i);
    return stops;
  };

  if (isRouteComplete) {
    onMarkCollected();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-5 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between">
          <button onClick={onBackToDashboard} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="text-center">
            <div className="text-white text-sm font-medium">Route 18</div>
            <div className="text-green-200 text-xs">Stop {currentStopNumber} of {totalStops}</div>
          </div>
          <button onClick={onOpenCallDispatch} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <PhoneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="px-5 py-6 pb-24">
        {/* ETA Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs font-medium">NEXT STOP</p>
              <p className="text-white text-2xl font-bold mt-1">ETA: 2 min</p>
            </div>
            <ClockIcon className="h-10 w-10 text-white/80" />
          </div>
        </div>

        {/* Main Stop Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 transform hover:scale-[1.01] transition-transform">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-green-600 text-sm font-bold">#{currentStopNumber}</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">45 Main Street</div>
              <div className="text-gray-500 text-sm mt-1">Springfield, 12345</div>
            </div>
            <div className="bg-green-100 rounded-full px-3 py-1">
              <span className="text-green-700 text-xs font-bold">Bin Out</span>
            </div>
          </div>

          {/* Stop Numbers */}
          <div className="flex justify-between items-center my-6 py-4">
            {getStopNumbers().map((stopNum) => (
              <div key={stopNum} className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                stopNum === currentStopNumber
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-110'
                  : stopNum < currentStopNumber
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {stopNum < currentStopNumber && (
                  <CheckCircleIcon className="absolute -top-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                )}
                {stopNum}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button onClick={onMarkCollected} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md">
              <CheckCircleIcon className="h-5 w-5" />
              MARK COLLECTED
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={onOpenQRScanner} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
                <QrCodeIcon className="h-5 w-5" />
                SCAN QR
              </button>
              <button onClick={onOpenPhotoCapture} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
                <CameraIcon className="h-5 w-5" />
                TAKE PHOTO
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
              <FlagIcon className="h-5 w-5" />
              REPORT ISSUE
            </button>

            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
              <MapPinIcon className="h-5 w-5" />
              NAVIGATE
            </button>
          </div>
        </div>

        {/* Voice Command Hint */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            🎤 Say "Mark collected" to complete this stop
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteScreen;