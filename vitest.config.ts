import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["lib/**/*.ts"],
      exclude: ["lib/**/*.test.ts", "lib/**/index.ts", "lib/i18n/dictionaries/*.ts"],
      reporter: ["text", "lcov", "html", "json-summary"],
      // Baseline measured 2026-07-21 (after loader.ts coverage boost):
      // lines 68.01, statements 67.15, functions 65.78, branches 54.95.
      // Floor = baseline - 5.
      // Coverage gaps: lib/hooks/ (0%), lib/i18n/ (12.5%),
      // lib/feed.ts (55.88%), lib/site.ts (22.22%).
      thresholds: {
        lines: 63,
        statements: 62,
        functions: 60,
        branches: 49,
      },
    },
  },
});
