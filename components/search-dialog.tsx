"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Search, FileText, Command, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface SearchIndexItem {
  slug: string;
  type: "ideas" | "acciones";
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function getContentSnippet(content: string, query: string, maxLength = 150): string {
  if (!query.trim()) return content.slice(0, maxLength) + (content.length > maxLength ? "..." : "");
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, maxLength) + (content.length > maxLength ? "..." : "");

  const start = Math.max(0, idx - 60);
  const end = Math.min(content.length, idx + query.length + 60);
  let snippet = content.slice(start, end);
  if (start > 0) snippet = "…" + snippet;
  if (end < content.length) snippet += "…";
  return snippet;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchIndexItem[]) => {
        setIndex(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const results = useCallback(() => {
    if (!query.trim() || !index.length) return [];

    const q = query.toLowerCase().trim();
    const scored = index
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const tagLower = item.tags.join(" ").toLowerCase();
        const contentLower = item.content.toLowerCase();

        if (titleLower.includes(q)) score += 100;
        if (titleLower.startsWith(q)) score += 50;
        if (tagLower.includes(q)) score += 30;
        if (descLower.includes(q)) score += 20;
        if (contentLower.includes(q)) score += 10;

        return { item, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored;
  }, [query, index]);

  const handleSelect = (slug: string, type: string) => {
    onOpenChange(false);
    router.push(`/${type}/${slug}`);
  };

  const scored = results();
  const ideasResults = scored.filter((r) => r.item.type === "ideas");
  const accionesResults = scored.filter((r) => r.item.type === "acciones");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[60]",
            "bg-black/50 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-[15vh] z-[60] w-full max-w-lg -translate-x-1/2",
            "rounded-xl border border-border bg-popover shadow-xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]",
            "transition-[opacity,transform] duration-200 ease-out-expo",
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
              aria-label={t("search.placeholder")}
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground font-mono">
              <Command className="size-3" />K
            </kbd>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="overflow-y-auto max-h-[60vh] p-2">
            {loading && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                Loading search index...
              </p>
            )}

            {!loading && query.trim() && scored.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {t("search.noResults").replace("{query}", query)}
              </p>
            )}

            {!loading && !query.trim() && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {t("search.shortcut")}
              </p>
            )}

            {ideasResults.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {t("search.sectionIdeas")}
                </p>
                {ideasResults.map(({ item }) => (
                  <button
                    key={`ideas-${item.slug}`}
                    type="button"
                    onClick={() => handleSelect(item.slug, item.type)}
                    className={cn(
                      "flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left",
                      "transition-colors duration-100",
                      "hover:bg-muted focus-visible:bg-muted",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="font-medium text-foreground text-sm">
                        {highlightMatches(item.title, query)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {highlightMatches(getContentSnippet(item.content, query), query)}
                    </p>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex text-[10px] font-mono text-muted-foreground/60"
                          >
                            #{highlightMatches(tag, query)}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {accionesResults.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {t("search.sectionAcciones")}
                </p>
                {accionesResults.map(({ item }) => (
                  <button
                    key={`acciones-${item.slug}`}
                    type="button"
                    onClick={() => handleSelect(item.slug, item.type)}
                    className={cn(
                      "flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left",
                      "transition-colors duration-100",
                      "hover:bg-muted focus-visible:bg-muted",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="font-medium text-foreground text-sm">
                        {highlightMatches(item.title, query)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {highlightMatches(getContentSnippet(item.content, query), query)}
                    </p>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex text-[10px] font-mono text-muted-foreground/60"
                          >
                            #{highlightMatches(tag, query)}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
