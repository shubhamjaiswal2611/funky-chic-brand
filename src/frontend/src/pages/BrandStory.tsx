import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useThemeStore } from "../store/themeStore";

/* ── SVG motif accents ─────────────────────────────────────────── */

function MandalaDivider() {
  return (
    <div
      className="flex items-center justify-center gap-4 py-2"
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-border" />
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <title>Mandala divider</title>
        <circle
          cx="20"
          cy="20"
          r="3"
          fill="currentColor"
          className="text-secondary"
        />
        <circle
          cx="20"
          cy="20"
          r="7"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="12"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 2"
          className="text-primary"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          className="text-muted-foreground"
          fill="none"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="20"
            y1="20"
            x2={20 + 17 * Math.cos((angle * Math.PI) / 180)}
            y2={20 + 17 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-secondary"
          />
        ))}
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function PaisleySvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <title>Paisley motif</title>
      <path
        d="M30 75 C10 75 5 55 8 40 C12 20 22 10 30 5 C38 10 48 20 52 40 C55 55 50 75 30 75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M30 65 C18 65 14 52 16 42 C19 28 25 18 30 12 C35 18 41 28 44 42 C46 52 42 65 30 65Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <circle
        cx="30"
        cy="38"
        r="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="30" cy="38" r="2" fill="currentColor" opacity="0.7" />
      <path
        d="M22 18 Q18 12 22 8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function KenteStripe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true">
      <title>Kente stripe</title>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <rect
          key={i}
          x={i * 10}
          y="0"
          width="10"
          height="16"
          fill={
            i % 3 === 0
              ? "oklch(var(--secondary))"
              : i % 3 === 1
                ? "oklch(var(--primary))"
                : "oklch(var(--destructive))"
          }
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

function BlockPrintBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} aria-hidden="true">
      <title>Block print border</title>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <rect
            x="2"
            y="2"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M10 4 L16 10 L10 16 L4 10Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

/* ── Chapter data ─────────────────────────────────────────────── */

const chapters = [
  {
    id: "indian",
    label: "Chapter I",
    title: "The Court of Block & Bloom",
    subtitle: "Indian / Mughal",
    accentClass: "text-secondary",
    bgClass: "bg-muted/30",
    image: "/assets/generated/culture-indian.dim_700x700.jpg",
    imageAlt: "Indian block print and paisley fashion editorial",
    motif: "block-print" as const,
    pullQuote: "Every thread a story. Every print a dynasty.",
    paragraph:
      "In the royal ateliers of Mughal India, craftsmen pressed carved wooden blocks dipped in madder and indigo across bolts of fine cotton, conjuring gardens no eye had ever seen. Paisley spirals — the boteh — curled like flames or teardrops, symbolising the cypress tree bending in eternal wind. Mandala geometry mapped celestial order onto everyday cloth. We inherit that obsession with pattern as language: our block-print silhouettes carry centuries of court precision into the street.",
    tagline: "Block Print · Paisley · Court Geometry",
    imagePosition: "right" as const,
  },
  {
    id: "japanese",
    label: "Chapter II",
    title: "The Empty and The Full",
    subtitle: "Japanese",
    accentClass: "text-primary",
    bgClass: "bg-background",
    image: "/assets/generated/culture-japanese.dim_700x700.jpg",
    imageAlt: "Japanese wabi-sabi minimalist fashion editorial",
    motif: "paisley" as const,
    pullQuote: "Silence is the loudest colour.",
    paragraph:
      "Wabi-sabi teaches that beauty lives in imperfection — in the cracked glaze, the faded dye, the garment worn and loved until it tells your story back to you. Japan gave us the philosophy of restraint: generous white space that makes every mark breathe. Kanji strokes cross our hems as incantations. Indigo-dyed shibori swirls carry the ocean's memory. We use Japanese minimalism not as emptiness but as oxygen — the pause before the beat drops.",
    tagline: "Wabi-Sabi · Minimalism · Kanji Marks",
    imagePosition: "left" as const,
  },
  {
    id: "mexican",
    label: "Chapter III",
    title: "Fiesta Without Apology",
    subtitle: "Mexican",
    accentClass: "text-destructive",
    bgClass: "bg-muted/30",
    image: "/assets/generated/culture-mexican.dim_700x700.jpg",
    imageAlt: "Mexican Oaxacan folk art fashion editorial",
    motif: "block-print" as const,
    pullQuote: "Life is a festival. Dress accordingly.",
    paragraph:
      "Oaxacan weavers stack colours that Western palettes would never dare place side-by-side — marigold against turquoise, crimson against lime — and make them sing. Day of the Dead reminds us that boldness is a form of respect: you dress to honour the living and the gone. Mexico gave us the courage to maximise, to embroid every surface, to treat the body as a moving mural. Our Mexican chapters are unrepentant explosions of shape and chromatic nerve.",
    tagline: "Oaxacan Folk · Day of the Dead · Maximalism",
    imagePosition: "right" as const,
  },
  {
    id: "african",
    label: "Chapter IV",
    title: "The Geometry of Joy",
    subtitle: "African",
    accentClass: "text-secondary",
    bgClass: "bg-background",
    image: "/assets/generated/culture-african.dim_700x700.jpg",
    imageAlt: "African kente and Ankara fashion editorial",
    motif: "paisley" as const,
    pullQuote: "We wear our heritage like armour and like celebration.",
    paragraph:
      "Kente cloth was woven strip by strip on narrow looms by Asante royalty, each colour coding a proverb: gold for royalty, green for growth, red for blood and sacrifice. Ankara prints — originally Dutch wax but claimed and reinvented across the continent — pulse with geometric vitality that streetwear has been sampling ever since. African textile traditions remind us that fashion is always political and always festive at once. We carry that duality in our Sahara Vibes and Accra Pulse collections.",
    tagline: "Kente Geometry · Ankara Vitality · Saharan Colour",
    imagePosition: "left" as const,
  },
  {
    id: "americana",
    label: "Chapter V",
    title: "The Long Road & The Yard Line",
    subtitle: "Vintage Americana",
    accentClass: "text-primary",
    bgClass: "bg-muted/30",
    image: "/assets/generated/culture-americana.dim_700x700.jpg",
    imageAlt: "Vintage Americana streetwear fashion editorial",
    motif: "block-print" as const,
    pullQuote: "Faded denim holds the map of everywhere you've been.",
    paragraph:
      "Route 66 is not a road — it's a mythology. Denim was the original workwear democratised into the uniform of rebellion; varsity jackets carried the weight of belonging and of being seen. American folk art painted barns and hobo signs told stories in symbols. Graffiti took the city's walls and made them cathedrals. We are the inheritors of that energy: the belief that looking good is a constitutional right, that the street is a runway, that your silhouette can outshout any manifesto.",
    tagline: "Route 66 · Varsity Energy · Graffiti Truth",
    imagePosition: "right" as const,
  },
];

/* ── Chapter section component ───────────────────────────────── */

function ChapterSection({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const isLeft = chapter.imagePosition === "left";

  return (
    <section
      data-ocid={`brand-story.chapter.${index + 1}`}
      className={`${chapter.bgClass} transition-theme`}
      aria-labelledby={`chapter-heading-${chapter.id}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24">
        {/* Chapter label + border strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`font-mono text-xs tracking-widest uppercase ${chapter.accentClass}`}
            >
              {chapter.label}
            </span>
            <div className="h-px w-16 bg-current opacity-30" />
          </div>
          <BlockPrintBorder
            className={`w-full max-w-[200px] ${chapter.accentClass} opacity-40`}
          />
        </motion.div>

        {/* Content grid */}
        <div
          className={`grid gap-10 md:gap-14 lg:gap-16 items-start ${
            isLeft ? "md:grid-cols-[420px,1fr]" : "md:grid-cols-[1fr,420px]"
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative ${isLeft ? "" : "md:order-2"}`}
          >
            <div className="relative overflow-hidden rounded-lg border-cultural shadow-elevated-brand">
              <img
                src={chapter.image}
                alt={chapter.imageAlt}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              {/* Motif overlay corner */}
              <div className="absolute bottom-0 right-0 p-3 opacity-75">
                {chapter.motif === "paisley" ? (
                  <PaisleySvg className={`h-12 w-12 ${chapter.accentClass}`} />
                ) : (
                  <BlockPrintBorder className={`w-20 ${chapter.accentClass}`} />
                )}
              </div>
            </div>
            {chapter.id === "african" && (
              <KenteStripe className="mt-2 w-full rounded" />
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-col gap-6 ${isLeft ? "" : "md:order-1"}`}
          >
            <div>
              <p
                className={`mb-1 font-body text-sm font-medium uppercase tracking-widest ${chapter.accentClass}`}
              >
                {chapter.subtitle}
              </p>
              <h2
                id={`chapter-heading-${chapter.id}`}
                className="heading-brand text-3xl sm:text-4xl lg:text-5xl text-foreground"
              >
                {chapter.title}
              </h2>
            </div>

            {/* Pull quote */}
            <blockquote className="relative pl-5 py-1 border-l-4 border-current">
              <p
                className={`font-display text-lg font-semibold italic leading-snug ${chapter.accentClass}`}
              >
                "{chapter.pullQuote}"
              </p>
            </blockquote>

            <p className="font-body text-base leading-relaxed text-foreground/80 md:text-lg">
              {chapter.paragraph}
            </p>

            {/* Tagline badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {chapter.tagline.split(" · ").map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-border bg-card px-3 py-1 font-mono text-xs tracking-wider text-muted-foreground transition-smooth hover:border-current hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Manifesto mandala SVG ───────────────────────────────────── */

function ManifestaMandala({ isFunky }: { isFunky: boolean }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <title>Manifesto mandala</title>
      <circle
        cx="36"
        cy="36"
        r="6"
        fill="currentColor"
        className={isFunky ? "text-secondary" : "text-primary"}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle}>
          <circle
            cx={36 + 14 * Math.cos((angle * Math.PI) / 180)}
            cy={36 + 14 * Math.sin((angle * Math.PI) / 180)}
            r="3"
            fill="currentColor"
            className={isFunky ? "text-white/70" : "text-secondary"}
          />
          <line
            x1={36 + 10 * Math.cos((angle * Math.PI) / 180)}
            y1={36 + 10 * Math.sin((angle * Math.PI) / 180)}
            x2={36 + 30 * Math.cos((angle * Math.PI) / 180)}
            y2={36 + 30 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="0.75"
            className={isFunky ? "text-white/40" : "text-primary/30"}
          />
        </g>
      ))}
      <circle
        cx="36"
        cy="36"
        r="26"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="4 3"
        className={isFunky ? "text-secondary/60" : "text-primary/20"}
        fill="none"
      />
      <circle
        cx="36"
        cy="36"
        r="33"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 4"
        className={isFunky ? "text-white/30" : "text-muted-foreground/30"}
        fill="none"
      />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function BrandStory() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

  return (
    <div data-ocid="brand-story.page">
      {/* ── Hero ── */}
      <section
        data-ocid="brand-story.hero"
        className="relative overflow-hidden pattern-block-print"
        style={{
          background: isFunky
            ? "linear-gradient(135deg, oklch(var(--primary)) 0%, oklch(var(--destructive)) 50%, oklch(var(--secondary)) 100%)"
            : "linear-gradient(135deg, oklch(var(--primary) / 0.08) 0%, oklch(var(--secondary) / 0.06) 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p
              className={`mb-3 font-mono text-xs tracking-widest uppercase ${
                isFunky ? "text-secondary" : "text-primary"
              }`}
            >
              Our Origin
            </p>
            <h1
              className={`heading-brand text-5xl sm:text-6xl lg:text-7xl mb-6 ${
                isFunky ? "text-white" : "text-foreground"
              }`}
            >
              Where Five Worlds
              <br />
              Become One Beat
            </h1>
            <p
              className={`font-body text-lg sm:text-xl leading-relaxed max-w-xl ${
                isFunky ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              ZOLA is born from the collision of five ancient textile cultures
              and the raw energy of the modern street. This is not appropriation
              — it's a love letter written in cloth.
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute -bottom-1 left-0 w-full"
          viewBox="0 0 1440 40"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <title>Section wave</title>
          <path
            d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z"
            fill="oklch(var(--background))"
          />
        </svg>
      </section>

      {/* ── Collage banner ── */}
      <section data-ocid="brand-story.collage" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border-cultural shadow-elevated-brand"
          >
            <img
              src="/assets/generated/brand-story-collage.dim_1400x560.jpg"
              alt="Five cultures, one ZOLA — multicultural fashion editorial collage"
              className="w-full object-cover"
              style={{ maxHeight: "440px" }}
            />
            {/* Kente strip across bottom */}
            <div className="absolute bottom-0 left-0 w-full">
              <KenteStripe className="h-4 w-full" />
            </div>
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <span className="rounded-full bg-foreground/70 px-4 py-1 font-mono text-xs tracking-widest text-background uppercase backdrop-blur-sm">
                5 Cultures · 1 DNA · Infinite Looks
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chapter sections ── */}
      {chapters.map((chapter, index) => (
        <div key={chapter.id}>
          <ChapterSection chapter={chapter} index={index} />
          {index < chapters.length - 1 && (
            <div className="bg-background px-4 py-2">
              <div className="mx-auto max-w-6xl">
                <MandalaDivider />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ── Closing manifesto ── */}
      <section
        data-ocid="brand-story.manifesto"
        className="relative overflow-hidden pattern-mandala"
        style={{
          background: isFunky
            ? "linear-gradient(160deg, oklch(var(--primary)) 0%, oklch(var(--destructive) / 0.85) 60%, oklch(var(--secondary) / 0.9) 100%)"
            : "linear-gradient(160deg, oklch(var(--primary) / 0.06) 0%, oklch(var(--secondary) / 0.05) 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative mandala */}
            <div className="mb-8 flex justify-center">
              <ManifestaMandala isFunky={isFunky} />
            </div>

            <p
              className={`mb-3 font-mono text-xs tracking-widest uppercase ${
                isFunky ? "text-secondary" : "text-primary"
              }`}
            >
              The Movement
            </p>

            <h2
              data-ocid="brand-story.manifesto.heading"
              className={`heading-brand text-4xl sm:text-5xl lg:text-6xl mb-8 ${
                isFunky ? "text-white" : "text-foreground"
              }`}
            >
              You Are the
              <br />
              Fifth Culture
            </h2>

            <div
              className={`mx-auto max-w-2xl space-y-5 font-body text-base sm:text-lg leading-relaxed ${
                isFunky ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              <p>
                ZOLA was born from the belief that the most powerful garments
                are the ones that carry memory — of ancestors who mastered the
                loom, the block, the needle, the spray can. Every piece we make
                is a conversation across centuries and continents.
              </p>
              <p>
                We are not a brand selling you an aesthetic. We are building a
                tribe of people who understand that culture is not static — it
                moves, it mutates, it mashes up, it evolves. The fifth culture
                is the one you bring: your lineage, your city, your playlist,
                your story.
              </p>
              <p
                className={`font-display text-xl font-bold ${
                  isFunky ? "text-secondary" : "text-primary"
                }`}
              >
                Wear the world. Carry the beat. Be ZOLA.
              </p>
            </div>

            {/* Kente closing strip */}
            <div className="mt-12 overflow-hidden rounded-lg">
              <KenteStripe className="h-5 w-full" />
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/lookbook">
                <button
                  type="button"
                  data-ocid="brand-story.manifesto.lookbook_button"
                  className={`inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-display font-bold uppercase tracking-wide transition-smooth ${
                    isFunky
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-indigo"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Explore the Lookbook
                </button>
              </Link>
              <Link to="/newsletter">
                <button
                  type="button"
                  data-ocid="brand-story.manifesto.newsletter_button"
                  className={`inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 font-display font-bold uppercase tracking-wide transition-smooth ${
                    isFunky
                      ? "border-white/40 text-white hover:bg-white/10"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  Join the Tribe
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
