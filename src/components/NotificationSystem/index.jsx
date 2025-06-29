// ==================== [NEW FILE - CREATE THIS] ==================== 
// File: src/components/NotificationSystem/index.jsx
import React, { useEffect, useState } from 'react';
import { useCrawler } from '../../contexts/CrawlerContext';
import NotificationBell from './NotificationBell';

const NotificationSystem = () => {
  const { status, progress } = useCrawler();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Effect for new status updates
  useEffect(() => {
    if (status) {
      const newNotification = {
        id: Date.now(),
        message: status,
        type: determineType(status),
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }
  }, [status]);

  // Determine notification type
  const determineType = (message) => {
    if (message.includes('Success')) return 'success';
    if (message.includes('Error') || message.includes('Failed')) return 'error'; 
    if (message.includes('mock')) return 'warning';
    return 'info';
  };

  const markAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  return (
    <div className="notification-system fixed bottom-4 right-4 z-50">
      <NotificationBell 
        count={unreadCount} 
        onClick={markAsRead}
      />
      
      <div className="notification-list space-y-2 mt-2">
        {notifications.slice(0, 3).map(notification => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' :
              notification.type === 'error' ? 'bg-red-100 text-red-800' :
              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <span>{notification.message}</span>
              <span className="text-xs opacity-70">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSystem;
// ==================== [END NEW FILE] ====================