import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";
import { type CSSProperties, useState } from "react";
import { useThemeStore } from "../store/themeStore";

type Category = "All" | "Apparel" | "Accessories" | "Lifestyle" | "Fusion Art";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: string;
  description: string;
  accentHex: string;
  bgFrom: string;
  bgTo: string;
  patternClass: "pattern-block-print" | "pattern-paisley" | "pattern-mandala";
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tokyo Drift Hoodie",
    category: "Apparel",
    price: "$128",
    description:
      "Oversized cut adorned with ukiyo-e wave motifs and graffiti kanji — where Harajuku meets Brooklyn.",
    accentHex: "#4F46E5",
    bgFrom: "#4F46E5",
    bgTo: "#1e1b4b",
    patternClass: "pattern-block-print",
  },
  {
    id: 2,
    name: "Mumbai Block Print Kurta",
    category: "Apparel",
    price: "$95",
    description:
      "Hand-block-printed cotton kurta in bold Mughal floral geometry — tailored for the streets, rooted in heritage.",
    accentHex: "#F59E0B",
    bgFrom: "#F59E0B",
    bgTo: "#92400e",
    patternClass: "pattern-paisley",
  },
  {
    id: 3,
    name: "Sahara Denim Jacket",
    category: "Apparel",
    price: "$165",
    description:
      "Woven Kente-stripe panels meet raw indigo denim — a cross-continent fusion born from West African looms.",
    accentHex: "#DC2626",
    bgFrom: "#DC2626",
    bgTo: "#7f1111",
    patternClass: "pattern-mandala",
  },
  {
    id: 4,
    name: "Oaxacan Embroidery Tee",
    category: "Apparel",
    price: "$72",
    description:
      "Organic cotton heavyweight tee with hand-embroidered Zapotec floral borders — artisan craft meets everyday wear.",
    accentHex: "#F59E0B",
    bgFrom: "#d97706",
    bgTo: "#F59E0B",
    patternClass: "pattern-block-print",
  },
  {
    id: 5,
    name: "Kyoto Silk Bandana",
    category: "Accessories",
    price: "$38",
    description:
      "100% silk scarf featuring shibori indigo-dye patterns inspired by Kyoto artisan dyehouses — wear it three ways.",
    accentHex: "#4F46E5",
    bgFrom: "#6366f1",
    bgTo: "#4F46E5",
    patternClass: "pattern-paisley",
  },
  {
    id: 6,
    name: "Brass Mandala Cuff",
    category: "Accessories",
    price: "$55",
    description:
      "Recycled brass bracelet engraved with an 8-pointed mandala drawn from Rajasthani temple architecture.",
    accentHex: "#F59E0B",
    bgFrom: "#b45309",
    bgTo: "#F59E0B",
    patternClass: "pattern-mandala",
  },
  {
    id: 7,
    name: "Graffiti Kente Cap",
    category: "Accessories",
    price: "$48",
    description:
      "6-panel structured cap combining hand-painted graffiti lettering with authentic Ghanaian Kente-inspired trim.",
    accentHex: "#DC2626",
    bgFrom: "#DC2626",
    bgTo: "#991b1b",
    patternClass: "pattern-block-print",
  },
  {
    id: 8,
    name: "Batik Canvas Tote",
    category: "Accessories",
    price: "$62",
    description:
      "Wax-resist batik canvas tote in Javanese parang patterns — holds your world, tells its stories.",
    accentHex: "#4F46E5",
    bgFrom: "#312e81",
    bgTo: "#4F46E5",
    patternClass: "pattern-paisley",
  },
  {
    id: 9,
    name: "Folk Art Incense Set",
    category: "Lifestyle",
    price: "$42",
    description:
      "Curated incense from Jaipur oud makers and Oaxacan copal harvesters — ritual meets slow living.",
    accentHex: "#F59E0B",
    bgFrom: "#92400e",
    bgTo: "#F59E0B",
    patternClass: "pattern-mandala",
  },
  {
    id: 10,
    name: "Mughal Garden Candle",
    category: "Lifestyle",
    price: "$58",
    description:
      "Soy wax candle in a hand-thrown terracotta vessel, scented with rose, vetiver and oud — a Mughal garden distilled.",
    accentHex: "#DC2626",
    bgFrom: "#DC2626",
    bgTo: "#7f1d1d",
    patternClass: "pattern-block-print",
  },
  {
    id: 11,
    name: "Tokyo × Jaipur Print",
    category: "Fusion Art",
    price: "$89",
    description:
      "Limited giclée print marrying Hokusai wave energy with Rajasthani miniature pigment work — numbered edition of 100.",
    accentHex: "#4F46E5",
    bgFrom: "#4F46E5",
    bgTo: "#1e1b4b",
    patternClass: "pattern-paisley",
  },
  {
    id: 12,
    name: "Griot Sticker Pack",
    category: "Fusion Art",
    price: "$18",
    description:
      "12 die-cut vinyl stickers fusing West African griot symbols with Tokyo street-art tag aesthetics — collab edition.",
    accentHex: "#F59E0B",
    bgFrom: "#F59E0B",
    bgTo: "#DC2626",
    patternClass: "pattern-mandala",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Apparel",
  "Accessories",
  "Lifestyle",
  "Fusion Art",
];

const FUNKY_BADGE_STYLES: Record<Exclude<Category, "All">, CSSProperties> = {
  Apparel: {
    backgroundColor: "oklch(var(--indigo) / 0.10)",
    color: "oklch(var(--indigo))",
    borderColor: "oklch(var(--indigo) / 0.30)",
  },
  Accessories: {
    backgroundColor: "oklch(var(--saffron) / 0.10)",
    color: "oklch(0.55 0.18 70)",
    borderColor: "oklch(var(--saffron) / 0.30)",
  },
  Lifestyle: {
    backgroundColor: "oklch(var(--crimson) / 0.10)",
    color: "oklch(var(--crimson))",
    borderColor: "oklch(var(--crimson) / 0.30)",
  },
  "Fusion Art": {
    backgroundColor: "oklch(var(--indigo) / 0.08)",
    color: "oklch(var(--indigo))",
    borderColor: "oklch(var(--indigo) / 0.20)",
  },
};

// Decorative mandala SVG
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
      <title>Decorative mandala motif</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
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

interface ProductCardProps {
  product: Product;
  index: number;
  isFunky: boolean;
}

function ProductCard({ product, index, isFunky }: ProductCardProps) {
  return (
    <motion.article
      data-ocid={`lookbook.item.${index + 1}`}
      className={`card-brand group overflow-hidden ${
        isFunky ? "shadow-subtle-brand" : "border border-border bg-card"
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
        {/* Gradient bg */}
        <div
          className="absolute inset-0 transition-smooth group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})`,
          }}
        />

        {/* Pattern overlay — funky only */}
        {isFunky && (
          <div
            className={`absolute inset-0 ${product.patternClass}`}
            style={{ opacity: 0.35 }}
          />
        )}

        {/* Chic: light noise overlay */}
        {!isFunky && <div className="absolute inset-0 bg-foreground/8" />}

        {/* Price tag */}
        <div
          className={`absolute top-3 right-3 rounded px-2.5 py-1 font-display text-sm font-bold transition-smooth ${
            isFunky
              ? "bg-background text-foreground"
              : "bg-background/90 text-foreground backdrop-blur-sm border border-border/60"
          }`}
          style={isFunky ? { boxShadow: `2px 2px 0 ${product.accentHex}` } : {}}
        >
          {product.price}
        </div>

        {/* Funky: accent dot */}
        {isFunky && (
          <div
            className="absolute bottom-3 left-3 w-3 h-3 rounded-full border-2 border-background"
            style={{ backgroundColor: product.accentHex }}
          />
        )}
      </div>

      {/* Card body */}
      <div
        className="p-4"
        style={
          isFunky
            ? { borderTop: `2px solid ${product.accentHex}` }
            : { borderTop: "1px solid oklch(var(--border))" }
        }
      >
        <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
          <h3
            className={`font-display font-bold leading-snug text-foreground text-sm group-hover:text-primary transition-smooth truncate flex-1 ${
              isFunky
                ? "uppercase tracking-tight text-[0.9rem]"
                : "text-[0.9rem]"
            }`}
          >
            {product.name}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 text-[9px] font-semibold uppercase tracking-wide"
            style={isFunky ? FUNKY_BADGE_STYLES[product.category] : undefined}
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

export default function Lookbook() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div data-ocid="lookbook.page" className="min-h-screen bg-background">
      {/* ── Page header with mandala motif ── */}
      <header
        className={`relative overflow-hidden py-14 md:py-20 ${
          isFunky ? "bg-card pattern-mandala" : "bg-card border-b border-border"
        }`}
        style={
          isFunky ? { borderBottom: "4px solid oklch(var(--saffron))" } : {}
        }
      >
        {/* Decorative mandalas */}
        <MandalaDecor
          className="absolute -right-14 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
          style={{
            color: isFunky
              ? "oklch(var(--saffron))"
              : "oklch(var(--indigo) / 0.10)",
          }}
        />
        <MandalaDecor
          className="absolute -left-16 top-1/2 -translate-y-1/2 w-56 h-56 opacity-60 pointer-events-none"
          style={{
            color: isFunky
              ? "oklch(var(--indigo))"
              : "oklch(var(--indigo) / 0.08)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground mb-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Curated Collections
          </motion.p>

          <motion.h1
            className="heading-brand text-5xl md:text-7xl text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isFunky ? (
              <>
                THE{" "}
                <span style={{ color: "oklch(var(--saffron))" }}>LOOKBOOK</span>
              </>
            ) : (
              "The Lookbook"
            )}
          </motion.h1>

          <motion.p
            className="max-w-md mx-auto text-muted-foreground font-body text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isFunky
              ? "12 pieces. Infinite cultures. Zero boundaries — wear the world."
              : "A carefully edited collection where global craft meets considered style."}
          </motion.p>
        </div>
      </header>

      {/* ── Sticky category filter ── */}
      <div
        data-ocid="lookbook.filter.tab"
        className={`sticky top-0 z-20 transition-theme ${
          isFunky
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-background/95 backdrop-blur-sm border-b border-border"
        }`}
        style={
          isFunky ? { borderBottom: "2px solid rgba(245,158,11,0.3)" } : {}
        }
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                      ? isFunky
                        ? "font-bold"
                        : "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={
                    isActive && isFunky
                      ? {
                          backgroundColor: "oklch(var(--saffron))",
                          color: "oklch(0.15 0.05 280)",
                          boxShadow: "3px 3px 0 oklch(var(--indigo))",
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
        {/* Count */}
        <motion.p
          key={activeCategory}
          className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            data-ocid="lookbook.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isFunky={isFunky}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state (defensive) */}
        {filtered.length === 0 && (
          <div
            data-ocid="lookbook.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <MandalaDecor className="w-20 h-20 text-muted-foreground mb-5 opacity-25" />
            <h2 className="heading-brand text-2xl text-foreground mb-2">
              Nothing here yet
            </h2>
            <p className="text-muted-foreground text-sm">
              Check back soon or explore another category.
            </p>
          </div>
        )}
      </main>

      {/* ── Bottom cultural band ── */}
      <div
        className={`py-8 mt-4 pattern-block-print ${
          isFunky
            ? "text-primary-foreground"
            : "bg-muted/40 border-t border-border"
        }`}
        style={isFunky ? { backgroundColor: "oklch(var(--indigo))" } : {}}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`heading-brand text-xs md:text-sm tracking-[0.25em] ${
              isFunky ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {isFunky
              ? "⚡ WEAR THE WORLD — MADE WITH LOVE, CRAFT & ENERGY ⚡"
              : "Wear the world — made with love, craft & intention"}
          </p>
        </div>
      </div>
    </div>
  );
}
