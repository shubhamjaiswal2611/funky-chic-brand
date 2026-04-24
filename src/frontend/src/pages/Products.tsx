import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type CSSProperties, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useBackend } from "../hooks/useBackend";
import { useThemeStore } from "../store/themeStore";
import type { Product } from "../types/index";

const CATEGORIES = ["All", "Apparel", "Accessories", "Lifestyle", "Fusion Art"];

// Placeholder products for when backend returns empty
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Tokyo Drift Hoodie",
    category: "Apparel",
    price: BigInt(12800),
    description:
      "Oversized cut adorned with ukiyo-e wave motifs and graffiti kanji — where Harajuku meets Brooklyn.",
    imageUrl: "",
    stockQuantity: BigInt(15),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
  },
  {
    id: "p2",
    name: "Mumbai Block Print Kurta",
    category: "Apparel",
    price: BigInt(9500),
    description:
      "Hand-block-printed cotton kurta in bold Mughal floral geometry — tailored for the streets.",
    imageUrl: "",
    stockQuantity: BigInt(8),
    variants: [
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { color: "Saffron" },
      { color: "Indigo" },
    ],
  },
  {
    id: "p3",
    name: "Sahara Denim Jacket",
    category: "Apparel",
    price: BigInt(16500),
    description:
      "Woven Kente-stripe panels meet raw indigo denim — a cross-continent fusion born from West African looms.",
    imageUrl: "",
    stockQuantity: BigInt(6),
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }],
  },
  {
    id: "p4",
    name: "Oaxacan Embroidery Tee",
    category: "Apparel",
    price: BigInt(7200),
    description:
      "Organic cotton heavyweight tee with hand-embroidered Zapotec floral borders — artisan craft meets everyday wear.",
    imageUrl: "",
    stockQuantity: BigInt(20),
    variants: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
    ],
  },
  {
    id: "p5",
    name: "Kyoto Silk Bandana",
    category: "Accessories",
    price: BigInt(3800),
    description:
      "100% silk scarf featuring shibori indigo-dye patterns inspired by Kyoto artisan dyehouses.",
    imageUrl: "",
    stockQuantity: BigInt(30),
    variants: [{ color: "Indigo" }, { color: "Crimson" }],
  },
  {
    id: "p6",
    name: "Brass Mandala Cuff",
    category: "Accessories",
    price: BigInt(5500),
    description:
      "Recycled brass bracelet engraved with an 8-pointed mandala drawn from Rajasthani temple architecture.",
    imageUrl: "",
    stockQuantity: BigInt(12),
    variants: [],
  },
  {
    id: "p7",
    name: "Graffiti Kente Cap",
    category: "Accessories",
    price: BigInt(4800),
    description:
      "6-panel structured cap combining hand-painted graffiti lettering with authentic Ghanaian Kente-inspired trim.",
    imageUrl: "",
    stockQuantity: BigInt(18),
    variants: [],
  },
  {
    id: "p8",
    name: "Batik Canvas Tote",
    category: "Accessories",
    price: BigInt(6200),
    description:
      "Wax-resist batik canvas tote in Javanese parang patterns — holds your world, tells its stories.",
    imageUrl: "",
    stockQuantity: BigInt(25),
    variants: [{ color: "Natural" }, { color: "Indigo" }],
  },
  {
    id: "p9",
    name: "Folk Art Incense Set",
    category: "Lifestyle",
    price: BigInt(4200),
    description:
      "Curated incense from Jaipur oud makers and Oaxacan copal harvesters — ritual meets slow living.",
    imageUrl: "",
    stockQuantity: BigInt(40),
    variants: [],
  },
  {
    id: "p10",
    name: "Mughal Garden Candle",
    category: "Lifestyle",
    price: BigInt(5800),
    description:
      "Soy wax candle in hand-thrown terracotta vessel, scented with rose, vetiver and oud.",
    imageUrl: "",
    stockQuantity: BigInt(20),
    variants: [],
  },
  {
    id: "p11",
    name: "Tokyo × Jaipur Print",
    category: "Fusion Art",
    price: BigInt(8900),
    description:
      "Limited giclée print marrying Hokusai wave energy with Rajasthani miniature pigment work — numbered edition of 100.",
    imageUrl: "",
    stockQuantity: BigInt(5),
    variants: [],
  },
  {
    id: "p12",
    name: "Griot Sticker Pack",
    category: "Fusion Art",
    price: BigInt(1800),
    description:
      "12 die-cut vinyl stickers fusing West African griot symbols with Tokyo street-art tag aesthetics.",
    imageUrl: "",
    stockQuantity: BigInt(60),
    variants: [],
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

export default function Products() {
  const { actor, isFetching: actorFetching } = useBackend();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

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

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
      data-ocid="products.page"
    >
      {/* ── Header Banner ── */}
      <header
        className={`relative overflow-hidden py-14 md:py-20 ${isFunky ? "pattern-mandala" : "border-b border-border"}`}
        style={{ backgroundColor: "oklch(var(--card))" }}
      >
        {/* Decorative elements */}
        <MandalaDecor
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
          style={{
            color: isFunky
              ? "oklch(var(--lime) / 0.15)"
              : "oklch(var(--primary) / 0.06)",
          }}
        />
        <MandalaDecor
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-70"
          style={{
            color: isFunky
              ? "oklch(var(--hotpink) / 0.12)"
              : "oklch(var(--secondary) / 0.08)",
          }}
        />
        <BlockPrintDecor
          className="absolute right-1/4 top-4 w-20 h-20 pointer-events-none opacity-50"
          style={{
            color: isFunky
              ? "oklch(var(--neonblue) / 0.25)"
              : "oklch(var(--secondary) / 0.12)",
          }}
        />

        {/* Funky: neon top border */}
        {isFunky && (
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
            Global Culture · Streetwear Energy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-brand text-6xl md:text-8xl mb-4"
            style={
              isFunky
                ? {
                    color: "oklch(var(--lime))",
                    textShadow:
                      "0 0 40px oklch(var(--lime) / 0.5), 0 0 80px oklch(var(--hotpink) / 0.2)",
                  }
                : { color: "oklch(var(--foreground))" }
            }
          >
            {isFunky ? (
              <>
                SHOP{" "}
                <span
                  style={{
                    color: "oklch(var(--hotpink))",
                    textShadow: "0 0 30px oklch(var(--hotpink) / 0.5)",
                  }}
                >
                  ALL
                </span>
              </>
            ) : (
              "The Shop"
            )}
          </motion.h1>

          <motion.p
            className="font-body text-sm md:text-base max-w-md mx-auto"
            style={{ color: "oklch(var(--muted-foreground))" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isFunky
              ? "No rules. No borders. Pure culture — pick your vibe."
              : "A considered collection where global craft meets timeless style."}
          </motion.p>
        </div>

        {/* Chic: bottom decorative line */}
        {!isFunky && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: "oklch(var(--secondary))" }}
          />
        )}
      </header>

      {/* ── Search + Filters ── */}
      <div
        className={`sticky top-0 z-20 backdrop-blur-sm transition-theme ${
          isFunky
            ? "border-b border-border/40"
            : "border-b border-border bg-background/95"
        }`}
        style={
          isFunky ? { backgroundColor: "oklch(var(--background) / 0.94)" } : {}
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
                borderColor: isFunky
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
                      ? isFunky
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
        {/* Result count */}
        <motion.p
          key={`${activeCategory}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-xs uppercase tracking-widest mb-6 font-semibold"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {isLoading || actorFetching
            ? "Loading..."
            : `${filtered.length} ${filtered.length === 1 ? "item" : "items"}${activeCategory !== "All" ? ` · ${activeCategory}` : ""}${searchQuery ? ` matching "${searchQuery}"` : ""}`}
        </motion.p>

        {/* Grid */}
        {isLoading || actorFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
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
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="products.list"
            >
              {filtered.map((product, i) => (
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
      </main>

      {/* ── Cultural band footer ── */}
      <div
        className={`py-8 mt-4 pattern-block-print ${isFunky ? "" : "border-t border-border"}`}
        style={
          isFunky
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
              color: isFunky
                ? "oklch(var(--lime))"
                : "oklch(var(--muted-foreground))",
            }}
          >
            {isFunky
              ? "⚡ WEAR THE WORLD — FIVE CULTURES · ZERO LIMITS ⚡"
              : "Wear the world — crafted with care, worn with intention"}
          </p>
        </div>
      </div>
    </div>
  );
}
