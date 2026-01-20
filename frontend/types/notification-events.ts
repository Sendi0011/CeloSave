export interface NotificationEvent {
    id: string;
    notificationId: string;
    eventType: NotificationEventType;
    userAddress: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
  
  export type NotificationEventType =
    | 'CREATED'
    | 'SENT'
    | 'DELIVERED'
    | 'READ'
    | 'CLICKED'
    | 'ARCHIVED'
    | 'DELETED'
    | 'FAILED'
    | 'RETRIED'
    | 'EXPIRED';
  
  