import React from 'react';
import { ChevronLeftIcon, PhoneIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface CallHistoryScreenProps {
  onBack: () => void;
  onOpenCallDispatch: () => void;
}

const CallHistoryScreen: React.FC<CallHistoryScreenProps> = ({ onBack, onOpenCallDispatch }) => {
  const todayCalls = [
    { time: '10:32 AM', name: 'Sarah Johnson', role: 'Dispatch Supervisor', issue: 'Route Question & Skip Location', duration: '4:23' },
    { time: '08:15 AM', name: 'Mike Davis', role: 'Dispatch Agent', issue: 'Bin Access Issue', duration: '2:15' },
  ];
  const yesterdayCalls = [
    { time: '02:45 PM', name: 'Lisa Park', role: 'Dispatch Supervisor', issue: 'End of Day Report', duration: '8:42' },
    { time: '11:20 AM', name: 'Tom Wilson', role: 'Dispatch Agent', issue: 'Equipment Check', duration: '3:30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-8 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all"><ChevronLeftIcon className="h-6 w-6" /></button>
          <div><h1 className="text-white text-2xl font-bold">Call History</h1><div className="text-green-200 text-sm mt-1 flex items-center gap-2"><span>97% Completion Rate</span><div className="w-2 h-2 bg-green-400 rounded-full"></div><span>24 Calls Total</span></div></div>
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="mb-8"><h2 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-green-500 rounded-full"></div>TODAY</h2>
          {todayCalls.map((call, idx) => (<div key={idx} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all mb-3"><div className="flex items-start gap-3"><div className="bg-green-100 rounded-full p-2"><UserCircleIcon className="h-8 w-8 text-green-600" /></div><div className="flex-1"><div className="flex items-center justify-between mb-1"><div><span className="font-bold text-gray-800">{call.name}</span><span className="text-xs text-gray-500 ml-2">{call.role}</span></div><span className="text-green-600 text-xs font-medium">{call.duration}</span></div><div className="text-gray-600 text-sm mb-2">{call.issue}</div><div className="flex items-center gap-4 text-xs text-gray-400"><span className="flex items-center gap-1"><ClockIcon className="h-3 w-3" />{call.time}</span></div></div></div></div>))}
        </div>

        <div className="mb-8"><h2 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-gray-400 rounded-full"></div>YESTERDAY</h2>
          {yesterdayCalls.map((call, idx) => (<div key={idx} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all mb-3"><div className="flex items-start gap-3"><div className="bg-gray-100 rounded-full p-2"><UserCircleIcon className="h-8 w-8 text-gray-600" /></div><div className="flex-1"><div className="flex items-center justify-between mb-1"><div><span className="font-bold text-gray-800">{call.name}</span><span className="text-xs text-gray-500 ml-2">{call.role}</span></div><span className="text-gray-500 text-xs font-medium">{call.duration}</span></div><div className="text-gray-600 text-sm mb-2">{call.issue}</div><div className="flex items-center gap-4 text-xs text-gray-400"><span className="flex items-center gap-1"><ClockIcon className="h-3 w-3" />{call.time}</span></div></div></div></div>))}
        </div>

        <button onClick={onOpenCallDispatch} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
          <PhoneIcon className="h-5 w-5" /> CALL DISPATCH NOW
        </button>
      </div>
    </div>
  );
};

export default CallHistoryScreen;