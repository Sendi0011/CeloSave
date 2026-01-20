export interface NotificationGroup {
    id: string;
    key: string; // e.g., 'payment_reminders_pool_123'
    type: NotificationType;
    title: string;
    count: number;
    notifications: Notification[];
    latestNotification: Notification;
    firstNotificationDate: string;
    lastNotificationDate: string;
    isRead: boolean;
    isArchived: boolean;
  }
  
  