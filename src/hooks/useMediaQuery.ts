import { useSyncExternalStore } from 'react'

export function useMinWidth(px: number): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(`(min-width: ${px}px)`)
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(`(min-width: ${px}px)`).matches,
    () => false,
  )
}
