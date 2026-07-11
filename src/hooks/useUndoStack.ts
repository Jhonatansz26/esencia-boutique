import { useState, useCallback } from "react";

interface UndoStackState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoStack<T>(initialPresent: T) {
  const [state, setState] = useState<UndoStackState<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const push = useCallback((nextOrUpdater: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next =
        typeof nextOrUpdater === "function"
          ? (nextOrUpdater as (prev: T) => T)(prev.present)
          : nextOrUpdater;
      return {
        past: [...prev.past.slice(-49), prev.present],
        present: next,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      return {
        past: prev.past.slice(0, -1),
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: prev.future.slice(1),
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({ past: [], present: newPresent, future: [] });
  }, []);

  return {
    state: state.present,
    push,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
