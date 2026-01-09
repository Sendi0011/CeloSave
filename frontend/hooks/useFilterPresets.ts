'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { FilterPreset, FilterPresetInput } from '@/types/filter-preset';

interface UseFilterPresetsParams {
  userAddress: string;
  autoFetch?: boolean;
}

interface UseFilterPresetsReturn {
  presets: FilterPreset[];
  loading: boolean;
  error: string | null;
  createPreset: (preset: FilterPresetInput) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
  updatePreset: (id: string, preset: Partial<FilterPresetInput>) => Promise<void>;
  setDefaultPreset: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

