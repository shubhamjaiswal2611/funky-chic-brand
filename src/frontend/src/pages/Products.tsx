import { ProductMockup } from "@/components/ProductMockup";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import ProductCard from "../components/ProductCard";
import { useBackend } from "../hooks/useBackend";
import { useThemeStore } from "../store/themeStore";
import type { Product } from "../types/index";

const CATEGORIES = ["All", "Tees", "Hoodies", "Shorts", "Lowers"];

// Placeholder products for when backend returns empty
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Battery: 3% Tee",
    category: "Tees",
    price: BigInt(2499),
    description:
      "240 GSM oversized tee. Social battery icon at 3% — because some days the signal is just gone.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "obsession",
    series: "Social Battery Series",
  },
  {
    id: "p2",
    name: "Recharge Failed Hoodie",
    category: "Hoodies",
    price: BigInt(3999),
    description:
      "400 GSM dropped-shoulder hoodie. System alert: recharge sequence corrupted. Wear it when recovery isn't loading.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "isolation",
    series: "Social Battery Series",
  },
  {
    id: "p3",
    name: "Interaction Overload Shorts",
    category: "Shorts",
    price: BigInt(1999),
    description:
      "Relaxed-fit shorts. Interaction limit reached. Stepping offline — physically and mentally.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "burnout",
    series: "Social Battery Series",
  },
  {
    id: "p4",
    name: "Missing Identity Tee",
    category: "Tees",
    price: BigInt(2499),
    description:
      "240 GSM oversized tee. Identity file not found. Memory Corruption Series — for when the self is unavailable.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "burnout",
    series: "Memory Corruption Series",
  },
  {
    id: "p5",
    name: "Memory Leak Hoodie",
    category: "Hoodies",
    price: BigInt(3999),
    description:
      "400 GSM heavyweight hoodie. Archive corrupted. Fragments of who you were, slowly dissolving.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "obsession",
    series: "Memory Corruption Series",
  },
  {
    id: "p6",
    name: "Archive Lost Lowers",
    category: "Lowers",
    price: BigInt(1999),
    description:
      "Utility-inspired relaxed lowers. The archive is gone. What remains is the instinct.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "burnout",
    series: "Memory Corruption Series",
  },
  {
    id: "p7",
    name: "Between Dreams Tee",
    category: "Tees",
    price: BigInt(2499),
    description:
      "240 GSM oversized tee. Dreamstate Division. Neither awake nor asleep — in the space between signals.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "escape",
    series: "Dreamstate Division",
  },
  {
    id: "p8",
    name: "Artificial Reality Hoodie",
    category: "Hoodies",
    price: BigInt(3999),
    description:
      "400 GSM dropped-shoulder hoodie. Dreamstate Division. The simulation is more real than the real.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "escape",
    series: "Dreamstate Division",
  },
  {
    id: "p9",
    name: "Sleep Division Shorts",
    category: "Shorts",
    price: BigInt(1999),
    description:
      "Relaxed-fit shorts. Dreamstate Division. Comfort for those existing between sleep cycles and signals.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "overthinking",
    series: "Dreamstate Division",
  },
  {
    id: "p10",
    name: "Emotion Overload Tee",
    category: "Tees",
    price: BigInt(2499),
    description:
      "240 GSM oversized tee. Human Error Series. Too many feelings running at once — system destabilized.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "overthinking",
    series: "Human Error Series",
  },
  {
    id: "p11",
    name: "Human System Failure Hoodie",
    category: "Hoodies",
    price: BigInt(3999),
    description:
      "400 GSM heavyweight hoodie. Human Error Series. Stability corrupted. Reboot not available.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "chaos",
    series: "Human Error Series",
  },
  {
    id: "p12",
    name: "Chaos Tee",
    category: "Tees",
    price: BigInt(2499),
    description:
      "240 GSM oversized tee. Instinct Symbol Series. Chaos is the first instinct — before logic, before fear.",
    imageUrl: "",
    stockQuantity: BigInt(50),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
    emotion: "chaos",
    series: "Instinct Protocol",
  },
];

function MandalaDecor({
  className = "",
  style,
}: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <title>Decorative mandala</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
        transform="translate(100,100)"
      >
        {(
          [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as number[]
        ).map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <line x1="0" y1="0" x2="0" y2="-86" />
            <ellipse cx="0" cy="-54" rx="7" ry="13" />
            <circle cx="0" cy="-28" r="3.5" fill="currentColor" opacity="0.3" />
          </g>
        ))}
        <circle r="18" />
        <circle r="38" strokeDasharray="4 4" />
        <circle r="62" strokeDasharray="2 6" />
        <circle r="82" />
      </g>
    </svg>
  );
}

function BlockPrintDecor({
  className = "",
  style,
}: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <title>Decorative block print</title>
      <g fill="currentColor" opacity="0.5">
        <rect x="10" y="10" width="20" height="20" rx="2" />
        <rect x="50" y="10" width="20" height="20" rx="2" />
        <rect x="90" y="10" width="20" height="20" rx="2" />
        <rect x="30" y="30" width="20" height="20" rx="2" />
        <rect x="70" y="30" width="20" height="20" rx="2" />
        <rect x="10" y="50" width="20" height="20" rx="2" />
        <rect x="50" y="50" width="20" height="20" rx="2" />
        <rect x="90" y="50" width="20" height="20" rx="2" />
        <circle cx="20" cy="20" r="4" opacity="0.6" />
        <circle cx="60" cy="20" r="4" opacity="0.6" />
        <circle cx="100" cy="20" r="4" opacity="0.6" />
      </g>
    </svg>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

const MOODS = [
  "Chaos",
  "Isolation",
  "Obsession",
  "Escape",
  "Overthinking",
  "Burnout",
] as const;
type Mood = (typeof MOODS)[number];

const MOOD_TOKEN: Record<Mood, string> = {
  Chaos: "var(--chaos)",
  Isolation: "var(--isolation)",
  Obsession: "var(--obsession)",
  Escape: "var(--escape)",
  Overthinking: "var(--overthinking)",
  Burnout: "var(--burnout)",
};

function MoodChip({
  mood,
  isActive,
  onClick,
}: {
  mood: Mood | null;
  isActive: boolean;
  onClick: () => void;
}) {
  const token = mood ? MOOD_TOKEN[mood] : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={
        mood ? `products.mood.${mood.toLowerCase()}` : "products.mood.clear"
      }
      className={`mood-chip flex items-center gap-1.5 shrink-0 ${isActive ? "active" : ""}`}
    >
      {mood ? (
        <>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: token ? `oklch(${token})` : undefined }}
          />
          <span>{mood}</span>
        </>
      ) : (
        <>
          <X size={12} />
          <span>All Moods</span>
        </>
      )}
    </button>
  );
}

export default function Products() {
  const { actor, isFetching: actorFetching } = useBackend();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMood, setActiveMood] = useState<Mood | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mode = useThemeStore((s) => s.mode);
  const isSignal = mode === "signal";

  // Sync mood to/from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const moodParam = params.get("mood");
    if (moodParam) {
      const normalized =
        moodParam.charAt(0).toUpperCase() + moodParam.slice(1).toLowerCase();
      if (MOODS.includes(normalized as Mood)) {
        setActiveMood(normalized as Mood);
      }
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeMood) {
      url.searchParams.set("mood", activeMood.toLowerCase());
    } else {
      url.searchParams.delete("mood");
    }
    window.history.replaceState({}, "", url.toString());
  }, [activeMood]);

  const { data: backendProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts() as Promise<Product[]>;
    },
    enabled: !!actor && !actorFetching,
  });

  // Use placeholder products if backend returns empty
  const products =
    backendProducts.length > 0 ? backendProducts : PLACEHOLDER_PRODUCTS;

  const categoryAndSearchFiltered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const matched = activeMood
    ? categoryAndSearchFiltered.filter(
        (p) => (p.emotion ?? "").toLowerCase() === activeMood.toLowerCase(),
      )
    : [];
  const others = activeMood
    ? categoryAndSearchFiltered.filter(
        (p) => (p.emotion ?? "").toLowerCase() !== activeMood.toLowerCase(),
      )
    : categoryAndSearchFiltered;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
      data-ocid="products.page"
    >
      {/* ── Header Banner ── */}
      <header
        className={`relative overflow-hidden py-14 md:py-20 ${isSignal ? "pattern-mandala" : "border-b border-border"}`}
        style={{ backgroundColor: "oklch(var(--card))" }}
      >
        {/* Decorative elements */}
        <MandalaDecor
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
          style={{
            color: isSignal
              ? "oklch(var(--lime) / 0.15)"
              : "oklch(var(--primary) / 0.06)",
          }}
        />
        <MandalaDecor
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-70"
          style={{
            color: isSignal
              ? "oklch(var(--hotpink) / 0.12)"
              : "oklch(var(--secondary) / 0.08)",
          }}
        />
        <BlockPrintDecor
          className="absolute right-1/4 top-4 w-20 h-20 pointer-events-none opacity-50"
          style={{
            color: isSignal
              ? "oklch(var(--neonblue) / 0.25)"
              : "oklch(var(--secondary) / 0.12)",
          }}
        />

        {/* Funky: neon top border */}
        {isSignal && (
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background:
                "linear-gradient(90deg, oklch(var(--lime)), oklch(var(--hotpink)), oklch(var(--neonblue)))",
            }}
          />
        )}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            className="text-xs font-body font-semibold uppercase tracking-[0.35em] mb-3"
            style={{ color: "oklch(var(--muted-foreground))" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Emotional Archive · Signal Series
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-brand text-6xl md:text-8xl mb-4"
            style={
              isSignal
                ? {
                    color: "oklch(var(--lime))",
                    textShadow:
                      "0 0 40px oklch(var(--lime) / 0.5), 0 0 80px oklch(var(--hotpink) / 0.2)",
                  }
                : { color: "oklch(var(--foreground))" }
            }
          >
            SHOP THE ARCHIVE
          </motion.h1>

          <motion.p
            className="font-body text-sm md:text-base max-w-md mx-auto"
            style={{ color: "oklch(var(--muted-foreground))" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isSignal
              ? "Access the archive. Choose your emotional state."
              : "A curated archive of emotional series drops — wear what you feel."}
          </motion.p>
        </div>

        {/* Chic: bottom decorative line */}
        {!isSignal && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: "oklch(var(--secondary))" }}
          />
        )}
      </header>

      {/* ── Search + Filters ── */}
      <div
        className={`sticky top-0 z-20 backdrop-blur-sm transition-theme ${
          isSignal
            ? "border-b border-border/40"
            : "border-b border-border bg-background/95"
        }`}
        style={
          isSignal ? { backgroundColor: "oklch(var(--background) / 0.94)" } : {}
        }
      >
        <div className="container mx-auto px-4 py-3 space-y-3">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(var(--muted-foreground))" }}
            />
            <Input
              data-ocid="products.search_input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 font-body text-sm h-9"
              style={{
                backgroundColor: "oklch(var(--input))",
                borderColor: isSignal
                  ? searchQuery
                    ? "oklch(var(--lime))"
                    : "oklch(var(--border))"
                  : "oklch(var(--border))",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:opacity-70"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mood chips */}
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center">
            <MoodChip
              mood={null}
              isActive={activeMood === null}
              onClick={() => setActiveMood(null)}
            />
            {MOODS.map((m) => (
              <MoodChip
                key={m}
                mood={m}
                isActive={activeMood === m}
                onClick={() => setActiveMood(m)}
              />
            ))}
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center"
            data-ocid="products.filter.tab"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`products.category.${cat.toLowerCase().replace(" ", "_")}`}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 px-4 py-1.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={
                    isActive
                      ? isSignal
                        ? {
                            backgroundColor: "oklch(var(--hotpink))",
                            color: "oklch(var(--accent-foreground))",
                            boxShadow: "3px 3px 0 oklch(var(--lime))",
                          }
                        : {
                            backgroundColor: "oklch(var(--primary))",
                            color: "oklch(var(--primary-foreground))",
                          }
                      : {
                          backgroundColor: "oklch(var(--muted))",
                          color: "oklch(var(--muted-foreground))",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="container mx-auto px-4 py-10">
        {/* Matched section */}
        {activeMood && matched.length > 0 && (
          <section className="mb-10">
            <motion.p
              key={`matched-${activeCategory}-${activeMood}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-body text-xs uppercase tracking-widest mb-6 font-semibold"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {matched.length} {matched.length === 1 ? "item" : "items"} matches
              your vibe · {activeMood}
            </motion.p>
            <motion.div
              key={`matched-grid-${activeCategory}-${activeMood}-${searchQuery}`}
              data-ocid="products.list.matched"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {matched.map((product, i) => (
                <Link
                  key={product.id}
                  to="/product/$id"
                  params={{ id: product.id }}
                  data-ocid={`products.item_link.matched.${i + 1}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 8) * 0.05 }}
                  >
                    <ProductCard product={product} index={i} />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </section>
        )}

        {/* Others / All section */}
        {others.length > 0 && (
          <section>
            {activeMood && (
              <motion.p
                key={`others-${activeCategory}-${activeMood}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-xs uppercase tracking-widest mb-6 font-semibold"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {others.length} {others.length === 1 ? "item" : "items"} ·{" "}
                {activeMood ? "All Drops" : "Full Archive"}
                {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
                {searchQuery ? ` matching "${searchQuery}"` : ""}
              </motion.p>
            )}
            {!activeMood && (
              <motion.p
                key={`count-${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-xs uppercase tracking-widest mb-6 font-semibold"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {isLoading || actorFetching
                  ? "Loading..."
                  : `${others.length} ${others.length === 1 ? "item" : "items"}${activeCategory !== "All" ? ` · ${activeCategory}` : ""}${searchQuery ? ` matching "${searchQuery}"` : ""}`}
              </motion.p>
            )}

            {isLoading || actorFetching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`grid-${activeCategory}-${activeMood ?? "all"}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  data-ocid="products.list"
                >
                  {others.map((product, i) => (
                    <Link
                      key={product.id}
                      to="/product/$id"
                      params={{ id: product.id }}
                      data-ocid={`products.item_link.${i + 1}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i % 8) * 0.05 }}
                      >
                        <ProductCard product={product} index={i} />
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </section>
        )}

        {/* Empty state */}
        {matched.length === 0 && others.length === 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 flex flex-col items-center"
              data-ocid="products.empty_state"
            >
              <MandalaDecor
                className="w-20 h-20 mb-5 opacity-20"
                style={{ color: "oklch(var(--muted-foreground))" }}
              />
              <p
                className="font-display text-2xl font-bold uppercase mb-2"
                style={{ color: "oklch(var(--foreground))" }}
              >
                No matches found
              </p>
              <p
                className="font-body text-sm mb-6"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {searchQuery
                  ? `Nothing for "${searchQuery}" — try a different search.`
                  : "Check back soon — new drops incoming."}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="font-body font-semibold text-sm uppercase tracking-widest px-6 py-2 rounded-full transition-smooth"
                  style={{
                    backgroundColor: "oklch(var(--primary))",
                    color: "oklch(var(--primary-foreground))",
                  }}
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* ── Cultural band footer ── */}
      <div
        className={`py-8 mt-4 pattern-block-print ${isSignal ? "" : "border-t border-border"}`}
        style={
          isSignal
            ? {
                backgroundColor: "oklch(var(--card))",
                borderTop: "3px solid oklch(var(--hotpink))",
              }
            : { backgroundColor: "oklch(var(--muted) / 0.4)" }
        }
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className="heading-brand text-xs md:text-sm tracking-[0.25em]"
            style={{
              color: isSignal
                ? "oklch(var(--lime))"
                : "oklch(var(--muted-foreground))",
            }}
          >
            {isSignal
              ? "⚡ WEAR THE SIGNAL — FIVE SERIES · ZERO LIMITS ⚡"
              : "Wear the archive — designed with emotion, worn with intent"}
          </p>
        </div>
      </div>
    </div>
  );
}
