'use client';

import { useState, useEffect, useCallback } from 'react';

export function useNotificationPreferences(userAddress: string) {
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/notifications/preferences?userAddress=${userAddress}`
      );
      const data = await response.json();
      setPreferences(data.preferences);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch preferences');
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  
}