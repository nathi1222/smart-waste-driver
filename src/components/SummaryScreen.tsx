import React from 'react';
import { PhoneIcon, CheckCircleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface SummaryScreenProps {
  driverName: string;
  onFinish: () => void;
  onOpenCallDispatch: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ driverName, onFinish, onOpenCallDispatch }) => {
  const summary = {
    totalStops: 124, completed: 120, missed: 4, issuesReported: 3,
    timeTaken: '6h 42m', startTime: '7:58 AM', finishTime: '2:40 PM',
    issues: [{ name: 'Bin Not Out', count: 2 }, { name: 'Blocked Access', count: 1 }, { name: 'Other', count: 0 }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 pt-12 pb-8 px-5 rounded-b-3xl shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white text-2xl font-bold">Collection Summary</h1>
            <p className="text-green-200 text-sm mt-1">Route 18 - April 15, 2026</p>
          </div>
          <button onClick={onOpenCallDispatch} className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all">
            <PhoneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-6 shadow-xl text-white text-center">
          <TrophyIcon className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
          <div className="text-2xl font-bold">Route Completed!</div>
          <div className="text-green-100 mt-2">Great work today, {driverName}!</div>
          <div className="flex justify-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (<StarIcon key={star} className="h-5 w-5 text-yellow-300" />))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all"><div className="text-3xl font-bold text-gray-800">{summary.totalStops}</div><div className="text-xs text-gray-500 mt-1">TOTAL STOPS</div></div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all"><div className="text-3xl font-bold text-green-600">{summary.completed}</div><div className="text-xs text-green-600 mt-1">COMPLETED</div></div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all"><div className="text-3xl font-bold text-red-500">{summary.missed}</div><div className="text-xs text-red-500 mt-1">MISSED</div></div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all"><div className="text-3xl font-bold text-amber-600">{summary.issuesReported}</div><div className="text-xs text-amber-600 mt-1">ISSUES REPORTED</div></div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md mb-6">
          <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-green-500 rounded-full"></span>ISSUE BREAKDOWN</h3>
          {summary.issues.map((issue) => (<div key={issue.name} className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">{issue.name}</span><span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">{issue.count}</span></div>))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl mb-6 text-white">
          <div className="text-center mb-3"><div className="text-gray-400 text-sm">TIME TAKEN</div><div className="text-4xl font-bold text-green-400 mt-1">{summary.timeTaken}</div></div>
          <div className="flex justify-between text-sm text-gray-400 pt-3 border-t border-gray-700"><span>Started: {summary.startTime}</span><span>Finished: {summary.finishTime}</span></div>
        </div>

        <button onClick={onFinish} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-5 w-5" /> FINISH & SUBMIT
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;