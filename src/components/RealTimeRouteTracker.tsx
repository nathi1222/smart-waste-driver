import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, MapPinIcon, CloudIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = React.lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = React.lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Polyline = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Polyline })));
const Popup = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));
const Circle = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Circle })));

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface Stop {
  id: number;
  address: string;
  lat: number;
  lng: number;
  status: 'pending' | 'completed' | 'current';
  eta: string;
  binStatus: string;
}

interface RealTimeRouteTrackerProps {
  onBack: () => void;
  completedStops: number;
  totalStops: number;
  onNavigateToStop: (stopId: number) => void;
}

// Fix for default marker icons in Leaflet
const fixLeafletIcons = () => {
  if (typeof window !== 'undefined') {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }
};

const RealTimeRouteTracker: React.FC<RealTimeRouteTrackerProps> = ({ 
  onBack, 
  completedStops, 
  totalStops,
  onNavigateToStop 
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [eta, setEta] = useState<string>('');
  const [trafficDelay, setTrafficDelay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [MapComponents, setMapComponents] = useState<any>(null);

  // Mock route data with real coordinates (Springfield area)
  const routeStops: Stop[] = [
    { id: 1, address: '45 Main Street', lat: 42.1015, lng: -72.5898, status: 'completed', eta: '8:15 AM', binStatus: 'Collected' },
    { id: 2, address: '123 Oak Avenue', lat: 42.1025, lng: -72.5908, status: 'completed', eta: '8:32 AM', binStatus: 'Collected' },
    { id: 3, address: '789 Pine Road', lat: 42.1035, lng: -72.5918, status: 'completed', eta: '8:48 AM', binStatus: 'Collected' },
    { id: 4, address: '456 Elm Street', lat: 42.1045, lng: -72.5928, status: 'current', eta: 'ETA: 2 min', binStatus: 'Bin Out' },
    { id: 5, address: '321 Cedar Lane', lat: 42.1055, lng: -72.5938, status: 'pending', eta: 'ETA: 8 min', binStatus: 'Pending' },
    { id: 6, address: '654 Birch Blvd', lat: 42.1065, lng: -72.5948, status: 'pending', eta: 'ETA: 14 min', binStatus: 'Pending' },
    { id: 7, address: '987 Walnut Street', lat: 42.1075, lng: -72.5958, status: 'pending', eta: 'ETA: 20 min', binStatus: 'Pending' },
    { id: 8, address: '147 Maple Ave', lat: 42.1085, lng: -72.5968, status: 'pending', eta: 'ETA: 26 min', binStatus: 'Pending' },
  ];

  const routePath = routeStops.map(stop => [stop.lat, stop.lng] as [number, number]);

  // Load Leaflet components dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      fixLeafletIcons();
      const leaflet = await import('react-leaflet');
      setMapComponents({
        MapContainer: leaflet.MapContainer,
        TileLayer: leaflet.TileLayer,
        Marker: leaflet.Marker,
        Polyline: leaflet.Polyline,
        Popup: leaflet.Popup,
        Circle: leaflet.Circle,
        useMap: leaflet.useMap,
      });
    };
    loadLeaflet();
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
          calculateETA(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          const currentStop = routeStops.find(s => s.status === 'current');
          if (currentStop) {
            setUserLocation({ lat: currentStop.lat, lng: currentStop.lng });
          }
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    const trafficInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 5);
      setTrafficDelay(randomDelay);
      if (randomDelay > 2 && userLocation) {
        calculateETA(userLocation.lat, userLocation.lng);
      }
    }, 30000);

    return () => clearInterval(trafficInterval);
  }, []);

  const calculateETA = (currentLat: number, currentLng: number) => {
    const currentStop = routeStops.find(s => s.status === 'current');
    if (currentStop && currentLat && currentLng) {
      const R = 6371;
      const dLat = (currentStop.lat - currentLat) * Math.PI / 180;
      const dLon = (currentStop.lng - currentLng) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(currentLat * Math.PI / 180) * Math.cos(currentStop.lat * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      const avgSpeed = 30;
      let timeMinutes = (distance / avgSpeed) * 60;
      timeMinutes += trafficDelay;
      
      if (timeMinutes < 1) {
        setEta('Arriving now');
      } else if (timeMinutes < 60) {
        setEta(`${Math.round(timeMinutes)} min`);
      } else {
        setEta(`${Math.floor(timeMinutes / 60)}h ${Math.round(timeMinutes % 60)}min`);
      }
    }
  };

  if (isLoading || !MapComponents) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer: MapContainerComp, TileLayer: TileLayerComp, Marker: MarkerComp, Polyline: PolylineComp, Popup: PopupComp, Circle: CircleComp } = MapComponents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-4 rounded-b-3xl shadow-xl z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-white text-xl font-bold">Live Route Tracking</h1>
              <p className="text-green-200 text-sm mt-1">
                {completedStops} of {totalStops} stops completed
              </p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <div className="flex items-center gap-1 text-white text-xs">
              <ArrowPathIcon className="h-3 w-3 animate-spin" />
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Map Container */}
        {userLocation && (
          <MapContainerComp
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            style={{ height: '60vh', width: '100%' }}
            className="z-0"
          >
            <TileLayerComp
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <PolylineComp
              positions={routePath}
              color="#10b981"
              weight={4}
              opacity={0.8}
              dashArray="10, 10"
            />
            
            {userLocation && (
              <>
                <CircleComp
                  center={[userLocation.lat, userLocation.lng]}
                  radius={50}
                  pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.2 }}
                />
                <MarkerComp position={[userLocation.lat, userLocation.lng]}>
                  <PopupComp>
                    <div className="text-center">
                      <p className="font-bold">Your Location</p>
                      <p className="text-xs text-gray-500">Current position</p>
                    </div>
                  </PopupComp>
                </MarkerComp>
              </>
            )}
            
            {routeStops.map((stop) => (
              <MarkerComp
                key={stop.id}
                position={[stop.lat, stop.lng]}
              >
                <PopupComp>
                  <div className="p-2 min-w-[200px]">
                    <p className="font-bold text-gray-800">{stop.address}</p>
                    <p className="text-xs text-gray-500 mt-1">Stop #{stop.id}</p>
                    <p className="text-xs text-green-600 mt-1">{stop.eta}</p>
                    <button
                      onClick={() => onNavigateToStop(stop.id)}
                      className="mt-2 w-full bg-green-600 text-white text-xs py-1 rounded-lg"
                    >
                      Navigate
                    </button>
                  </div>
                </PopupComp>
              </MarkerComp>
            ))}
          </MapContainerComp>
        )}

        {/* Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-5 z-10">
          <div className="mb-4">
            <h3 className="text-gray-500 text-xs font-semibold mb-2">NEXT STOP</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-800">
                  #{routeStops.find(s => s.status === 'current')?.id} {routeStops.find(s => s.status === 'current')?.address}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {routeStops.find(s => s.status === 'current')?.binStatus}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{eta || '2 min'}</p>
                <p className="text-xs text-gray-500">ETA</p>
                {trafficDelay > 0 && (
                  <p className="text-xs text-red-500 mt-1">+{trafficDelay} min delay</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{completedStops}</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{totalStops - completedStops}</div>
              <div className="text-xs text-gray-500">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">12.4 km</div>
              <div className="text-xs text-gray-500">Distance Left</div>
            </div>
          </div>
        </div>
      </div>

      {selectedStop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedStop.address}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">Stop #{selectedStop.id}</p>
              <p className="text-gray-600">Status: {selectedStop.status}</p>
              <p className="text-gray-600">ETA: {selectedStop.eta}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigateToStop(selectedStop.id)}
                className="flex-1 bg-green-600 text-white py-2 rounded-xl font-semibold"
              >
                Navigate
              </button>
              <button
                onClick={() => setSelectedStop(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeRouteTracker;