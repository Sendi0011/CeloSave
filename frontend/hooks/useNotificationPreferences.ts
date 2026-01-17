'use client';

import { useState, useEffect, useCallback } from 'react';

export function useNotificationPreferences(userAddress: string) {
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
}