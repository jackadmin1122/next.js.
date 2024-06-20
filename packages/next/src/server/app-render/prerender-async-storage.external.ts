import type { AsyncLocalStorage } from 'async_hooks'

import type { CacheSignal } from './cache-signal'

// Share the instance module in the next-shared layer
import { prerenderAsyncStorage } from './prerender-async-storage-instance' with { 'turbopack-transition': 'next-shared' }

export type PrerenderStore = {
  /**
   * This is the AbortController passed to React. It can be used to abort the prerender
   * if we encounter contitions that do not require further rendering
   */
  controller: AbortController

  /**
   * when not null this signal is used to track cache reads during prerendering and
   * to await all cache reads completing before aborting the prerender.
   */
  cacheSignal: null | CacheSignal

  /**
   * If we do abort for a trackable reason it can be stored here
   */
  abortedReason: string | ''
}

export type PrerenderAsyncStorage = AsyncLocalStorage<PrerenderStore>
export { prerenderAsyncStorage }
