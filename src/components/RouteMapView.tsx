import React, { useState } from 'react';
import { ChevronLeftIcon, MapPinIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface RouteMapViewProps {
  onBack: () => void;
  completedStops: number;
  totalStops: number;
}

const RouteMapView: React.FC<RouteMapViewProps> = ({ onBack, completedStops, totalStops }) => {
  const [selectedStop, setSelectedStop] = useState<number | null>(null);

  // Mock stops data
  const stops = [
    { id: 1, address: '45 Main Street', status: 'completed', time: '8:15 AM', lat: 40.7128, lng: -74.0060 },
    { id: 2, address: '123 Oak Avenue', status: 'completed', time: '8:32 AM', lat: 40.7138, lng: -74.0070 },
    { id: 3, address: '789 Pine Road', status: 'completed', time: '8:48 AM', lat: 40.7148, lng: -74.0080 },
    { id: 4, address: '456 Elm Street', status: 'current', time: 'ETA: 2 min', lat: 40.7158, lng: -74.0090 },
    { id: 5, address: '321 Cedar Lane', status: 'pending', time: 'ETA: 8 min', lat: 40.7168, lng: -74.0100 },
    { id: 6, address: '654 Birch Blvd', status: 'pending', time: 'ETA: 14 min', lat: 40.7178, lng: -74.0110 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-4 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Route Map</h1>
            <p className="text-green-200 text-sm mt-1">Route 18 - Ward 7</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder (In real app, integrate Google Maps) */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 m-4 rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Interactive Map View</p>
            <p className="text-gray-400 text-xs">(Google Maps Integration)</p>
          </div>
        </div>
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M50,100 L150,80 L250,120 L350,90 L450,130"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Stops List */}
      <div className="px-5 py-4">
        <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-green-500 rounded-full"></span>
          Route Stops ({completedStops}/{totalStops})
        </h3>
        
        <div className="space-y-3">
          {stops.map((stop) => (
            <div
              key={stop.id}
              onClick={() => setSelectedStop(stop.id)}
              className={`bg-white rounded-xl p-4 shadow-md transition-all cursor-pointer ${
                selectedStop === stop.id ? 'ring-2 ring-green-500 transform scale-[1.02]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stop.status === 'completed' ? 'bg-green-100' :
                    stop.status === 'current' ? 'bg-green-500' : 'bg-gray-100'
                  }`}>
                    {stop.status === 'completed' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : stop.status === 'current' ? (
                      <MapPinIcon className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-gray-500 text-xs">{stop.id}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{stop.address}</div>
                    <div className="text-xs text-gray-500">{stop.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Stop #{stop.id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-green-600">{completedStops}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-600">{totalStops - completedStops}</div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">12.4 km</div>
              <div className="text-xs text-gray-600">Distance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMapView;