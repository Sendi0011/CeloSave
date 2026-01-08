'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Transaction, FilterOptions, PaginationMeta, SortOption } from '@/types/transaction';

interface UseTransactionsParams {
  filters?: FilterOptions;
  page?: number;
  limit?: number;
  sortBy?: SortOption;
  userAddress?: string;
  autoFetch?: boolean;
}

interface UseTransactionsReturn {
  transactions: Transaction[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

