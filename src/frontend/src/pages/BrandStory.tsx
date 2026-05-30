import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useThemeStore } from "../store/themeStore";

/* ── SVG motif accents ─────────────────────────────────────────── */

// removed - replaced with AltInstinct content

// removed

// removed

// removed

/* ── Chapter data ─────────────────────────────────────────────── */

const emotionalColors: Record<string, string> = {
  violet: "oklch(0.62 0.25 290)",
  blue: "oklch(0.65 0.22 210)",
  green: "oklch(0.88 0.3 130)",
  ash: "oklch(0.55 0.05 260)",
  red: "oklch(0.60 0.28 30)",
};

const pillars = [
  {
    id: "emotional",
    index: "01",
    title: "EMOTIONAL",
    color: emotionalColors.violet,
    colorLabel: "Overthinking · Violet",
    image: "/assets/generated/pillar-emotional.dim_700x700.jpg",
    imageAlt: "Abstract violet gradient — Emotional pillar",
    pullQuote:
      "Every thread carries a frequency. Every graphic is a transmission.",
    paragraph:
      "People should FEEL the designs. We don't make clothes — we make transmissions. Each graphic is encoded with a specific emotional frequency. When you wear it, you're not just dressing. You're broadcasting. The feeling is the point. The feeling is the product.",
    tags: ["Frequency", "Transmission", "Feeling"],
    imagePosition: "right" as const,
    bgClass: "bg-muted/20",
  },
  {
    id: "futuristic",
    index: "02",
    title: "FUTURISTIC",
    color: emotionalColors.blue,
    colorLabel: "Isolation · Cold Blue",
    image: "/assets/generated/pillar-futuristic.dim_700x700.jpg",
    imageAlt: "Abstract cold blue gradient — Futuristic pillar",
    pullQuote: "The future is not chrome — it is emotion rendered in data.",
    paragraph:
      "Not sci-fi robotic. Not chrome and metal. More: digital humanity. The future we build is warm inside a cold interface. Emotions encoded, compressed, transmitted. Humans navigating systems that were never built for them. That tension — that friction — is the aesthetic.",
    tags: ["Digital Humanity", "Cold Interface", "Signal"],
    imagePosition: "left" as const,
    bgClass: "bg-background",
  },
  {
    id: "alternative",
    index: "03",
    title: "ALTERNATIVE",
    color: emotionalColors.green,
    colorLabel: "Obsession · Toxic Green",
    image: "/assets/generated/pillar-alternative.dim_700x700.jpg",
    imageAlt: "Abstract toxic green gradient — Alternative pillar",
    pullQuote:
      "For those who never fit the algorithm. For those who choose signal over noise.",
    paragraph:
      "Anti-basic fashion. We exist for the ones who scrolled past the algorithm and kept going. The ones who refuse to be recommended. You didn't discover us — you recognised us. ALTINSTINCT is not for everyone. It was never supposed to be.",
    tags: ["Anti-Algorithm", "Non-Conformist", "Raw"],
    imagePosition: "right" as const,
    bgClass: "bg-muted/20",
  },
  {
    id: "cinematic",
    index: "04",
    title: "CINEMATIC",
    color: emotionalColors.ash,
    colorLabel: "Burnout · Ash Grey",
    image: "/assets/generated/pillar-cinematic.dim_700x700.jpg",
    imageAlt: "Abstract ash grey gradient — Cinematic pillar",
    pullQuote: "Everything feels like a movie frame. Every location is a set.",
    paragraph:
      "Metro stations at 3AM. Rooftops with no skyline. Parking lots in the rain. Empty rooms with one light. Every ALTINSTINCT drop is shot like a film — not a campaign, a scene. The clothes are costumes. The wearer is the character. The street is the cinema.",
    tags: ["Metro Stations", "Rainy Streets", "Empty Rooms"],
    imagePosition: "left" as const,
    bgClass: "bg-background",
  },
  {
    id: "symbolic",
    index: "05",
    title: "SYMBOLIC",
    color: emotionalColors.red,
    colorLabel: "Chaos · Infrared Red",
    image: "/assets/generated/pillar-symbolic.dim_700x700.jpg",
    imageAlt: "Abstract infrared red gradient — Symbolic pillar",
    pullQuote: "Designs carry meaning. We built a symbolic language.",
    paragraph:
      "Obsession. Silence. Chaos. Attachment. Escape. Overthinking. These are not words on a shirt — they are symbols in a language we are building drop by drop. The longer you follow ALTINSTINCT, the more fluent you become. The symbols are the culture. The symbols are the identity.",
    tags: ["Obsession", "Chaos", "Escape", "Overthinking"],
    imagePosition: "right" as const,
    bgClass: "bg-muted/20",
  },
];

const drops = [
  {
    id: "DROP_001",
    status: "ARCHIVED",
    event: "Identity corruption begins.",
    timestamp: "EPOCH_001 // SIGNAL INITIATED",
    detail:
      "The first transmissions were unstable. Identity files began fragmenting. The first drop was not a collection — it was a diagnostic.",
  },
  {
    id: "DROP_002",
    status: "ARCHIVED",
    event: "Emotions become unstable.",
    timestamp: "EPOCH_002 // SYSTEM DESTABILISED",
    detail:
      "Emotional registers exceeded safe parameters. The second drop mapped the overflow — what happens when feeling outpaces form.",
  },
  {
    id: "DROP_003",
    status: "INCOMING",
    event: "Dreamstate accessed.",
    timestamp: "EPOCH_003 // INITIALISING",
    detail:
      "The third signal is loading. Dreamstate Division activates. Sleep architecture becomes fashion architecture. Stand by.",
  },
];

/* ── Chapter section component ───────────────────────────────── */

function SystemLine({ color }: { color?: string }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        SYS —
      </span>
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color ?? "oklch(var(--muted-foreground))" }}
      />
      <div className="h-px w-16 bg-border" />
    </div>
  );
}

function PillarSection({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const isLeft = pillar.imagePosition === "left";

  return (
    <section
      data-ocid={`brand-story.pillar.${index + 1}`}
      className={`${pillar.bgClass} transition-all duration-300`}
      aria-labelledby={`pillar-heading-${pillar.id}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <SystemLine color={pillar.color} />
        </motion.div>

        <div
          className={`grid gap-10 md:gap-16 items-start ${
            isLeft ? "md:grid-cols-[420px,1fr]" : "md:grid-cols-[1fr,420px]"
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`relative ${isLeft ? "" : "md:order-2"}`}
          >
            <div
              className="relative overflow-hidden rounded-lg border border-border"
              style={{ boxShadow: `0 0 40px ${pillar.color}22` }}
            >
              <img
                src={pillar.image}
                alt={pillar.imageAlt}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="font-mono text-[10px] tracking-widest px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${pillar.color}33`,
                    color: pillar.color,
                    border: `1px solid ${pillar.color}55`,
                  }}
                >
                  {pillar.index}
                </span>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{
                  background: `linear-gradient(to top, ${pillar.color}44 0%, transparent 100%)`,
                }}
              >
                <span className="font-mono text-[10px] tracking-widest text-foreground/60 uppercase">
                  {pillar.colorLabel}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isLeft ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className={`flex flex-col gap-6 ${isLeft ? "" : "md:order-1"}`}
          >
            <div>
              <p
                className="mb-2 font-mono text-[10px] tracking-widest uppercase"
                style={{ color: pillar.color }}
              >
                BRAND PILLAR · {pillar.index}
              </p>
              <h2
                id={`pillar-heading-${pillar.id}`}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
              >
                {pillar.title}
              </h2>
            </div>

            <blockquote
              className="relative pl-4 py-1"
              style={{ borderLeft: `3px solid ${pillar.color}` }}
            >
              <p className="font-display text-lg font-semibold leading-snug text-foreground/90">
                &ldquo;{pillar.pullQuote}&rdquo;
              </p>
            </blockquote>

            <p className="font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              {pillar.paragraph}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {pillar.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-sm border px-3 py-1 font-mono text-[11px] tracking-wider text-muted-foreground"
                  style={{
                    borderColor: `${pillar.color}44`,
                    backgroundColor: `${pillar.color}0d`,
                  }}
                >
                  {tag.toUpperCase()}
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

// removed - replaced by manifesto section inline

/* ── Page ─────────────────────────────────────────────────────── */

export default function BrandStory() {
  const mode = useThemeStore((s) => s.mode);
  const isSignal = mode === "signal";

  return (
    <div data-ocid="brand-story.page">
      {/* ── Hero ── */}
      <section
        data-ocid="brand-story.hero"
        className="relative overflow-hidden"
        style={{
          background: isSignal
            ? "linear-gradient(135deg, oklch(0.08 0.02 280) 0%, oklch(0.12 0.06 290) 60%, oklch(0.10 0.04 280) 100%)"
            : "linear-gradient(135deg, oklch(var(--background)) 0%, oklch(var(--muted)) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isSignal
              ? "linear-gradient(oklch(0.88 0.3 130 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0.3 130 / 0.04) 1px, transparent 1px)"
              : "none",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <p className="mb-4 font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              ALTINSTINCT · ORIGIN SIGNAL · THE ARCHIVE
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-none">
              ALTINSTINCT:
              <br />
              <span
                style={{
                  color: isSignal
                    ? "oklch(0.88 0.3 130)"
                    : "oklch(var(--primary))",
                }}
              >
                THE ORIGIN
              </span>
              <br />
              SIGNAL
            </h1>
            <p className="font-body text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mb-8">
              Not gothic. Not techwear. Not anime-core. Not luxury copycat.
              <br />
              <span className="text-foreground font-medium">
                Something new.
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                data-ocid="brand-story.enter_archive_button"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
                style={{
                  backgroundColor: isSignal
                    ? "oklch(0.88 0.3 130)"
                    : "oklch(var(--primary))",
                  color: isSignal
                    ? "oklch(0.08 0.02 280)"
                    : "oklch(var(--primary-foreground))",
                }}
              >
                ENTER SYSTEM
              </Link>
              <Link
                to="/lookbook"
                data-ocid="brand-story.access_archive_button"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors duration-200"
              >
                ACCESS ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: isSignal
              ? "linear-gradient(90deg, transparent, oklch(0.88 0.3 130 / 0.4), transparent)"
              : "linear-gradient(90deg, transparent, oklch(var(--border)), transparent)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Brand positioning ── */}
      <section
        data-ocid="brand-story.positioning"
        className="bg-card border-b border-border"
      >
        <div className="mx-auto max-w-6xl px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {(
              [
                { label: "IDENTITY", sub: "Who you are" },
                { label: "EMOTIONS", sub: "What you feel" },
                { label: "INTERNET CULTURE", sub: "Where you live" },
                { label: "FUTURISTIC AESTHETICS", sub: "How you see" },
              ] as const
            ).map((item, i) => (
              <div key={item.label} className="text-center">
                <p
                  className="font-mono text-[10px] tracking-widest uppercase mb-1"
                  style={{ color: Object.values(emotionalColors)[i] }}
                >
                  {item.label}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {item.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Five Brand Pillars ── */}
      {pillars.map((pillar, index) => (
        <PillarSection key={pillar.id} pillar={pillar} index={index} />
      ))}

      {/* ── Drop Lore ── */}
      <section
        data-ocid="brand-story.drop-lore"
        className="bg-card border-t border-border"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
              SYSTEM LOG / DROP HISTORY
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              THE DROP LORE
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {drops.map((drop, i) => (
              <motion.div
                key={drop.id}
                data-ocid={`brand-story.drop.${i + 1}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-sm border border-border bg-background p-5 font-mono"
                style={{
                  borderLeft: `3px solid ${
                    drop.status === "INCOMING"
                      ? "oklch(0.88 0.3 130)"
                      : "oklch(var(--muted-foreground))"
                  }`,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs tracking-widest text-foreground font-bold">
                      {drop.id}
                    </span>
                    <span
                      className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
                      style={{
                        backgroundColor:
                          drop.status === "INCOMING"
                            ? "oklch(0.88 0.3 130 / 0.15)"
                            : "oklch(var(--muted))",
                        color:
                          drop.status === "INCOMING"
                            ? "oklch(0.88 0.3 130)"
                            : "oklch(var(--muted-foreground))",
                      }}
                    >
                      {drop.status}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-wider text-muted-foreground">
                    {drop.timestamp}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2 font-bold">
                  &gt; {drop.event}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {drop.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section
        data-ocid="brand-story.manifesto"
        className="relative overflow-hidden"
        style={{
          background: isSignal
            ? "oklch(0.06 0.02 280)"
            : "oklch(var(--foreground))",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(1 0 0 / 0.1) 2px, oklch(1 0 0 / 0.1) 3px)",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p
              className="font-mono text-[11px] tracking-[0.3em] uppercase mb-8"
              style={{ color: "oklch(0.88 0.3 130 / 0.7)" }}
            >
              MANIFESTO / FINAL SIGNAL
            </p>
            <div className="space-y-4 mb-10">
              {(
                [
                  "YOU WERE NEVER MEANT TO FIT IN.",
                  "INSTINCT CANNOT BE PROGRAMMED.",
                  "EMOTIONS ARE SYSTEMS.",
                  "ALTINSTINCT IS THE SIGNAL.",
                ] as const
              ).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="font-display font-extrabold tracking-tight leading-none"
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                    color:
                      i === 3 ? "oklch(0.88 0.3 130)" : "oklch(0.92 0.01 70)",
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
              <Link
                to="/products"
                data-ocid="brand-story.manifesto_cta_button"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-sm transition-colors duration-200"
                style={{
                  backgroundColor: "oklch(0.88 0.3 130)",
                  color: "oklch(0.08 0.02 280)",
                }}
              >
                ENTER SYSTEM
              </Link>
              <Link
                to="/lookbook"
                data-ocid="brand-story.manifesto_lookbook_button"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-sm border transition-colors duration-200"
                style={{
                  borderColor: "oklch(0.92 0.01 70 / 0.3)",
                  color: "oklch(0.92 0.01 70 / 0.7)",
                }}
              >
                ACCESS ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
