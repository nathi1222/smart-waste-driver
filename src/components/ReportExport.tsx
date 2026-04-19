import React from 'react';
import { ChevronLeftIcon, DocumentArrowDownIcon, PrinterIcon, ShareIcon } from '@heroicons/react/24/outline';

interface SummaryData {
  totalStops: number;
  completed: number;
  missed: number;
  issuesReported: number;
  timeTaken: string;
}

interface ReportExportProps {
  onBack: () => void;
  summaryData: SummaryData;
}

const ReportExport: React.FC<ReportExportProps> = ({ onBack, summaryData }) => {
  const handleExportPDF = () => {
    // In real app, use jsPDF or similar
    alert('PDF Export - Would generate: Daily_Report_' + new Date().toISOString().split('T')[0] + '.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Collection Report',
        text: `Route completed: ${summaryData.completed}/${summaryData.totalStops} stops`,
        url: window.location.href,
      });
    } else {
      alert('Share not supported on this browser');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Export Report</h1>
            <p className="text-green-200 text-sm mt-1">Daily Collection Summary</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        {/* Report Preview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6" id="report-content">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🗑️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">SMART WASTE</h2>
            <p className="text-gray-500 text-sm">Daily Collection Report</p>
            <div className="border-t border-gray-200 my-4"></div>
            <p className="text-gray-600 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Driver Name:</span>
              <span className="font-semibold text-gray-800">Alex Thompson</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Driver ID:</span>
              <span className="font-semibold text-gray-800">DRV-00123</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Route:</span>
              <span className="font-semibold text-gray-800">Ward 7 - Route 18</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Stops:</span>
              <span className="font-semibold text-gray-800">{summaryData.totalStops}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Completed:</span>
              <span className="font-semibold text-green-600">{summaryData.completed}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Missed:</span>
              <span className="font-semibold text-red-500">{summaryData.missed}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Issues Reported:</span>
              <span className="font-semibold text-amber-600">{summaryData.issuesReported}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Time Taken:</span>
              <span className="font-semibold text-gray-800">{summaryData.timeTaken}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Completion Rate:</span>
              <span className="font-semibold text-green-600">{Math.round((summaryData.completed / summaryData.totalStops) * 100)}%</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-4">
            <p className="text-gray-400 text-xs text-center">Generated by SMART WASTE Driver Portal</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={handleExportPDF} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Export as PDF
          </button>
          <button onClick={handlePrint} className="w-full border-2 border-green-600 text-green-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
            <PrinterIcon className="h-5 w-5" />
            Print Report
          </button>
          <button onClick={handleShare} className="w-full border-2 border-blue-600 text-blue-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
            <ShareIcon className="h-5 w-5" />
            Share Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportExport;