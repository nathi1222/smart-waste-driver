import React, { useState, useEffect } from 'react';
import { PhoneIcon, PhoneXMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon, MicrophoneIcon, UserCircleIcon } from '@heroicons/react/24/solid';

interface CallDispatchScreenProps {
  onClose: () => void;
}

const CallDispatchScreen: React.FC<CallDispatchScreenProps> = ({ onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="pt-12 px-5 pb-6">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">Call Dispatch</h1>
          <div className="text-green-200 text-sm mt-2 inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            CALL IN PROGRESS • {formatTime(callDuration)}
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <PhoneIcon className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-white text-xl font-bold mb-1">Connected to Dispatch</div>
          <div className="text-green-200 text-sm mb-4">You are now speaking with Sarah Johnson</div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <UserCircleIcon className="h-4 w-4 text-green-300" />
            <span className="text-green-300 text-xs">Dispatch Supervisor</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <button onClick={() => setIsMuted(!isMuted)} className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95">
            <MicrophoneIcon className={`h-8 w-8 mx-auto ${isMuted ? 'text-red-400' : 'text-white'}`} />
            <div className="text-white text-xs mt-2 font-medium">{isMuted ? 'Unmute' : 'Mute'}</div>
          </button>
          <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95">
            {isSpeakerOn ? <SpeakerWaveIcon className="h-8 w-8 text-green-400 mx-auto" /> : <SpeakerXMarkIcon className="h-8 w-8 text-white mx-auto" />}
            <div className="text-white text-xs mt-2 font-medium">Speaker</div>
          </button>
          <button onClick={onClose} className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-center hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
            <PhoneXMarkIcon className="h-8 w-8 text-white mx-auto" />
            <div className="text-white text-xs mt-2 font-medium">End Call</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallDispatchScreen;