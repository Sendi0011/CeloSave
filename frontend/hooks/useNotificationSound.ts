'use client';

import { useEffect, useRef } from 'react';

const SOUNDS = {
  default: '/sounds/notification.mp3',
  payment: '/sounds/payment.mp3',
  achievement: '/sounds/achievement.mp3',
  urgent: '/sounds/urgent.mp3',
};

export function useNotificationSound(enabled: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
    }
  }, []);

  
}