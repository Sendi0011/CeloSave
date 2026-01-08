'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TransactionStats, FilterOptions } from '@/types/transaction';

interface UseTransactionStatsParams {
  filters?: FilterOptions;
  userAddress?: string;
  poolId?: string;
  autoFetch?: boolean;
}

interface UseTransactionStatsReturn {
  stats: TransactionStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

