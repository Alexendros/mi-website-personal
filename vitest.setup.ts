/**
 * Vitest global setup (loaded via vitest.config.ts -> test.setupFiles).
 *
 * Node 26 ships a native `globalThis.localStorage` getter that returns
 * `undefined` unless the process is started with `--localstorage-file`.
 * When the happy-dom environment is active, that broken native getter
 * shadows happy-dom's own Storage-backed `localStorage`, so any test that
 * touches `localStorage` directly (theme-storage, i18n/context) throws
 * "Cannot read properties of undefined". We replace the getter with a
 * working in-memory Storage-backed implementation when it is unusable.
 */
export function installLocalStorageMock(): void {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  if (descriptor?.get) {
    // Native Node getter present but may return undefined. Probe it.
    try {
      const native = (globalThis as unknown as { localStorage: Storage }).localStorage;
      native.clear();
      return;
    } catch {
      // fall through and install the mock
    }
  }

  const store = new Map<string, string>();
  const storage: Storage = {
    get length(): number {
      return store.size;
    },
    clear(): void {
      store.clear();
    },
    getItem(key: string): string | null {
      return store.has(key) ? (store.get(key) as string) : null;
    },
    key(index: number): string | null {
      const keys = Array.from(store.keys());
      return index >= 0 && index < keys.length ? (keys[index] as string) : null;
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    setItem(key: string, value: string): void {
      store.set(key, String(value));
    },
  } as Storage;

  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    writable: true,
    configurable: true,
  });
}

installLocalStorageMock();
