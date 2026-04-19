import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import CallDispatchScreen from './components/CallDispatchScreen';
import RouteScreen from './components/RouteScreen';
import SummaryScreen from './components/SummaryScreen';
import CallHistoryScreen from './components/CallHistoryScreen';
import ChatScreen from './components/ChatScreen';
import PhotoCapture from './components/PhotoCapture';
import QRScanner from './components/QRScanner';
import NotificationsPanel from './components/NotificationsPanel';
import EmergencySOS from './components/EmergencySOS';
import VehicleHealth from './components/VehicleHealth';
import CustomerFeedback from './components/CustomerFeedback';
import RouteMapView from './components/RouteMapView';
import DriverAchievements from './components/DriverAchievements';
import ReportExport from './components/ReportExport';
import RealTimeRouteTracker from './components/RealTimeRouteTracker';
import notificationManager from './utils/notifications';
import offlineStorage from './utils/offlineStorage';
import voiceCommands from './utils/voiceCommands';

export type Screen = 
  | 'login' 
  | 'dashboard' 
  | 'callDispatch' 
  | 'route' 
  | 'summary' 
  | 'callHistory' 
  | 'chat'
  | 'photoCapture'
  | 'qrScanner'
  | 'notifications'
  | 'emergency'
  | 'vehicleHealth'
  | 'feedback'
  | 'routeMap'
  | 'achievements'
  | 'reportExport'
  | 'realTimeTracker';

function App() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  
  // Driver info
  const [driverName, setDriverName] = useState('Alex');
  const [driverId, setDriverId] = useState('DRV-00123');
  const [completedStops, setCompletedStops] = useState(34);
  
  // Modal states
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showVehicleHealth, setShowVehicleHealth] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showReportExport, setShowReportExport] = useState(false);
  const [showRealTimeTracker, setShowRealTimeTracker] = useState(false);
  
  // Driver gamification stats
  const [driverScore, setDriverScore] = useState(2450);
  const [driverLevel, setDriverLevel] = useState(3);
  
  // System states
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize services
  useEffect(() => {
    notificationManager.requestPermission();
    voiceCommands.init();
    
    // Register voice commands
    voiceCommands.registerCommand({
      command: 'mark collected',
      action: () => {
        toast.success('Voice: Marking as collected');
        if (currentScreen === 'route') handleMarkCollected();
      },
      keywords: ['mark collected', 'collect', 'done', 'complete'],
    });
    
    voiceCommands.registerCommand({
      command: 'report issue',
      action: () => {
        toast.info('Voice: Opening issue report');
        setShowPhotoCapture(true);
      },
      keywords: ['report issue', 'problem', 'issue'],
    });
    
    voiceCommands.registerCommand({
      command: 'next stop',
      action: () => {
        toast.info('Voice: Navigating to next stop');
      },
      keywords: ['next stop', 'continue', 'proceed'],
    });

    voiceCommands.registerCommand({
      command: 'open map',
      action: () => {
        toast.info('Voice: Opening route map');
        setShowRealTimeTracker(true);
      },
      keywords: ['open map', 'show map', 'route map', 'live tracker'],
    });

    voiceCommands.registerCommand({
      command: 'emergency',
      action: () => {
        toast.error('Voice: Emergency activated');
        setShowEmergency(true);
      },
      keywords: ['emergency', 'help', 'sos', 'call help'],
    });

    voiceCommands.registerCommand({
      command: 'call dispatch',
      action: () => {
        toast.info('Voice: Calling dispatch');
        setCurrentScreen('callDispatch');
      },
      keywords: ['call dispatch', 'contact dispatch', 'call support'],
    });

    // Start listening for voice commands
    voiceCommands.startListening();

    // Online/Offline listeners
    window.addEventListener('online', () => {
      setIsOnline(true);
      toast.success('Back online! Syncing data...');
      syncOfflineData();
    });
    
    window.addEventListener('offline', () => {
      setIsOnline(false);
      toast.error('You are offline. Data will be saved locally.');
    });

    // Demo notifications
    setTimeout(() => {
      notificationManager.addNotification({
        title: 'Welcome Back!',
        message: 'You have 124 stops scheduled for today',
        type: 'info',
      });
    }, 3000);

    setTimeout(() => {
      notificationManager.addNotification({
        title: 'Weather Alert',
        message: 'Rain expected in your area. Drive safely!',
        type: 'warning',
      });
    }, 8000);

    setTimeout(() => {
      notificationManager.addNotification({
        title: 'Route Optimized',
        message: 'Your route has been optimized to save 15 minutes',
        type: 'success',
      });
    }, 15000);

    // Subscribe to notifications
    const unsubscribe = notificationManager.subscribe((notifs) => {
      setUnreadCount(notifs.filter(n => !n.read).length);
    });

    // Cleanup
    return () => {
      unsubscribe();
      voiceCommands.stopListening();
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, [currentScreen]);

  const syncOfflineData = async () => {
    const pending = offlineStorage.getPendingSync();
    if (pending.length > 0) {
      toast.loading(`Syncing ${pending.length} items...`);
      setTimeout(() => {
        offlineStorage.clearSync();
        toast.success('Sync complete!');
        notificationManager.addNotification({
          title: 'Sync Complete',
          message: `${pending.length} items synced to server`,
          type: 'success',
        });
      }, 2000);
    }
  };

  // Navigation handlers
  const handleLogin = () => {
    setCurrentScreen('dashboard');
    notificationManager.addNotification({
      title: 'Welcome Alex!',
      message: 'Your route for today is ready',
      type: 'success',
    });
  };
  
  const handleStartRoute = () => setCurrentScreen('route');
  const handleOpenCallDispatch = () => setCurrentScreen('callDispatch');
  const handleCloseCall = () => setCurrentScreen('dashboard');
  const handleViewCallHistory = () => setCurrentScreen('callHistory');
  const handleOpenChat = () => setCurrentScreen('chat');
  const handleOpenNotifications = () => setShowNotifications(true);
  const handleEmergencySOS = () => setShowEmergency(true);
  const handleVehicleHealth = () => setShowVehicleHealth(true);
  const handleOpenFeedback = () => setShowFeedback(true);
  const handleOpenRouteMap = () => setShowRouteMap(true);
  const handleOpenAchievements = () => setShowAchievements(true);
  const handleOpenReportExport = () => setShowReportExport(true);
  const handleOpenRealTimeTracker = () => setShowRealTimeTracker(true);
  
  const handleMarkCollected = () => {
    const newCompleted = completedStops + 1;
    setCompletedStops(newCompleted);
    
    // Add points for collection
    setDriverScore(prev => prev + 10);
    
    // Save offline
    offlineStorage.saveCollection(newCompleted, { 
      timestamp: new Date(),
      stopNumber: newCompleted,
      address: '45 Main Street'
    });
    
    // Check for achievements
    if (newCompleted === 50) {
      notificationManager.addNotification({
        title: 'Achievement Unlocked! 🎉',
        message: 'You\'ve completed 50 stops! Keep going!',
        type: 'success',
      });
      setDriverScore(prev => prev + 100);
      setDriverLevel(prev => Math.floor((driverScore + 100) / 1000) + 1);
    }
    
    if (newCompleted === 100) {
      notificationManager.addNotification({
        title: 'Amazing Milestone! 🏆',
        message: '100 stops completed! You\'re crushing it!',
        type: 'success',
      });
      setDriverScore(prev => prev + 200);
      setDriverLevel(prev => Math.floor((driverScore + 200) / 1000) + 1);
    }
    
    if (newCompleted >= 124) {
      setCurrentScreen('summary');
      notificationManager.addNotification({
        title: 'Route Complete! 🎉',
        message: 'Great job completing today\'s route!',
        type: 'success',
      });
      // Add bonus points for completing route
      setDriverScore(prev => prev + 500);
      setDriverLevel(prev => Math.floor((driverScore + 500) / 1000) + 1);
    } else {
      toast.success(`Stop ${newCompleted} completed! +10 points`);
    }
  };
  
  const handleFinishSubmit = () => { 
    setCurrentScreen('dashboard'); 
    setCompletedStops(34);
    // Show achievement summary
    setTimeout(() => {
      notificationManager.addNotification({
        title: 'Day Complete! 📊',
        message: `You earned ${driverScore} points today!`,
        type: 'success',
      });
    }, 1000);
  };
  
  const handleBackToDashboard = () => setCurrentScreen('dashboard');
  const handleBackFromHistory = () => setCurrentScreen('dashboard');
  const handleCloseChat = () => setCurrentScreen('dashboard');
  
  const handlePhotoCaptured = (photo: string) => {
    toast.success('Photo saved and reported');
    offlineStorage.addToSync({
      id: Date.now().toString(),
      type: 'photo',
      data: { photo, stop: completedStops + 1 },
      timestamp: new Date().toISOString(),
    });
    notificationManager.addNotification({
      title: 'Issue Reported',
      message: 'Photo has been saved and will be reviewed',
      type: 'info',
    });
  };
  
  const handleQRScanned = (data: string) => {
    toast.success(`Bin ${data} verified!`);
    handleMarkCollected();
    notificationManager.addNotification({
      title: 'QR Verified',
      message: `Bin ${data} has been collected`,
      type: 'success',
    });
  };
  
  const handleCallEmergency = () => {
    toast.error('Emergency services alerted! Your location has been shared.');
    notificationManager.addNotification({
      title: 'EMERGENCY ALERT',
      message: 'Emergency services have been notified of your location',
      type: 'error',
    });
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    toast.success(`Thanks for rating ${rating} stars! +${rating * 10} points`);
    setDriverScore(prev => prev + (rating * 10));
    setDriverLevel(prev => Math.floor((driverScore + (rating * 10)) / 1000) + 1);
    setShowFeedback(false);
    notificationManager.addNotification({
      title: 'Feedback Received',
      message: `You received a ${rating}-star rating!`,
      type: 'success',
    });
  };

  const handleNavigateToStop = (stopId: number) => {
    toast.success(`Navigating to stop #${stopId}`);
    setShowRealTimeTracker(false);
    setCurrentScreen('route');
  };

  const offlineStats = offlineStorage.getOfflineStats();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Main Screens */}
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      
      {currentScreen === 'dashboard' && (
        <DashboardScreen 
          driverName={driverName} 
          driverId={driverId} 
          completedStops={completedStops}
          onStartRoute={handleStartRoute}
          onOpenCallDispatch={handleOpenCallDispatch}
          onViewCallHistory={handleViewCallHistory}
          onOpenChat={handleOpenChat}
          onOpenNotifications={handleOpenNotifications}
          onEmergencySOS={handleEmergencySOS}
          onVehicleHealth={handleVehicleHealth}
          onOpenRouteMap={handleOpenRouteMap}
          onOpenAchievements={handleOpenAchievements}
          onOpenReportExport={handleOpenReportExport}
          onOpenFeedback={handleOpenFeedback}
          onOpenRealTimeTracker={handleOpenRealTimeTracker}
          isOnline={isOnline}
          unreadCount={unreadCount}
          offlineStats={offlineStats}
          driverScore={driverScore}
          driverLevel={driverLevel}
        />
      )}
      
      {currentScreen === 'callDispatch' && <CallDispatchScreen onClose={handleCloseCall} />}
      
      {currentScreen === 'route' && (
        <RouteScreen 
          completedStops={completedStops}
          totalStops={124}
          onMarkCollected={handleMarkCollected}
          onBackToDashboard={handleBackToDashboard}
          onOpenCallDispatch={handleOpenCallDispatch}
          onOpenQRScanner={() => setShowQRScanner(true)}
          onOpenPhotoCapture={() => setShowPhotoCapture(true)}
        />
      )}
      
      {currentScreen === 'summary' && (
        <SummaryScreen 
          driverName={driverName}
          onFinish={handleFinishSubmit}
          onOpenCallDispatch={handleOpenCallDispatch}
          completedStops={completedStops}
          totalStops={124}
          driverScore={driverScore}
        />
      )}
      
      {currentScreen === 'callHistory' && (
        <CallHistoryScreen 
          onBack={handleBackFromHistory}
          onOpenCallDispatch={handleOpenCallDispatch}
        />
      )}
      
      {currentScreen === 'chat' && (
        <ChatScreen 
          onBack={handleCloseChat}
          onOpenCallDispatch={handleOpenCallDispatch}
        />
      )}
      
      {/* Modal Overlays */}
      {showPhotoCapture && (
        <PhotoCapture 
          onCapture={handlePhotoCaptured}
          onClose={() => setShowPhotoCapture(false)}
        />
      )}
      
      {showQRScanner && (
        <QRScanner 
          onScan={handleQRScanned}
          onClose={() => setShowQRScanner(false)}
        />
      )}
      
      {showNotifications && (
        <NotificationsPanel 
          onClose={() => setShowNotifications(false)}
        />
      )}
      
      {showEmergency && (
        <EmergencySOS 
          onClose={() => setShowEmergency(false)}
          onCallEmergency={handleCallEmergency}
        />
      )}
      
      {showVehicleHealth && (
        <VehicleHealth 
          onClose={() => setShowVehicleHealth(false)}
        />
      )}
      
      {showFeedback && (
        <CustomerFeedback 
          onBack={() => setShowFeedback(false)}
          stopNumber={completedStops + 1}
          onSubmit={handleFeedbackSubmit}
        />
      )}
      
      {showRouteMap && (
        <RouteMapView 
          onBack={() => setShowRouteMap(false)}
          completedStops={completedStops}
          totalStops={124}
        />
      )}
      
      {showAchievements && (
        <DriverAchievements 
          onBack={() => setShowAchievements(false)}
          driverName={driverName}
          score={driverScore}
          level={driverLevel}
        />
      )}
      
      {showReportExport && (
        <ReportExport 
          onBack={() => setShowReportExport(false)}
          summaryData={{
            totalStops: 124,
            completed: completedStops,
            missed: 4,
            issuesReported: 3,
            timeTaken: '6h 42m',
            startTime: '7:58 AM',
            finishTime: '2:40 PM',
            driverName: driverName,
            driverId: driverId,
            route: 'Ward 7 - Route 18',
            score: driverScore,
            level: driverLevel,
          }}
        />
      )}

      {showRealTimeTracker && (
        <RealTimeRouteTracker 
          onBack={() => setShowRealTimeTracker(false)}
          completedStops={completedStops}
          totalStops={124}
          onNavigateToStop={handleNavigateToStop}
        />
      )}
    </div>
  );
}

export default App;