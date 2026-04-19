import React, { useState, useEffect } from 'react';
import { BellIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import notificationManager, { type Notification } from '../utils/notifications';

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(notificationManager.getNotifications());
    const unsubscribe = notificationManager.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });
    return unsubscribe;
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-fadeIn">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BellIcon className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notificationManager.getUnreadCount()}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-xl transition-all ${notification.read ? 'bg-gray-50' : 'bg-green-50 border-l-4 border-green-500'}`}
                >
                  <div className="flex gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{notification.title}</div>
                      <div className="text-gray-600 text-xs mt-1">{notification.message}</div>
                      <div className="text-gray-400 text-xs mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => notificationManager.markAllAsRead()}
              className="w-full text-green-600 font-semibold py-2 text-sm"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;