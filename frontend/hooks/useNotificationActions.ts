'use client';

import { toast } from 'sonner';

export function useNotificationActions(userAddress: string) {
  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  
}