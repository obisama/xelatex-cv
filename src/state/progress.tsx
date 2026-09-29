import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';

import { CATEGORIES, getCategory } from '@/data/adhkar';
import type { Category } from '@/data/types';
import { dayKey, loadJSON, saveJSON } from './storage';

/** Repetition counts for today: categoryId -> dhikrId -> count. */
type Counts = Record<string, Record<string, number>>;

interface StoredProgress {
  day: string;
  counts: Counts;
  /** day -> ids of categories completed that day. */
  history: Record<string, string[]>;
}

const KEY = 'progress/v1';
const HISTORY_DAYS = 120;

export interface CategoryProgress {
  done: number;
  total: number;
  /** Repetitions made across all items / repetitions required. */
  reps: number;
  totalReps: number;
  complete: boolean;
}

interface ProgressContextValue {
  day: string;
  countOf: (categoryId: string, dhikrId: string) => number;
  increment: (categoryId: string, dhikrId: string) => number;
  setCount: (categoryId: string, dhikrId: string, count: number) => void;
  resetCategory: (categoryId: string) => void;
  resetToday: () => void;
  progressOf: (categoryId: string) => CategoryProgress;
  history: Record<string, string[]>;
  streak: number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function computeProgress(category: Category, counts: Counts): CategoryProgress {
  const c = counts[category.id] ?? {};
  let done = 0;
  let reps = 0;
  let totalReps = 0;
  for (const item of category.items) {
    const n = Math.min(c[item.id] ?? 0, item.repeat);
    reps += n;
    totalReps += item.repeat;
    if (n >= item.repeat) done++;
  }
  const total = category.items.length;
  return { done, total, reps, totalReps, complete: done === total };
}

function pruneHistory(history: Record<string, string[]>) {
  const days = Object.keys(history).sort().slice(-HISTORY_DAYS);
  return Object.fromEntries(days.map((d) => [d, history[d]]));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredProgress>({ day: dayKey(), counts: {}, history: {} });

  // Load, and roll over to a fresh day when needed.
  useEffect(() => {
    loadJSON<StoredProgress>(KEY).then((stored) => {
      if (!stored) return;
      const today = dayKey();
      setState(stored.day === today ? stored : { day: today, counts: {}, history: stored.history ?? {} });
    });
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s !== 'active') return;
      const today = dayKey();
      setState((prev) => (prev.day === today ? prev : { ...prev, day: today, counts: {} }));
    });
    return () => sub.remove();
  }, []);

  const commit = useCallback((updater: (prev: StoredProgress) => StoredProgress) => {
    setState((prev) => {
      const next = updater(prev);
      // Keep the completion history in sync with today's counts.
      const completed = CATEGORIES.filter((c) => computeProgress(c, next.counts).complete).map((c) => c.id);
      const history = { ...next.history };
      if (completed.length) history[next.day] = completed;
      else delete history[next.day];
      const result = { ...next, history: pruneHistory(history) };
      saveJSON(KEY, result);
      return result;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(() => {
    const countOf = (cid: string, did: string) => state.counts[cid]?.[did] ?? 0;

    const setCount = (cid: string, did: string, count: number) =>
      commit((prev) => ({
        ...prev,
        counts: { ...prev.counts, [cid]: { ...prev.counts[cid], [did]: Math.max(0, count) } },
      }));

    // Computed from the latest state inside the updater so fast taps are never lost.
    const increment = (cid: string, did: string) => {
      const max = getCategory(cid)?.items.find((i) => i.id === did)?.repeat ?? Infinity;
      commit((prev) => {
        const current = prev.counts[cid]?.[did] ?? 0;
        return {
          ...prev,
          counts: { ...prev.counts, [cid]: { ...prev.counts[cid], [did]: Math.min(current + 1, max) } },
        };
      });
      return Math.min(countOf(cid, did) + 1, max);
    };

    const resetCategory = (cid: string) =>
      commit((prev) => {
        const counts = { ...prev.counts };
        delete counts[cid];
        return { ...prev, counts };
      });

    const resetToday = () => commit((prev) => ({ ...prev, counts: {} }));

    const progressOf = (cid: string) => {
      const category = getCategory(cid);
      return category
        ? computeProgress(category, state.counts)
        : { done: 0, total: 0, reps: 0, totalReps: 0, complete: false };
    };

    // Consecutive days (ending today, or yesterday if today is not done yet)
    // with at least one daily routine completed.
    const dailyIds = new Set(CATEGORIES.filter((c) => c.daily).map((c) => c.id));
    const hasDaily = (d: string) => (state.history[d] ?? []).some((id) => dailyIds.has(id));
    let streak = 0;
    const cursor = new Date();
    if (!hasDaily(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (hasDaily(dayKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return {
      day: state.day,
      countOf,
      increment,
      setCount,
      resetCategory,
      resetToday,
      progressOf,
      history: state.history,
      streak,
    };
  }, [state, commit]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
