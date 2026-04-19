import React from 'react';
import { ShieldCheckIcon, BoltIcon, FireIcon, WrenchScrewdriverIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface VehicleHealthProps {
  onClose: () => void;
}

const VehicleHealth: React.FC<VehicleHealthProps> = ({ onClose }) => {
  const healthData = {
    fuel: 65,
    engine: 92,
    tires: 88,
    battery: 94,
    maintenance: {
      nextOilChange: '500 km',
      nextService: '2,500 km',
      tirePressure: '32 PSI',
    },
    alerts: [
      { message: 'Oil change due in 500 km', type: 'warning' },
      { message: 'Tire pressure low on rear left', type: 'alert' },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Vehicle Health</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <BoltIcon className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-600">{healthData.fuel}%</div>
            <div className="text-xs text-gray-600">Fuel Level</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <ShieldCheckIcon className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-600">{healthData.engine}%</div>
            <div className="text-xs text-gray-600">Engine Health</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <FireIcon className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-600">{healthData.tires}%</div>
            <div className="text-xs text-gray-600">Tire Condition</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <WrenchScrewdriverIcon className="h-6 w-6 text-amber-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-amber-600">{healthData.battery}%</div>
            <div className="text-xs text-gray-600">Battery</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Maintenance Schedule</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Next Oil Change:</span>
              <span className="font-semibold">{healthData.maintenance.nextOilChange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Service:</span>
              <span className="font-semibold">{healthData.maintenance.nextService}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tire Pressure:</span>
              <span className="font-semibold">{healthData.maintenance.tirePressure}</span>
            </div>
          </div>
        </div>

        {healthData.alerts.length > 0 && (
          <div className="space-y-2">
            {healthData.alerts.map((alert, idx) => (
              <div key={idx} className={`p-3 rounded-xl ${alert.type === 'alert' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className={`h-4 w-4 ${alert.type === 'alert' ? 'text-red-500' : 'text-amber-500'}`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleHealth;