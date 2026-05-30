import { ProductMockup } from "@/components/ProductMockup";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useThemeStore } from "../store/themeStore";

type Category = "All" | "Tees" | "Hoodies" | "Shorts" | "Lowers";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  series: string;
  emotion: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Battery: 3% Tee",
    category: "Tees",
    price: "₹2499",
    description:
      "Running on empty. 240 GSM oversized cut for the socially drained.",
    gradientFrom: "#9CA3AF",
    gradientTo: "#1a1a1a",
    series: "Social Battery Series",
    emotion: "Burnout",
  },
  {
    id: 2,
    name: "Recharge Failed Hoodie",
    category: "Hoodies",
    price: "₹3999",
    description:
      "When rest doesn't work. 400 GSM dropped-shoulder isolation armour.",
    gradientFrom: "#0EA5E9",
    gradientTo: "#0a0a14",
    series: "Social Battery Series",
    emotion: "Isolation",
  },
  {
    id: 3,
    name: "Interaction Overload Shorts",
    category: "Shorts",
    price: "₹1999",
    description:
      "Too many people. Too many signals. Minimal utility shorts for controlled chaos.",
    gradientFrom: "#FF2D2D",
    gradientTo: "#1a0000",
    series: "Social Battery Series",
    emotion: "Chaos",
  },
  {
    id: 4,
    name: "Missing Identity Tee",
    category: "Tees",
    price: "₹2499",
    description: "Identity corrupted. 240 GSM tee with VHS distortion energy.",
    gradientFrom: "#7C3AED",
    gradientTo: "#0a0014",
    series: "Memory Corruption",
    emotion: "Overthinking",
  },
  {
    id: 5,
    name: "Memory Leak Hoodie",
    category: "Hoodies",
    price: "₹3999",
    description:
      "Something is draining you from within. Toxic green signal against the void.",
    gradientFrom: "#39FF14",
    gradientTo: "#001400",
    series: "Memory Corruption",
    emotion: "Obsession",
  },
  {
    id: 6,
    name: "Archive Lost Lowers",
    category: "Lowers",
    price: "₹1999",
    description:
      "Files deleted. Identity incomplete. Utility lowers for the erased.",
    gradientFrom: "#0EA5E9",
    gradientTo: "#000a14",
    series: "Memory Corruption",
    emotion: "Isolation",
  },
  {
    id: 7,
    name: "Between Dreams Tee",
    category: "Tees",
    price: "₹2499",
    description:
      "Caught between sleep and reality. Lavender surreal dimensions on skin.",
    gradientFrom: "#C084FC",
    gradientTo: "#0a0014",
    series: "Dreamstate Division",
    emotion: "Escape",
  },
  {
    id: 8,
    name: "Artificial Reality Hoodie",
    category: "Hoodies",
    price: "₹3999",
    description: "Which world is real? 400 GSM deep violet portal hoodie.",
    gradientFrom: "#7C3AED",
    gradientTo: "#050010",
    series: "Dreamstate Division",
    emotion: "Overthinking",
  },
  {
    id: 9,
    name: "Sleep Division Shorts",
    category: "Shorts",
    price: "₹1999",
    description:
      "Division between conscious and dream state. Soft lavender on midnight shorts.",
    gradientFrom: "#C084FC",
    gradientTo: "#0a0014",
    series: "Dreamstate Division",
    emotion: "Escape",
  },
  {
    id: 10,
    name: "Emotion Overload Tee",
    category: "Tees",
    price: "₹2499",
    description:
      "System error — feelings exceeded capacity. Infrared warning signal tee.",
    gradientFrom: "#FF2D2D",
    gradientTo: "#1a0000",
    series: "Human Error Series",
    emotion: "Chaos",
  },
  {
    id: 11,
    name: "Human System Failure Hoodie",
    category: "Hoodies",
    price: "₹3999",
    description:
      "Stability corrupted. Ash grey 400 GSM — the colour of emotional burnout.",
    gradientFrom: "#9CA3AF",
    gradientTo: "#111111",
    series: "Human Error Series",
    emotion: "Burnout",
  },
  {
    id: 12,
    name: "Chaos Tee",
    category: "Tees",
    price: "₹2499",
    description:
      "Pure instinct. Pure disorder. Infrared red on void black — the Chaos symbol.",
    gradientFrom: "#FF2D2D",
    gradientTo: "#0A0A0A",
    series: "Instinct Protocol",
    emotion: "Chaos",
  },
];

const CATEGORIES: Category[] = ["All", "Tees", "Hoodies", "Shorts", "Lowers"];

const CATEGORY_BADGE_STYLES: Record<Exclude<Category, "All">, CSSProperties> = {
  Tees: {
    backgroundColor: "rgba(57,255,20,0.12)",
    color: "#39FF14",
    borderColor: "rgba(57,255,20,0.30)",
  },
  Hoodies: {
    backgroundColor: "rgba(14,165,233,0.12)",
    color: "#0EA5E9",
    borderColor: "rgba(14,165,233,0.30)",
  },
  Shorts: {
    backgroundColor: "rgba(255,45,45,0.12)",
    color: "#FF2D2D",
    borderColor: "rgba(255,45,45,0.30)",
  },
  Lowers: {
    backgroundColor: "rgba(124,58,237,0.12)",
    color: "#7C3AED",
    borderColor: "rgba(124,58,237,0.30)",
  },
};

interface ProductCardProps {
  product: Product;
  index: number;
  isSignal: boolean;
}

function ProductCard({ product, index, isSignal }: ProductCardProps) {
  return (
    <motion.article
      data-ocid={`lookbook.item.${index + 1}`}
      className={`card-brand group overflow-hidden ${
        isSignal ? "shadow-subtle-brand" : "border border-border bg-card"
      }`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.07,
        ease: "easeOut",
      }}
    >
      {/* 3:4 image placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        <ProductMockup
          series={
            product.series as import("@/components/ProductMockup").ProductSeries
          }
          category={product.category}
          emotion={product.emotion}
          className="w-full h-full transition-smooth group-hover:scale-105"
        />

        {/* Price tag */}
        <div
          className={`absolute top-3 right-3 rounded px-2.5 py-1 font-display text-sm font-bold transition-smooth ${
            isSignal
              ? "bg-background text-foreground"
              : "bg-background/90 text-foreground backdrop-blur-sm border border-border/60"
          }`}
          style={
            isSignal ? { boxShadow: `2px 2px 0 ${product.gradientFrom}` } : {}
          }
        >
          {product.price}
        </div>

        {/* Signal: emotion tag */}
        {isSignal && (
          <div
            className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"
            style={{
              backgroundColor: `${product.gradientFrom}22`,
              color: product.gradientFrom,
              border: `1px solid ${product.gradientFrom}44`,
            }}
          >
            {product.emotion}
          </div>
        )}
      </div>

      {/* Card body */}
      <div
        className="p-4"
        style={
          isSignal
            ? { borderTop: `2px solid ${product.gradientFrom}` }
            : { borderTop: "1px solid oklch(var(--border))" }
        }
      >
        {/* Series badge */}
        <p
          className="text-[9px] font-semibold uppercase tracking-[0.2em] mb-1.5"
          style={{
            color: isSignal
              ? product.gradientFrom
              : "oklch(var(--muted-foreground))",
          }}
        >
          {product.series}
        </p>
        <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
          <h3
            className={`font-display font-bold leading-snug text-foreground text-sm group-hover:text-primary transition-smooth truncate flex-1 ${
              isSignal
                ? "uppercase tracking-tight text-[0.9rem]"
                : "text-[0.9rem]"
            }`}
          >
            {product.name}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 text-[9px] font-semibold uppercase tracking-wide"
            style={CATEGORY_BADGE_STYLES[product.category]}
          >
            {product.category}
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.article>
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
        mood ? `lookbook.mood.${mood.toLowerCase()}` : "lookbook.mood.clear"
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

export default function Lookbook() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeMood, setActiveMood] = useState<Mood | null>(null);
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

  const categoryFiltered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const matched = activeMood
    ? categoryFiltered.filter(
        (p) => p.emotion.toLowerCase() === activeMood.toLowerCase(),
      )
    : [];
  const others = activeMood
    ? categoryFiltered.filter(
        (p) => p.emotion.toLowerCase() !== activeMood.toLowerCase(),
      )
    : categoryFiltered;

  return (
    <div data-ocid="lookbook.page" className="min-h-screen bg-background">
      {/* ── Page header ── */}
      <header
        className={`relative overflow-hidden py-14 md:py-20 ${
          isSignal ? "bg-card" : "bg-card border-b border-border"
        }`}
        style={isSignal ? { borderBottom: "4px solid #39FF14" } : {}}
      >
        {/* Signal mode: glowing circuit lines */}
        {isSignal && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute right-0 top-0 w-96 h-96 opacity-10"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, #39FF14 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute left-0 bottom-0 w-64 h-64 opacity-8"
              style={{
                background:
                  "radial-gradient(circle at 30% 70%, #0EA5E9 0%, transparent 60%)",
              }}
            />
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground mb-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isSignal
              ? "// ALTINSTINCT SYSTEM — EMOTIONAL ARCHIVE"
              : "Altinstinct — Emotional Archive"}
          </motion.p>

          <motion.h1
            className="heading-brand text-5xl md:text-7xl text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isSignal ? (
              <>
                THE{" "}
                <span
                  style={{ color: "#39FF14", textShadow: "0 0 20px #39FF1440" }}
                >
                  ARCHIVE
                </span>
              </>
            ) : (
              "EMOTIONAL ARCHIVE"
            )}
          </motion.h1>

          <motion.p
            className="max-w-md mx-auto text-muted-foreground font-body text-sm md:text-base tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select your signal. Wear your state.
          </motion.p>
        </div>
      </header>

      {/* ── Sticky mood + category filter ── */}
      <div
        data-ocid="lookbook.filter.tab"
        className={`sticky top-0 z-20 transition-theme ${
          isSignal
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-background/95 backdrop-blur-sm border-b border-border"
        }`}
        style={
          isSignal ? { borderBottom: "2px solid rgba(57,255,20,0.2)" } : {}
        }
      >
        <div className="container mx-auto px-4">
          {/* Mood chips */}
          <div className="flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          <div className="flex gap-1.5 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`lookbook.filter.${cat.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? isSignal
                        ? "font-bold"
                        : "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={
                    isActive && isSignal
                      ? {
                          backgroundColor: "#39FF14",
                          color: "#0A0A0A",
                          boxShadow: "3px 3px 0 #0EA5E9",
                        }
                      : {}
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <main className="container mx-auto px-4 py-10 md:py-14">
        {/* Matched section */}
        {activeMood && matched.length > 0 && (
          <section className="mb-10">
            <motion.p
              key={`matched-${activeCategory}-${activeMood}`}
              className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {matched.length} {matched.length === 1 ? "item" : "items"} matches
              your vibe · {activeMood}
            </motion.p>
            <motion.div
              key={`matched-grid-${activeCategory}-${activeMood}`}
              data-ocid="lookbook.list.matched"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {matched.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  isSignal={isSignal}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* Others / All section */}
        {others.length > 0 && (
          <section>
            {activeMood && (
              <motion.p
                key={`others-${activeCategory}-${activeMood}`}
                className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {others.length} {others.length === 1 ? "item" : "items"} ·{" "}
                {activeMood ? "All Drops" : "Full Archive"}
                {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
              </motion.p>
            )}
            {!activeMood && (
              <motion.p
                key={`count-${activeCategory}`}
                className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {others.length} {others.length === 1 ? "item" : "items"}
                {activeCategory !== "All"
                  ? ` · ${activeCategory}`
                  : " · Full Archive"}
              </motion.p>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${activeCategory}-${activeMood ?? "all"}`}
                data-ocid="lookbook.list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {others.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    isSignal={isSignal}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* Empty state (defensive) */}
        {matched.length === 0 && others.length === 0 && (
          <div
            data-ocid="lookbook.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-border mb-5 flex items-center justify-center">
              <span className="text-2xl text-muted-foreground">∅</span>
            </div>
            <h2 className="heading-brand text-2xl text-foreground mb-2">
              {isSignal ? "NO SIGNAL DETECTED" : "Nothing here yet"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isSignal
                ? "Select a different emotional frequency."
                : "Check back soon or explore another category."}
            </p>
          </div>
        )}
      </main>

      {/* ── Bottom signal band ── */}
      <div
        className={`py-8 mt-4 ${
          isSignal ? "border-t" : "bg-muted/40 border-t border-border"
        }`}
        style={
          isSignal
            ? {
                borderColor: "rgba(57,255,20,0.2)",
                backgroundColor: "rgba(57,255,20,0.03)",
              }
            : {}
        }
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`heading-brand text-xs md:text-sm tracking-[0.25em] ${
              isSignal ? "text-foreground" : "text-muted-foreground"
            }`}
            style={isSignal ? { color: "#39FF1488" } : {}}
          >
            {isSignal
              ? "⚡ EMOTIONS ARE SYSTEMS — WEAR YOUR STATE — ALTINSTINCT ⚡"
              : "Emotions are systems — wear your state — AltInstinct"}
          </p>
        </div>
      </div>
    </div>
  );
}
