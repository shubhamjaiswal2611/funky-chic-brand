import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useBackend } from "../hooks/useBackend";
import { useThemeStore } from "../store/themeStore";
import type { LoreDrop } from "../types";

// ── Emotional colour system
const EC = {
  chaos: "oklch(var(--chaos))",
  isolation: "oklch(var(--isolation))",
  obsession: "oklch(var(--obsession))",
  escape: "oklch(var(--escape))",
  overthinking: "oklch(var(--overthinking))",
  burnout: "oklch(var(--burnout))",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 1,
    title: "Tees",
    description: "Oversized 240 GSM statement tees",
    icon: Layers,
    gradient:
      "linear-gradient(135deg, oklch(var(--obsession))33 0%, oklch(var(--isolation))55 100%)",
    accentColor: "oklch(var(--obsession))",
  },
  {
    id: 2,
    title: "Hoodies",
    description: "400 GSM heavyweight drop-shoulder",
    icon: Cpu,
    gradient:
      "linear-gradient(135deg, oklch(var(--chaos))33 0%, oklch(var(--overthinking))55 100%)",
    accentColor: "oklch(var(--chaos))",
  },
  {
    id: 3,
    title: "Shorts",
    description: "Minimal symbolic utility shorts",
    icon: Database,
    gradient:
      "linear-gradient(135deg, oklch(var(--escape))33 0%, oklch(var(--isolation))55 100%)",
    accentColor: "oklch(var(--escape))",
  },
  {
    id: 4,
    title: "Lowers",
    description: "Utility-inspired relaxed silhouettes",
    icon: HardDrive,
    gradient:
      "linear-gradient(135deg, oklch(var(--burnout))44 0%, oklch(var(--overthinking))44 100%)",
    accentColor: "oklch(var(--overthinking))",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Battery: 3% Tee",
    collection: "Social Battery Series",
    price: "Rs.1,499",
    tag: "New Drop",
    tagColor: EC.obsession,
    accentColor: EC.obsession,
    gradient:
      "linear-gradient(160deg, oklch(0.12 0.03 130) 0%, oklch(0.06 0.02 130) 100%)",
    description:
      "When your social battery hits critical. 240 GSM oversized tee with battery-UI back print and micro-logo chest.",
  },
  {
    id: 2,
    name: "Recharge Failed Hoodie",
    collection: "Social Battery Series",
    price: "Rs.2,999",
    tag: "Fan Fav",
    tagColor: EC.isolation,
    accentColor: EC.isolation,
    gradient:
      "linear-gradient(160deg, oklch(0.10 0.03 210) 0%, oklch(0.06 0.02 210) 100%)",
    description:
      "400 GSM dropped-shoulder hoodie. System error signal print across the back. Interaction overload never looked this good.",
  },
  {
    id: 3,
    name: "Missing Identity Tee",
    collection: "Memory Corruption Series",
    price: "Rs.1,799",
    tag: "Limited",
    tagColor: EC.burnout,
    accentColor: EC.burnout,
    gradient:
      "linear-gradient(160deg, oklch(0.14 0.02 260) 0%, oklch(0.08 0.01 260) 100%)",
    description:
      "VHS-corrupted identity graphic. Pixel erosion print on 240 GSM oversized tee. Memory leak never felt so wearable.",
  },
];

const collections = [
  {
    id: 1,
    title: "Emotional Archive",
    subtitle: "Chaos · Isolation · Escape",
    tag: "Featured",
    gradient:
      "linear-gradient(135deg, oklch(var(--overthinking))44 0%, oklch(0.08 0.02 290) 100%)",
    accentColor: EC.overthinking,
  },
  {
    id: 2,
    title: "Dreamstate Division",
    subtitle: "Surreal architecture · Dream dimensions",
    tag: "New Drop",
    gradient:
      "linear-gradient(135deg, oklch(var(--isolation))44 0%, oklch(0.06 0.02 210) 100%)",
    accentColor: EC.isolation,
  },
  {
    id: 3,
    title: "Human Error Series",
    subtitle: "System failures · Emotional reports",
    tag: "Fan Fav",
    gradient:
      "linear-gradient(135deg, oklch(var(--chaos))44 0%, oklch(0.08 0.02 30) 100%)",
    accentColor: EC.chaos,
  },
  {
    id: 4,
    title: "Instinct Protocol",
    subtitle: "Obsession · Signal · Silence",
    tag: "Signature",
    gradient:
      "linear-gradient(135deg, oklch(var(--obsession))33 0%, oklch(0.06 0.02 125) 100%)",
    accentColor: EC.obsession,
  },
  {
    id: 5,
    title: "Memory Corruption",
    subtitle: "VHS textures · Corrupted identity",
    tag: "Limited",
    gradient:
      "linear-gradient(135deg, oklch(var(--burnout))55 0%, oklch(0.09 0.01 260) 100%)",
    accentColor: EC.burnout,
  },
];

const manifestoBadges = [
  "EMOTIONAL",
  "FUTURISTIC",
  "ALTERNATIVE",
  "CINEMATIC",
  "SYMBOLIC",
];

// ── Reel series data ─────────────────────────────────────────────────────────
const reelSeries = [
  {
    id: 1,
    name: "Emotional Archive",
    emotion: "chaos",
    gradient:
      "linear-gradient(135deg, oklch(var(--chaos)) 0%, oklch(0.08 0.02 30) 100%)",
  },
  {
    id: 2,
    name: "Dreamstate Division",
    emotion: "escape",
    gradient:
      "linear-gradient(135deg, oklch(var(--escape)) 0%, oklch(0.08 0.02 300) 100%)",
  },
  {
    id: 3,
    name: "Human Error Series",
    emotion: "overthinking",
    gradient:
      "linear-gradient(135deg, oklch(var(--overthinking)) 0%, oklch(0.08 0.02 290) 100%)",
  },
  {
    id: 4,
    name: "Instinct Protocol",
    emotion: "obsession",
    gradient:
      "linear-gradient(135deg, oklch(var(--obsession)) 0%, oklch(0.06 0.02 125) 100%)",
  },
  {
    id: 5,
    name: "Memory Corruption",
    emotion: "isolation",
    gradient:
      "linear-gradient(135deg, oklch(var(--isolation)) 0%, oklch(0.06 0.02 270) 100%)",
  },
];

// ── Countdown helpers ───────────────────────────────────────────────────────
function formatCountdown(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

// ── SVG Motifs ───────────────────────────────────────────────────────────────

function SystemGridMotif({
  className,
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <title>System grid motif</title>
      {([0, 20, 40, 60, 80] as number[]).map((x) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="80"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
      {([0, 20, 40, 60, 80] as number[]).map((y) => (
        <line
          key={`h-${y}`}
          x1="0"
          y1={y}
          x2="80"
          y2={y}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
      <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="2" fill="currentColor" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="60" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function SignalBarsMotif({
  className,
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <title>Signal bars motif</title>
      <rect
        x="8"
        y="55"
        width="10"
        height="17"
        rx="1"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="23"
        y="42"
        width="10"
        height="30"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="38"
        y="28"
        width="10"
        height="44"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="53"
        y="14"
        width="10"
        height="58"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
      <line
        x1="4"
        y1="76"
        x2="76"
        y2="76"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const mode = useThemeStore((s) => s.mode);
  const isSignal = mode === "signal";

  const heroAccent = isSignal ? EC.obsession : "oklch(var(--primary))";
  const heroBorder = isSignal
    ? `1px solid ${EC.obsession}66`
    : "1px solid oklch(var(--border))";

  // ── Lore Drop Countdown state ────────────────────────────────────────────
  const { actor } = useBackend();
  const [loreDrop, setLoreDrop] = useState<LoreDrop | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let cancelled = false;
    async function fetchLore() {
      if (!actor) return;
      try {
        const result = await actor.getLoreDrop();
        if (!cancelled) setLoreDrop(result ?? null);
      } catch {
        // ignore
      }
    }
    fetchLore();
    return () => {
      cancelled = true;
    };
  }, [actor]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const targetMs =
    loreDrop != null
      ? Number(loreDrop.targetTimestamp) / 1_000_000
      : Date.now() + 7 * 86400000;
  const remaining = targetMs - now;
  const countdown = formatCountdown(remaining);
  const isZero = remaining <= 0;

  return (
    <div data-ocid="home.page">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero_section"
        className="relative overflow-hidden"
        style={{
          minHeight: "90vh",
          background: isSignal
            ? "linear-gradient(145deg, oklch(0.05 0.02 280) 0%, oklch(0.08 0.04 280) 50%, oklch(0.06 0.03 210) 100%)"
            : "linear-gradient(145deg, oklch(0.10 0.02 260) 0%, oklch(0.14 0.03 260) 100%)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${heroAccent}0f 1px, transparent 1px), linear-gradient(90deg, ${heroAccent}0f 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: isSignal ? 0.5 : 0.2,
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "-5%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: isSignal
              ? `radial-gradient(circle, ${EC.obsession}22 0%, transparent 70%)`
              : "radial-gradient(circle, oklch(var(--primary) / 0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-5%",
            left: "-5%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background: isSignal
              ? `radial-gradient(circle, ${EC.isolation}22 0%, transparent 70%)`
              : "radial-gradient(circle, oklch(var(--secondary) / 0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative container mx-auto px-4 flex flex-col justify-center"
          style={{
            minHeight: "90vh",
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: heroAccent }}
              />
              <span
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: heroAccent }}
              >
                {isSignal ? "SIGNAL_ACTIVE" : "ARCHIVE_OPEN"}
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-black uppercase leading-none mb-6"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 10rem)",
                letterSpacing: "-0.03em",
                color: "oklch(var(--foreground))",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              ALT<span style={{ color: heroAccent }}>INSTINCT</span>
            </motion.h1>

            <motion.p
              className="font-body text-base md:text-xl mb-10 max-w-2xl leading-relaxed"
              style={{ color: "oklch(var(--foreground) / 0.65)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              Alternative Digital Emotion Culture &mdash;{" "}
              <span style={{ color: "oklch(var(--foreground) / 0.9)" }}>
                where emotions become clothing and identity becomes the signal.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
            >
              <Link to="/lookbook">
                <Button
                  data-ocid="home.hero_cta_primary"
                  size="lg"
                  className="font-display font-black uppercase tracking-wider transition-smooth"
                  style={{
                    backgroundColor: heroAccent,
                    color: "oklch(0.08 0.02 280)",
                    border: "none",
                    boxShadow: isSignal
                      ? `0 0 24px ${EC.obsession}66, 4px 4px 0 oklch(0.08 0.02 280 / 0.3)`
                      : "0 4px 16px oklch(var(--primary) / 0.3)",
                    letterSpacing: "0.12em",
                  }}
                >
                  ENTER SYSTEM <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/brand-story">
                <Button
                  data-ocid="home.hero_cta_secondary"
                  size="lg"
                  variant="outline"
                  className="font-display font-black uppercase tracking-wider border-2 transition-smooth"
                  style={{
                    borderColor: "oklch(var(--foreground) / 0.3)",
                    color: "oklch(var(--foreground))",
                    backgroundColor: "transparent",
                    letterSpacing: "0.12em",
                  }}
                >
                  ACCESS ARCHIVE <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LORE DROP COUNTDOWN ───────────────────────────────── */}
      <section
        data-ocid="home.lore_countdown_section"
        className="py-20 bg-background"
        style={{ borderBottom: heroBorder }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: heroAccent }}
            >
              {isSignal ? "INCOMING_SIGNAL" : "NEXT_DROP"}
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {isSignal ? "SIGNAL INCOMING" : "NEXT DROP"}
            </h2>
            <p
              className="font-body text-sm md:text-base mt-3 max-w-md mx-auto"
              style={{ color: "oklch(var(--foreground) / 0.55)" }}
            >
              A new chapter is loading. Stay tuned.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {isZero ? (
              <div
                className="text-center"
                data-ocid="home.countdown.zero_state"
              >
                <span
                  className="font-display font-black uppercase text-2xl md:text-4xl"
                  style={{
                    color: heroAccent,
                    textShadow: isSignal ? `0 0 24px ${heroAccent}88` : "none",
                  }}
                >
                  SIGNAL INCOMING
                </span>
              </div>
            ) : (
              <>
                {[
                  { value: countdown.days, label: "DAYS" },
                  { value: countdown.hours, label: "HOURS" },
                  { value: countdown.minutes, label: "MINUTES" },
                  { value: countdown.seconds, label: "SECONDS" },
                ].map((unit, i) => (
                  <div
                    key={unit.label}
                    data-ocid={`home.countdown.item.${i + 1}`}
                    className="countdown-container"
                  >
                    <span className="countdown-digit">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="countdown-label">{unit.label}</span>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SELECT YOUR SIGNAL ────────────────────────────────── */}
      <section
        data-ocid="home.categories_section"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: heroAccent }}
            >
              FORM_SELECT
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {isSignal ? "SELECT YOUR SIGNAL" : "CHOOSE YOUR FORM"}
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
                    style={{
                      aspectRatio: "1 / 1",
                      background: cat.gradient,
                      border: isSignal
                        ? `1px solid ${cat.accentColor}44`
                        : "1px solid oklch(var(--border))",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${cat.accentColor}33 1px, transparent 1px), linear-gradient(90deg, ${cat.accentColor}33 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
                      style={{
                        background: `radial-gradient(circle at 50% 80%, ${cat.accentColor}22 0%, transparent 70%)`,
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                        style={{
                          backgroundColor: `${cat.accentColor}22`,
                          border: `1px solid ${cat.accentColor}55`,
                        }}
                      >
                        <Icon size={14} style={{ color: cat.accentColor }} />
                      </div>
                      <p className="font-display font-black text-xl uppercase tracking-tight leading-tight text-foreground">
                        {cat.title}
                      </p>
                      <p
                        className="font-mono text-xs mt-1 line-clamp-1"
                        style={{ color: "oklch(var(--foreground) / 0.5)" }}
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

      {/* ── LATEST TRANSMISSIONS ──────────────────────────────── */}
      <section
        data-ocid="home.featured_products_section"
        className="py-20 bg-muted/30"
        style={{ borderTop: heroBorder, borderBottom: heroBorder }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: heroAccent }}
            >
              TRANSMISSION_LOG
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {isSignal ? "LATEST TRANSMISSIONS" : "FRESH FROM THE ARCHIVE"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                data-ocid={`home.featured_product.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group rounded-xl overflow-hidden cursor-pointer"
                style={{
                  border: isSignal
                    ? `1px solid ${product.accentColor}44`
                    : "1px solid oklch(var(--border))",
                  background: "oklch(var(--card))",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4", background: product.gradient }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(${product.accentColor}22 1px, transparent 1px), linear-gradient(90deg, ${product.accentColor}22 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${product.accentColor}33 0%, transparent 60%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <Badge
                    className="absolute top-3 left-3 font-mono font-bold text-xs uppercase tracking-wider"
                    style={{
                      backgroundColor: `${product.tagColor}22`,
                      color: product.tagColor,
                      border: `1px solid ${product.tagColor}55`,
                    }}
                  >
                    {product.tag}
                  </Badge>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <span
                      className="font-mono text-xs uppercase tracking-[0.15em] px-3 py-1 rounded"
                      style={{
                        backgroundColor: `${product.accentColor}22`,
                        color: product.accentColor,
                        border: `1px solid ${product.accentColor}44`,
                      }}
                    >
                      {product.collection}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3
                    className="font-display font-black text-lg uppercase text-foreground mb-2"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display font-black text-2xl"
                      style={{ color: product.accentColor }}
                    >
                      {product.price}
                    </span>
                    <Link to="/lookbook">
                      <Button
                        data-ocid={`home.featured_product.view_button.${i + 1}`}
                        size="sm"
                        className="font-mono font-bold uppercase tracking-wider transition-smooth"
                        style={{
                          backgroundColor: `${product.accentColor}22`,
                          color: product.accentColor,
                          border: `1px solid ${product.accentColor}55`,
                          letterSpacing: "0.1em",
                        }}
                      >
                        VIEW
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/lookbook">
              <Button
                data-ocid="home.view_all_products_button"
                variant="outline"
                size="lg"
                className="font-mono font-bold uppercase tracking-widest border transition-smooth"
                style={{ borderColor: heroAccent, color: heroAccent }}
              >
                VIEW ALL DROPS <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC ARCHIVE (Reel Gallery) ────────────────── */}
      <section
        data-ocid="home.reel_gallery_section"
        className="py-20 bg-muted/30"
        style={{ borderTop: heroBorder, borderBottom: heroBorder }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: heroAccent }}
            >
              ARCHIVE_REELS
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              CINEMATIC ARCHIVE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reelSeries.map((series, i) => (
              <motion.div
                key={series.id}
                data-ocid={`home.reel.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="reel-card group"
                style={{
                  background: series.gradient,
                  border: isSignal
                    ? `1px solid ${EC[series.emotion as keyof typeof EC]}44`
                    : "1px solid oklch(var(--border))",
                }}
              >
                {/* Dark gradient overlay from bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0 0 0 / 0.55) 0%, oklch(0 0 0 / 0.1) 60%, oklch(0 0 0 / 0) 100%)",
                  }}
                />
                {/* Play icon */}
                <div className="reel-play">
                  <Play size={40} fill="white" stroke="white" strokeWidth={0} />
                </div>
                {/* Series label */}
                <div className="reel-label">
                  <span className="font-display font-black uppercase text-sm tracking-wide">
                    {series.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ARCHIVES ──────────────────────────────────────── */}
      <section
        data-ocid="home.collections_section"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: heroAccent }}
            >
              ARCHIVE_INDEX
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              THE ARCHIVES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((col, i) => (
              <Link to="/lookbook" key={col.id} className="block">
                <motion.div
                  data-ocid={`home.collection.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  style={{
                    aspectRatio: "4/3",
                    background: col.gradient,
                    border: isSignal
                      ? `1px solid ${col.accentColor}44`
                      : "1px solid oklch(var(--border))",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(${col.accentColor}22 1px, transparent 1px), linear-gradient(90deg, ${col.accentColor}22 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${col.accentColor}22 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ backgroundColor: col.accentColor }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <Badge
                      className="mb-2 text-xs font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${col.accentColor}22`,
                        color: col.accentColor,
                        border: `1px solid ${col.accentColor}44`,
                      }}
                    >
                      {col.tag}
                    </Badge>
                    <p className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                      {col.title}
                    </p>
                    <p
                      className="font-mono text-xs mt-1 line-clamp-1"
                      style={{ color: "oklch(var(--foreground) / 0.5)" }}
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
                className="font-mono font-bold uppercase tracking-widest border transition-smooth"
                style={{ borderColor: heroAccent, color: heroAccent }}
              >
                OPEN FULL ARCHIVE <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO CALLOUT ────────────────────────────────── */}
      <section
        data-ocid="home.brand_callout_section"
        className="py-20 bg-muted/30"
        style={{ borderTop: heroBorder }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-2xl overflow-hidden p-8 md:p-16 text-center"
            style={{
              background: isSignal
                ? "linear-gradient(135deg, oklch(0.10 0.04 280) 0%, oklch(0.12 0.05 280) 100%)"
                : "linear-gradient(135deg, oklch(var(--card)) 0%, oklch(var(--muted)) 100%)",
              border: heroBorder,
              boxShadow: isSignal
                ? `0 0 60px ${EC.obsession}22, inset 0 1px 0 ${EC.obsession}22`
                : "0 20px 60px oklch(var(--foreground) / 0.05)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-8 mb-10 opacity-30">
              <SystemGridMotif
                className="w-12 h-12"
                style={{ color: heroAccent }}
              />
              <SignalBarsMotif
                className="w-12 h-12"
                style={{ color: heroAccent }}
              />
              <SystemGridMotif
                className="w-12 h-12"
                style={{ color: heroAccent }}
              />
            </div>

            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-6"
              style={{ color: heroAccent }}
            >
              MANIFESTO_v2.0
            </p>
            <h2
              className="font-display font-black uppercase text-foreground mb-2"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              EMOTIONS ARE SYSTEMS.
            </h2>
            <h2
              className="font-display font-black uppercase mb-2"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                letterSpacing: "-0.02em",
                color: heroAccent,
              }}
            >
              IDENTITY IS THE SIGNAL.
            </h2>
            <h2
              className="font-display font-black uppercase text-foreground mb-10"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              ALTINSTINCT IS THE ARCHIVE.
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {manifestoBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  data-ocid={`home.manifesto_badge.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="font-mono text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: `${heroAccent}15`,
                    color: heroAccent,
                    border: `1px solid ${heroAccent}44`,
                  }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            <Link to="/brand-story">
              <Button
                data-ocid="home.brand_story_cta"
                className="font-mono font-bold uppercase tracking-widest transition-smooth"
                style={{
                  backgroundColor: heroAccent,
                  color: "oklch(0.08 0.02 280)",
                  border: "none",
                  boxShadow: isSignal ? `0 0 20px ${heroAccent}55` : "none",
                  letterSpacing: "0.12em",
                }}
              >
                READ THE MANIFESTO <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── JOIN THE SIGNAL ───────────────────────────────────── */}
      <section
        data-ocid="home.newsletter_teaser_section"
        className="relative py-24 overflow-hidden bg-background"
        style={{ borderTop: heroBorder }}
      >
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 w-40 h-40 hidden md:block"
          aria-hidden="true"
          style={{ color: heroAccent, opacity: 0.08 }}
        >
          <SystemGridMotif className="w-full h-full" />
        </div>
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 hidden md:block"
          aria-hidden="true"
          style={{ color: heroAccent, opacity: 0.08 }}
        >
          <SignalBarsMotif className="w-full h-full" />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: heroAccent }}
            >
              SIGNAL_BROADCAST
            </p>
            <h2
              className="font-display font-black uppercase text-foreground mb-2"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {isSignal ? "JOIN THE SIGNAL" : "ACCESS THE ARCHIVE"}
            </h2>
            <p
              className="font-body text-sm md:text-base mb-8 max-w-sm mx-auto"
              style={{ color: "oklch(var(--foreground) / 0.55)" }}
            >
              Drop alerts, archive releases, and early access to limited-run
              pieces &mdash; delivered straight to your inbox.
            </p>
            <Link to="/newsletter">
              <Button
                data-ocid="home.newsletter_join_button"
                size="lg"
                className="font-mono font-black uppercase tracking-widest text-base transition-smooth"
                style={{
                  backgroundColor: heroAccent,
                  color: "oklch(0.08 0.02 280)",
                  border: "none",
                  boxShadow: isSignal
                    ? `0 0 28px ${heroAccent}55, 4px 4px 0 oklch(0.08 0.02 280 / 0.2)`
                    : "0 8px 24px oklch(var(--primary) / 0.25)",
                  letterSpacing: "0.12em",
                }}
              >
                SUBSCRIBE TO SIGNAL
              </Button>
            </Link>

            <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
              {(
                [
                  ["CHAOS", EC.chaos],
                  ["ISOLATION", EC.isolation],
                  ["OBSESSION", EC.obsession],
                  ["ESCAPE", EC.escape],
                  ["OVERTHINKING", EC.overthinking],
                  ["BURNOUT", EC.burnout],
                ] as [string, string][]
              ).map(([label, color]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: "oklch(var(--foreground) / 0.4)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
