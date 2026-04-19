import React from 'react';
import { 
  MapIcon, 
  ClipboardDocumentListIcon, 
  ExclamationTriangleIcon, 
  PhoneIcon,  
  ArrowRightIcon, 
  ChatBubbleLeftRightIcon,
  BellIcon, 
  ShieldExclamationIcon, 
  WrenchScrewdriverIcon,
  SignalIcon, 
  CloudIcon,
  TrophyIcon,
   UsersIcon,
  StarIcon,
  ArrowDownTrayIcon,
   CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import WeatherWidget from './WeatherWidget';

interface DashboardScreenProps {
  driverName: string;
  driverId: string;
  completedStops: number;
  onStartRoute: () => void;
  onOpenCallDispatch: () => void;
  onViewCallHistory: () => void;
  onOpenChat: () => void;
  onOpenNotifications: () => void;
  onEmergencySOS: () => void;
  onVehicleHealth: () => void;
  onOpenRouteMap: () => void;
  onOpenAchievements: () => void;
  onOpenReportExport: () => void;
  onOpenFeedback: () => void;
  onOpenRealTimeTracker: () => void;
  isOnline: boolean;
  unreadCount: number;
  offlineStats: { pendingSync: number; storedRoutes: number; collections: number };
  driverScore: number;
  driverLevel: number;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  driverName, 
  driverId, 
  completedStops, 
  onStartRoute, 
  onOpenCallDispatch, 
  onViewCallHistory, 
  onOpenChat, 
  onOpenNotifications, 
  onEmergencySOS,
  onVehicleHealth,
  onOpenRouteMap,
  onOpenAchievements,
  onOpenReportExport,
  onOpenFeedback,
  onOpenRealTimeTracker,
  isOnline, 
  unreadCount, 
  offlineStats,
  driverScore,
  driverLevel
}) => {
  const totalStops = 124;
  const remainingStops = totalStops - completedStops;
  const progressPercentage = (completedStops / totalStops) * 100;

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const quickActions = [
  { icon: EyeIcon, title: 'Live Tracker', subtitle: 'Real-time GPS', color: 'emerald', bg: 'bg-emerald-50', textColor: 'text-emerald-600', onClick: onOpenRealTimeTracker },
  { icon: MapIcon, title: 'Route Map', subtitle: 'View Full Map', color: 'blue', bg: 'bg-blue-50', textColor: 'text-blue-600', onClick: onOpenRouteMap },
  { icon: ClipboardDocumentListIcon, title: 'Call History', subtitle: 'Recent Calls', color: 'purple', bg: 'bg-purple-50', textColor: 'text-purple-600', onClick: onViewCallHistory },
  { icon: ExclamationTriangleIcon, title: 'Report Issue', subtitle: 'On the Road', color: 'orange', bg: 'bg-orange-50', textColor: 'text-orange-600', onClick: () => {} },
  { icon: PhoneIcon, title: 'Call Dispatch', subtitle: 'Get Support', color: 'red', bg: 'bg-red-50', textColor: 'text-red-600', onClick: onOpenCallDispatch },
  { icon: ChatBubbleLeftRightIcon, title: 'Chat', subtitle: 'Message Dispatch', color: 'teal', bg: 'bg-teal-50', textColor: 'text-teal-600', onClick: onOpenChat },
  { icon: WrenchScrewdriverIcon, title: 'Vehicle Health', subtitle: 'Check Status', color: 'indigo', bg: 'bg-indigo-50', textColor: 'text-indigo-600', onClick: onVehicleHealth },
  { icon: TrophyIcon, title: 'Achievements', subtitle: `Level ${driverLevel}`, color: 'yellow', bg: 'bg-yellow-50', textColor: 'text-yellow-600', onClick: onOpenAchievements },
  { icon: ArrowDownTrayIcon, title: 'Export Report', subtitle: 'PDF & Share', color: 'green', bg: 'bg-green-50', textColor: 'text-green-600', onClick: onOpenReportExport },
  { icon: StarIcon, title: 'Feedback', subtitle: 'Rate Experience', color: 'pink', bg: 'bg-pink-50', textColor: 'text-pink-600', onClick: onOpenFeedback },
  { icon: UsersIcon, title: 'Team', subtitle: 'View Crew', color: 'cyan', bg: 'bg-cyan-50', textColor: 'text-cyan-600', onClick: () => {} },
];

  // Stats for today
  const todayStats = [
    { label: 'Stops', value: totalStops, change: '+0', color: 'text-gray-800' },
    { label: 'Completed', value: completedStops, change: `+${completedStops}`, color: 'text-green-600' },
    { label: 'Remaining', value: remainingStops, change: `${remainingStops} left`, color: 'text-amber-600' },
    { label: 'Points', value: driverScore, change: `Level ${driverLevel}`, color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Online Status Bar */}
      <div className={`px-5 pt-4 text-xs flex justify-between items-center ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
        <div className="flex items-center gap-2">
          <SignalIcon className="h-3 w-3" />
          <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
          {!isOnline && (
            <span className="text-gray-400 text-xs">
              • Data saved locally
            </span>
          )}
        </div>
        {!isOnline && offlineStats.pendingSync > 0 && (
          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
            <CloudIcon className="h-3 w-3 text-amber-600" />
            <span className="text-amber-600 text-xs">{offlineStats.pendingSync} pending sync</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-4 pb-8 rounded-b-3xl shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-green-100 text-sm font-medium">{getGreeting()},</p>
            <h1 className="text-3xl font-bold text-white mt-1">{driverName}!</h1>
            <p className="text-green-200 text-sm mt-1 flex items-center gap-2">
              <span>ID: {driverId}</span>
              <span className="w-1 h-1 bg-green-300 rounded-full"></span>
              <span>{getCurrentDate()}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onOpenNotifications} 
              className="relative bg-white/20 backdrop-blur rounded-full p-2 hover:bg-white/30 transition-all transform hover:scale-105"
            >
              <BellIcon className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={onEmergencySOS} 
              className="bg-red-500/80 backdrop-blur rounded-full p-2 hover:bg-red-600 transition-all transform hover:scale-105"
            >
              <ShieldExclamationIcon className="h-6 w-6 text-white" />
            </button>
            <div className="bg-white/20 backdrop-blur rounded-full p-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{driverName[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6">
        {/* Today's Route Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-gray-500 text-xs font-semibold tracking-wider flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                TODAY'S ROUTE
              </h2>
              <p className="text-gray-800 font-bold text-xl mt-1">Ward 7 - Route 18</p>
            </div>
            <div className="bg-green-100 rounded-full px-3 py-1">
              <span className="text-green-700 text-xs font-bold animate-pulse">● Active</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Daily Progress</span>
              <span className="text-green-600 font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {todayStats.map((stat, idx) => (
              <div key={idx} className="text-center p-2 bg-gray-50 rounded-xl">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stat.change}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={onStartRoute} 
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 group"
          >
            <span>START ROUTE</span>
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Weather Widget */}
        <div className="mb-6">
          <WeatherWidget 
            lat={42.1015} 
            lon={-72.5898}
            onWeatherAlert={(alert) => {
              // Weather alert will show via toast from the widget
              console.log('Weather alert:', alert);
            }}
          />
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full"></span>
            QUICK ACTIONS
            <span className="text-xs text-gray-400 font-normal ml-2">{quickActions.length} tools</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                onClick={action.onClick} 
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95 group"
              >
                <div className={`${action.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-6 w-6 ${action.textColor}`} />
                </div>
                <div className="font-bold text-gray-800 text-sm">{action.title}</div>
                <div className="text-xs text-gray-500 mt-1">{action.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white text-center">
            <div className="text-2xl font-bold">{completedStops}</div>
            <div className="text-xs opacity-90">Stops Done</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center">
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <div className="text-xs opacity-90">Completion</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-3 text-white text-center">
            <div className="text-2xl font-bold">{driverScore}</div>
            <div className="text-xs opacity-90">Points</div>
          </div>
        </div>

        {/* Dispatch Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200 shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-xs font-bold">DISPATCH AVAILABLE</span>
              </div>
              <div className="text-green-800 text-2xl font-bold">(555) 123-4567</div>
              <p className="text-green-600 text-xs mt-1">24/7 Emergency Support</p>
            </div>
            <button 
              onClick={onOpenCallDispatch} 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <PhoneIcon className="h-5 w-5" />
              CALL NOW
            </button>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Pro Tip</h4>
              <p className="text-xs text-gray-600 mt-1">
                Use voice commands like "Mark collected" to work hands-free while driving! Try "Open map" for live tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Voice Command Hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1 flex-wrap">
            <span>🎤</span>
            Say <span className="font-semibold text-green-600">"Mark collected"</span> • 
            <span className="font-semibold text-orange-600">"Report issue"</span> • 
            <span className="font-semibold text-blue-600">"Open map"</span> •
            <span className="font-semibold text-red-600">"Emergency"</span> •
            <span className="font-semibold text-purple-600">"Call dispatch"</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;