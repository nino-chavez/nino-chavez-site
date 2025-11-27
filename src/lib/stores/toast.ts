import { writable, derived } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  function add(type: ToastType, message: string, duration = 4000): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const toast: Toast = { id, type, message, duration };

    update(toasts => [...toasts, toast]);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }

    return id;
  }

  function dismiss(id: string) {
    update(toasts => toasts.filter(t => t.id !== id));
  }

  function clear() {
    update(() => []);
  }

  return {
    subscribe,
    add,
    dismiss,
    clear,
    // Convenience methods
    success: (message: string, duration?: number) => add('success', message, duration),
    error: (message: string, duration?: number) => add('error', message, duration),
    warning: (message: string, duration?: number) => add('warning', message, duration),
    info: (message: string, duration?: number) => add('info', message, duration),
  };
}

export const toasts = createToastStore();
