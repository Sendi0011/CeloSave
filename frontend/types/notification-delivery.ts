export interface NotificationDelivery {
    id: string;
    notificationId: string;
    channel: NotificationChannel;
    status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'BOUNCED';
    provider?: string; // e.g., 'sendgrid', 'firebase'
    externalId?: string; // Provider's tracking ID
    sentAt?: string;
    deliveredAt?: string;
    failedAt?: string;
    errorMessage?: string;
    retryCount: number;
    maxRetries: number;
    metadata: Record<string, any>;
  }
  
  export interface EmailDeliveryData {
    to: string;
    from: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    replyTo?: string;
    attachments?: EmailAttachment[];
  }
  
  