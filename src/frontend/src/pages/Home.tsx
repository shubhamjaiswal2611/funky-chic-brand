import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useThemeStore } from "../store/themeStore";

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 1,
    title: "Apparel",
    description: "Block prints meet streetwear silhouettes",
    img: "/assets/generated/category-apparel.dim_600x600.jpg",
    motif: "block-print",
    accent: "oklch(var(--saffron))",
    icon: Zap,
  },
  {
    id: 2,
    title: "Accessories",
    description: "Statement pieces from five continents",
    img: "/assets/generated/category-accessories.dim_600x600.jpg",
    motif: "paisley",
    accent: "oklch(var(--crimson))",
    icon: Star,
  },
  {
    id: 3,
    title: "Lifestyle",
    description: "Bring the culture home",
    img: "/assets/generated/category-lifestyle.dim_600x600.jpg",
    motif: "mandala",
    accent: "oklch(var(--indigo))",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Fusion Art",
    description: "Mughal meets Ukiyo-e meets Adinkra",
    img: "/assets/generated/category-fusion-art.dim_600x600.jpg",
    motif: "block-print",
    accent: "oklch(0.55 0.18 155)",
    icon: Star,
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Tokyo Streets Hoodie",
    collection: "Tokyo Streets",
    price: "$145",
    tag: "New Drop",
    tagColor: "oklch(var(--indigo))",
    img: "/assets/generated/product-tokyo-streets.dim_600x800.jpg",
    accentColor: "oklch(var(--indigo))",
    description:
      "Wave-washed indigo heavy-cotton hoodie with hand-screened Japanese seigaiha and Indian block-print chest panel.",
  },
  {
    id: 2,
    name: "Mumbai Blues Overshirt",
    collection: "Mumbai Blues",
    price: "$98",
    tag: "Fan Fav",
    tagColor: "oklch(var(--crimson))",
    img: "/assets/generated/product-mumbai-blues.dim_600x800.jpg",
    accentColor: "oklch(var(--crimson))",
    description:
      "Crimson heritage cotton overshirt with buta motif allover block print. Every piece is hand-stamped, no two are identical.",
  },
  {
    id: 3,
    name: "Kyoto Noir Jacket",
    collection: "Kyoto Noir",
    price: "$210",
    tag: "Signature",
    tagColor: "oklch(0.25 0.08 280)",
    img: "/assets/generated/product-kyoto-noir.dim_600x800.jpg",
    accentColor: "oklch(0.25 0.08 280)",
    description:
      "Minimalist sumi-ink jacket with kente trim at cuffs. Where silence meets ceremony. Limited to 200 pieces worldwide.",
  },
];

const collections = [
  {
    id: 1,
    title: "Tokyo Streets",
    subtitle: "Eclectic multi-cultural hoodies",
    tag: "New Drop",
    accentColor: "oklch(var(--indigo))",
    img: "/assets/generated/product-tokyo-streets.dim_600x800.jpg",
  },
  {
    id: 2,
    title: "Mumbai Blues",
    subtitle: "Heritage block print overshirts",
    tag: "Fan Fav",
    accentColor: "oklch(var(--crimson))",
    img: "/assets/generated/product-mumbai-blues.dim_600x800.jpg",
  },
  {
    id: 3,
    title: "Mexico City Art",
    subtitle: "Neon graffiti-meets-Otomi graphics",
    tag: "Limited",
    accentColor: "oklch(0.55 0.18 155)",
    img: "/assets/generated/category-fusion-art.dim_600x600.jpg",
  },
  {
    id: 4,
    title: "Sahara Vibes",
    subtitle: "Wax print patterns & Nankingrose",
    tag: "Essentials",
    accentColor: "oklch(var(--saffron))",
    img: "/assets/generated/category-apparel.dim_600x600.jpg",
  },
  {
    id: 5,
    title: "Kyoto Noir",
    subtitle: "Minimalist sumi-ink & kimono cuts",
    tag: "Signature",
    accentColor: "oklch(0.25 0.08 280)",
    img: "/assets/generated/product-kyoto-noir.dim_600x800.jpg",
  },
  {
    id: 6,
    title: "Accra Pulse",
    subtitle: "Kente-collab prints & cultural drops",
    tag: "Collab",
    accentColor: "oklch(var(--crimson))",
    img: "/assets/generated/category-accessories.dim_600x600.jpg",
  },
];

// ── SVG Motifs ───────────────────────────────────────────────────────────────

function BlockPrintMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <title>Block print motif</title>
      <rect
        x="10"
        y="10"
        width="60"
        height="60"
        rx="4"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="2"
      />
      <rect
        x="22"
        y="22"
        width="36"
        height="36"
        rx="2"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1.5"
      />
      <circle
        cx="40"
        cy="40"
        r="8"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="40"
        x2="30"
        y2="40"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1"
      />
      <line
        x1="50"
        y1="40"
        x2="70"
        y2="40"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1"
      />
      <line
        x1="40"
        y1="10"
        x2="40"
        y2="30"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1"
      />
      <line
        x1="40"
        y1="50"
        x2="40"
        y2="70"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1"
      />
    </svg>
  );
}

function MandalaMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <title>Mandala motif</title>
      <circle
        cx="40"
        cy="40"
        r="30"
        stroke="oklch(0.75 0.18 70)"
        strokeWidth="1.5"
      />
      <circle
        cx="40"
        cy="40"
        r="20"
        stroke="oklch(0.44 0.22 280)"
        strokeWidth="1"
      />
      <circle cx="40" cy="40" r="6" fill="oklch(0.75 0.18 70)" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="40"
          y1="10"
          x2="40"
          y2="20"
          stroke="oklch(0.75 0.18 70)"
          strokeWidth="1.5"
          transform={`rotate(${deg} 40 40)`}
        />
      ))}
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

  return (
    <div data-ocid="home.page">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero_section"
        className="relative overflow-hidden border-cultural"
        style={{ minHeight: "520px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/generated/hero-streetwear-fusion.dim_1400x600.jpg')`,
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isFunky
              ? "linear-gradient(135deg, oklch(var(--indigo) / 0.88) 0%, oklch(var(--crimson) / 0.35) 100%)"
              : "linear-gradient(135deg, oklch(0.08 0.06 280 / 0.80) 0%, oklch(var(--indigo) / 0.55) 100%)",
          }}
        />
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-block-print opacity-30" />

        <div
          className="relative container mx-auto px-4 flex flex-col justify-end"
          style={{ minHeight: "520px", paddingBottom: "64px" }}
        >
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {isFunky ? (
              <h1
                className="heading-brand text-5xl md:text-7xl lg:text-8xl mb-6"
                style={{ color: "oklch(var(--offwhite))", lineHeight: 1 }}
              >
                Embrace
                <br />
                the Beat.
                <br />
                <span style={{ color: "oklch(var(--saffron))" }}>
                  Fuse the World.
                </span>
              </h1>
            ) : (
              <h1
                className="heading-brand text-4xl md:text-6xl lg:text-7xl mb-6"
                style={{ color: "oklch(var(--offwhite))", lineHeight: 1.1 }}
              >
                Culture.
                <br />
                Craft.
                <br />
                <span style={{ color: "oklch(var(--saffron))" }}>
                  Connection.
                </span>
              </h1>
            )}
            <p
              className="font-body text-base md:text-lg mb-8 max-w-lg"
              style={{ color: "oklch(var(--offwhite) / 0.8)" }}
            >
              {isFunky
                ? "Where Indian block prints collide with Tokyo streets, Accra energy, and Mexico City murals. Fashion without borders."
                : "A curated collection at the intersection of global folk heritage and timeless contemporary design."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/lookbook">
                <Button
                  data-ocid="home.hero_cta_primary"
                  size="lg"
                  className="font-display font-bold uppercase tracking-wide transition-smooth"
                  style={{
                    backgroundColor: "oklch(var(--saffron))",
                    color: "oklch(0.15 0.05 280)",
                    boxShadow: isFunky
                      ? "4px 4px 0 oklch(var(--offwhite) / 0.35)"
                      : "0 4px 14px oklch(var(--saffron) / 0.35)",
                    border: "none",
                  }}
                >
                  Explore Lookbook <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
              <Link to="/brand-story">
                <Button
                  data-ocid="home.hero_cta_secondary"
                  size="lg"
                  variant="outline"
                  className="font-display font-bold uppercase tracking-wide border-2 transition-smooth"
                  style={{
                    borderColor: "oklch(var(--offwhite) / 0.55)",
                    color: "oklch(var(--offwhite))",
                    backgroundColor: "oklch(var(--offwhite) / 0.08)",
                  }}
                >
                  Our Story <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY SHOWCASE GRID ────────────────────────────── */}
      <section
        data-ocid="home.categories_section"
        className="py-16 bg-background pattern-paisley"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-display font-bold text-xs uppercase tracking-widest mb-2"
              style={{ color: "oklch(var(--saffron))" }}
            >
              Browse by World
            </p>
            <h2 className="heading-brand text-3xl md:text-4xl text-foreground">
              {isFunky ? "Shop The Universe" : "Explore Collections"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Link to="/lookbook" key={cat.id} className="block">
                  <motion.div
                    data-ocid={`home.category.item.${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="group relative overflow-hidden rounded-xl cursor-pointer transition-smooth"
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-108"
                      style={{
                        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                    {/* Overlay */}
                    <div
                      className="absolute inset-0 transition-smooth"
                      style={{
                        background: isFunky
                          ? `linear-gradient(to bottom, transparent 30%, ${cat.accent}cc 100%)`
                          : "linear-gradient(to bottom, transparent 40%, oklch(0.1 0.05 280 / 0.72) 100%)",
                      }}
                    />
                    {/* Pattern border */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        border: `3px solid ${cat.accent}`,
                        opacity: isFunky ? 0.8 : 0.3,
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                        style={{
                          backgroundColor: `${cat.accent}`,
                          boxShadow: isFunky
                            ? `0 0 12px ${cat.accent}`
                            : "none",
                        }}
                      >
                        <Icon size={14} color="oklch(var(--offwhite))" />
                      </div>
                      <p
                        className="font-display font-black text-lg uppercase tracking-tight leading-tight"
                        style={{ color: "oklch(var(--offwhite))" }}
                      >
                        {cat.title}
                      </p>
                      <p
                        className="font-body text-xs mt-1 line-clamp-1"
                        style={{ color: "oklch(var(--offwhite) / 0.75)" }}
                      >
                        {cat.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section
        data-ocid="home.featured_products_section"
        className="py-16 bg-muted/40 pattern-block-print border-cultural"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="font-display font-bold text-xs uppercase tracking-widest mb-2"
              style={{ color: "oklch(var(--crimson))" }}
            >
              Selected Pieces
            </p>
            <h2 className="heading-brand text-3xl md:text-4xl text-foreground">
              {isFunky ? "Front-Line Drops" : "Featured Collection"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => {
              const cardShadow = isFunky
                ? `4px 4px 0 ${product.accentColor}`
                : "0 2px 16px oklch(var(--indigo) / 0.1)";
              return (
                <motion.div
                  key={product.id}
                  data-ocid={`home.featured_product.item.${i + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="card-brand overflow-hidden group cursor-pointer"
                  style={{
                    boxShadow: cardShadow,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                    {/* Color accent top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: product.accentColor }}
                    />
                    <Badge
                      className="absolute top-3 left-3 font-display font-bold text-xs uppercase tracking-wider border-none"
                      style={{
                        backgroundColor: product.tagColor,
                        color: "oklch(var(--offwhite))",
                      }}
                    >
                      {product.tag}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p
                      className="font-display font-bold text-xs uppercase tracking-widest mb-1"
                      style={{ color: product.accentColor }}
                    >
                      {product.collection}
                    </p>
                    <h3 className="heading-brand text-xl text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-display font-black text-2xl"
                        style={{
                          color: isFunky
                            ? product.accentColor
                            : "oklch(var(--foreground))",
                        }}
                      >
                        {product.price}
                      </span>
                      <Link to="/lookbook">
                        <Button
                          data-ocid={`home.featured_product.view_button.${i + 1}`}
                          size="sm"
                          className="font-display font-bold uppercase tracking-wide transition-smooth"
                          style={{
                            backgroundColor: product.accentColor,
                            color: "oklch(var(--offwhite))",
                            border: "none",
                          }}
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/lookbook">
              <Button
                data-ocid="home.view_all_products_button"
                variant="outline"
                size="lg"
                className="font-display font-bold uppercase tracking-widest border-2 transition-smooth"
                style={{
                  borderColor: "oklch(var(--indigo))",
                  color: "oklch(var(--indigo))",
                }}
              >
                View Full Lookbook <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS GRID ──────────────────────────────────── */}
      <section
        data-ocid="home.collections_section"
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-display font-bold text-xs uppercase tracking-widest mb-2"
              style={{ color: "oklch(var(--saffron))" }}
            >
              Global Drops
            </p>
            <h2 className="heading-brand text-3xl md:text-4xl text-foreground">
              {isFunky ? "Collections Grid" : "World Collections"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((col, i) => (
              <Link to="/lookbook" key={col.id} className="block">
                <motion.div
                  data-ocid={`home.collection.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={col.img}
                    alt={col.title}
                    className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="collection-card-overlay absolute inset-0" />
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      border: `3px solid ${col.accentColor}`,
                      opacity: isFunky ? 0.7 : 0.25,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge
                      className="mb-2 text-xs font-display font-bold uppercase tracking-wider border-none"
                      style={{
                        backgroundColor: col.accentColor,
                        color: "oklch(var(--offwhite))",
                      }}
                    >
                      {col.tag}
                    </Badge>
                    <p
                      className="font-display font-black text-xl uppercase tracking-tight"
                      style={{ color: "oklch(var(--offwhite))" }}
                    >
                      {col.title}
                    </p>
                    <p
                      className="font-body text-xs mt-1 line-clamp-1"
                      style={{ color: "oklch(var(--offwhite) / 0.8)" }}
                    >
                      {col.subtitle}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/lookbook">
              <Button
                data-ocid="home.view_all_button"
                variant="outline"
                size="lg"
                className="font-display font-bold uppercase tracking-widest border-2 transition-smooth"
                style={{
                  borderColor: "oklch(var(--indigo))",
                  color: "oklch(var(--indigo))",
                }}
              >
                See All Drops <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY CALLOUT ───────────────────────────────── */}
      <section
        data-ocid="home.brand_callout_section"
        className="py-16 bg-muted/30 pattern-mandala"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "oklch(var(--indigo))",
              border: isFunky
                ? "3px solid oklch(var(--saffron))"
                : "1px solid oklch(var(--indigo) / 0.3)",
              boxShadow: isFunky
                ? "8px 8px 0 oklch(var(--saffron) / 0.3)"
                : "0 20px 60px oklch(var(--indigo) / 0.25)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 p-8 md:p-12">
              {/* Decorative motif left */}
              <div className="hidden lg:block w-28 flex-shrink-0 opacity-60">
                <BlockPrintMotif className="w-full" />
              </div>

              {/* Image */}
              <div className="w-full md:w-72 flex-shrink-0 rounded-xl overflow-hidden aspect-video mb-6 md:mb-0">
                <img
                  src="/assets/generated/hero-streetwear-fusion.dim_1400x600.jpg"
                  alt="ZOLA Cultural Fusion"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <p
                  className="font-display font-bold text-xs uppercase tracking-widest mb-3"
                  style={{ color: "oklch(var(--saffron) / 0.7)" }}
                >
                  Our Why
                </p>
                <h2
                  className="heading-brand text-3xl md:text-4xl mb-4"
                  style={{ color: "oklch(var(--saffron))" }}
                >
                  Our Cultural
                  <br />
                  Fusion
                </h2>
                <p
                  className="font-body text-sm leading-relaxed mb-6 max-w-md"
                  style={{ color: "oklch(var(--offwhite) / 0.8)" }}
                >
                  Celebrate a brand built with diverse artists collaborating
                  across cultural heritage. We unite traditions from Mumbai to
                  Mexico City to Accra — weaving stories into every garment,
                  every print, every stitch.
                </p>
                <Link to="/brand-story">
                  <Button
                    data-ocid="home.brand_story_cta"
                    className="font-display font-bold uppercase tracking-wide transition-smooth"
                    style={{
                      backgroundColor: "oklch(var(--saffron))",
                      color: "oklch(0.15 0.05 280)",
                      border: "none",
                      boxShadow: isFunky
                        ? "3px 3px 0 oklch(var(--offwhite) / 0.25)"
                        : "none",
                    }}
                  >
                    Discover Our Story <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Decorative motif right */}
              <div className="hidden lg:block w-28 flex-shrink-0 opacity-60">
                <MandalaMotif className="w-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER TEASER ─────────────────────────────────── */}
      <section
        data-ocid="home.newsletter_teaser_section"
        className="relative py-20 overflow-hidden pattern-mandala"
        style={{ backgroundColor: "oklch(var(--offwhite))" }}
      >
        {/* Decorative background motifs */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 hidden md:block"
          aria-hidden="true"
        >
          <MandalaMotif className="w-full h-full" />
        </div>
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 hidden md:block"
          aria-hidden="true"
        >
          <BlockPrintMotif className="w-full h-full" />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-foreground mb-1">
              The Zola Tribe
            </p>
            <p
              className="heading-brand text-2xl md:text-4xl mb-4"
              style={{
                color: isFunky
                  ? "oklch(var(--indigo))"
                  : "oklch(var(--indigo) / 0.8)",
              }}
            >
              Stay Inspired. Join the Fusion
            </p>
            <p
              className="font-body text-sm md:text-base mb-8 max-w-sm mx-auto"
              style={{ color: "oklch(var(--foreground) / 0.6)" }}
            >
              Drop alerts, culture features, and early access to limited collabs
              — delivered to your inbox.
            </p>
            <Link to="/newsletter">
              <Button
                data-ocid="home.newsletter_join_button"
                size="lg"
                className="font-display font-bold uppercase tracking-widest text-base transition-smooth"
                style={{
                  backgroundColor: "oklch(var(--indigo))",
                  color: "oklch(var(--offwhite))",
                  border: "none",
                  boxShadow: isFunky
                    ? "4px 4px 0 oklch(var(--saffron))"
                    : "0 8px 24px oklch(var(--indigo) / 0.25)",
                }}
              >
                Join the Tribe
              </Button>
            </Link>
            <div className="flex justify-center items-center gap-3 mt-6">
              <span
                className="font-body text-sm font-semibold"
                style={{ color: "oklch(var(--indigo))" }}
              >
                Indigo
              </span>
              <span className="font-body text-sm text-muted-foreground">·</span>
              <span
                className="font-body text-sm font-semibold"
                style={{ color: "oklch(var(--saffron))" }}
              >
                Saffron
              </span>
              <span className="font-body text-sm text-muted-foreground">·</span>
              <span
                className="font-body text-sm font-semibold"
                style={{ color: "oklch(var(--crimson))" }}
              >
                Crimson
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
