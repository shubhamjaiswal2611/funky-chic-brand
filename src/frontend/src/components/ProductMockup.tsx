import { useThemeStore } from "../store/themeStore";

export type ProductCategory = "Tees" | "Hoodies" | "Shorts" | "Lowers";
export type ProductSeries =
  | "Social Battery Series"
  | "Memory Corruption Series"
  | "Dreamstate Division"
  | "Human Error Series"
  | "Instinct Protocol";

interface ProductMockupProps {
  series: ProductSeries;
  category: ProductCategory;
  emotion?: string;
  className?: string;
}

/* ── Silhouette paths ── */
const SILHOUETTES: Record<ProductCategory, string> = {
  Tees: "M35,28 L65,28 L72,32 L78,48 L72,52 L68,48 L68,88 L32,88 L32,48 L28,52 L22,48 L28,32 Z",
  Hoodies:
    "M32,22 L68,22 L76,28 L82,52 L74,56 L70,50 L70,92 L30,92 L30,50 L26,56 L18,52 L24,28 Z M38,22 C38,14 42,10 50,10 C58,10 62,14 62,22",
  Shorts: "M32,28 L68,28 L72,32 L74,58 L52,58 L50,48 L48,58 L26,58 L28,32 Z",
  Lowers:
    "M34,22 L66,22 L70,26 L72,42 L68,46 L68,92 L54,92 L52,56 L50,56 L48,92 L34,92 L34,46 L30,42 L32,26 Z",
};

/* ── Series-specific artwork generators ── */

function SocialBatteryArt({ color }: { color: string }) {
  return (
    <g>
      {/* Glitch horizontal lines */}
      {[38, 44, 50, 56, 62, 68, 74].map((y) => (
        <line
          key={`glitch-${y}`}
          x1={20 + (y % 3) * 8}
          y1={y}
          x2={80 - (y % 2) * 12}
          y2={y}
          stroke={color}
          strokeWidth={0.8 + (y % 2) * 0.6}
          opacity={0.4 + (y % 3) * 0.2}
        />
      ))}
      {/* Battery outline */}
      <rect
        x="38"
        y="36"
        width="24"
        height="12"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.8"
      />
      <rect
        x="62"
        y="39"
        width="3"
        height="6"
        rx="0.5"
        fill={color}
        opacity="0.6"
      />
      {/* Battery bars — 3% = 1 bar */}
      <rect
        x="40"
        y="38"
        width="4"
        height="8"
        rx="0.5"
        fill={color}
        opacity="0.9"
      />
      <rect
        x="46"
        y="38"
        width="4"
        height="8"
        rx="0.5"
        fill={color}
        opacity="0.15"
      />
      <rect
        x="52"
        y="38"
        width="4"
        height="8"
        rx="0.5"
        fill={color}
        opacity="0.15"
      />
      <rect
        x="58"
        y="38"
        width="4"
        height="8"
        rx="0.5"
        fill={color}
        opacity="0.15"
      />
      {/* Signal bars */}
      {[14, 18, 22, 26].map((h) => (
        <rect
          key={`sig-${h}`}
          x={72 + ((h - 14) / 4) * 4}
          y={70 - h}
          width="2.5"
          height={h}
          rx="0.5"
          fill={color}
          opacity={0.3 + ((h - 14) / 4) * 0.15}
        />
      ))}
      {/* Diagnostic text lines */}
      <text
        x="24"
        y="78"
        fill={color}
        fontSize="4"
        fontFamily="monospace"
        opacity="0.5"
        letterSpacing="0.1em"
      >
        {"SYS.DIAG // BATTERY_CRITICAL"}
      </text>
      <text
        x="24"
        y="84"
        fill={color}
        fontSize="3.5"
        fontFamily="monospace"
        opacity="0.35"
        letterSpacing="0.08em"
      >
        {"RECHARGE_FAILED // SIGNAL_LOST"}
      </text>
      {/* Glitch offset duplicate */}
      <rect
        x="39"
        y="37"
        width="22"
        height="10"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.2"
        transform="translate(2, 1)"
      />
    </g>
  );
}

function MemoryCorruptionArt({ color }: { color: string }) {
  return (
    <g>
      {/* Scanlines */}
      {Array.from({ length: 20 }, (_, i) => {
        const y = 30 + i * 3.2;
        return (
          <line
            key={`scan-line-${y}`}
            x1="15"
            y1={y}
            x2="85"
            y2={y}
            stroke={color}
            strokeWidth="0.4"
            opacity={0.08 + (i % 3) * 0.04}
          />
        );
      })}
      {/* VHS tracking distortion blocks */}
      {[
        { x: 22, y: 36, w: 18, h: 4 },
        { x: 58, y: 44, w: 14, h: 3 },
        { x: 30, y: 56, w: 22, h: 5 },
        { x: 48, y: 68, w: 16, h: 3 },
        { x: 24, y: 78, w: 20, h: 4 },
      ].map((r) => (
        <rect
          key={`vhs-${r.x}-${r.y}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill={color}
          opacity={0.12 + (r.x % 2) * 0.08}
        />
      ))}
      {/* Pixel erosion squares */}
      {[
        { x: 28, y: 40, s: 3 },
        { x: 66, y: 52, s: 2.5 },
        { x: 34, y: 64, s: 4 },
        { x: 60, y: 72, s: 2 },
        { x: 42, y: 80, s: 3.5 },
        { x: 72, y: 38, s: 2 },
      ].map((p) => (
        <rect
          key={`pixel-${p.x}-${p.y}`}
          x={p.x}
          y={p.y}
          width={p.s}
          height={p.s}
          fill={color}
          opacity={0.25 + (p.x % 3) * 0.1}
        />
      ))}
      {/* Corrupted face outline — abstract */}
      <ellipse
        cx="50"
        cy="52"
        rx="14"
        ry="18"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.25"
        strokeDasharray="3 2"
      />
      <ellipse
        cx="50"
        cy="52"
        rx="10"
        ry="14"
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.15"
      />
      {/* Archive text */}
      <text
        x="24"
        y="86"
        fill={color}
        fontSize="3.5"
        fontFamily="monospace"
        opacity="0.4"
        letterSpacing="0.12em"
      >
        {"ARCHIVE_DEGRADED // FILE_NOT_FOUND"}
      </text>
      <text
        x="24"
        y="90"
        fill={color}
        fontSize="3"
        fontFamily="monospace"
        opacity="0.25"
        letterSpacing="0.1em"
      >
        {"MEMORY_LEAK_DETECTED // IDENTITY_MISSING"}
      </text>
    </g>
  );
}

function DreamstateArt({ color }: { color: string }) {
  return (
    <g>
      {/* Soft cloudy gradient blobs */}
      <ellipse cx="35" cy="42" rx="16" ry="12" fill={color} opacity="0.12" />
      <ellipse cx="65" cy="56" rx="14" ry="10" fill={color} opacity="0.1" />
      <ellipse cx="45" cy="68" rx="12" ry="8" fill={color} opacity="0.08" />
      {/* Floating room / impossible stairs */}
      <rect
        x="32"
        y="38"
        width="14"
        height="10"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.3"
      />
      <rect
        x="54"
        y="50"
        width="12"
        height="8"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.25"
      />
      <rect
        x="38"
        y="62"
        width="10"
        height="7"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="0.35"
        opacity="0.2"
      />
      {/* Stair lines */}
      <line
        x1="30"
        y1="72"
        x2="70"
        y2="72"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.2"
      />
      <line
        x1="34"
        y1="68"
        x2="66"
        y2="68"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.18"
      />
      <line
        x1="38"
        y1="64"
        x2="62"
        y2="64"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.15"
      />
      {/* Dream portal circle */}
      <circle
        cx="50"
        cy="48"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.12"
        strokeDasharray="4 3"
      />
      <circle
        cx="50"
        cy="48"
        r="14"
        fill="none"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.1"
      />
      {/* Blurred typography */}
      <text
        x="24"
        y="84"
        fill={color}
        fontSize="4"
        fontFamily="monospace"
        opacity="0.3"
        letterSpacing="0.15em"
        filter="url(#dreamBlur)"
      >
        {"BETWEEN_DREAMS"}
      </text>
      <text
        x="24"
        y="89"
        fill={color}
        fontSize="3"
        fontFamily="monospace"
        opacity="0.2"
        letterSpacing="0.12em"
        filter="url(#dreamBlur)"
      >
        {"ARTIFICIAL_REALITY // SLEEP_DIVISION"}
      </text>
    </g>
  );
}

function HumanErrorArt({ color }: { color: string }) {
  return (
    <g>
      {/* Error popup boxes */}
      <rect
        x="28"
        y="32"
        width="44"
        height="18"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      <rect
        x="30"
        y="34"
        width="40"
        height="3"
        rx="0.5"
        fill={color}
        opacity="0.25"
      />
      <text
        x="32"
        y="42"
        fill={color}
        fontSize="3.5"
        fontFamily="monospace"
        opacity="0.7"
        fontWeight="bold"
      >
        ERROR: EMOTION_OVERFLOW
      </text>
      <text
        x="32"
        y="47"
        fill={color}
        fontSize="3"
        fontFamily="monospace"
        opacity="0.45"
      >
        System stability compromised.
      </text>
      {/* Second smaller popup */}
      <rect
        x="48"
        y="54"
        width="30"
        height="14"
        rx="1.5"
        fill="none"
        stroke={color}
        strokeWidth="0.7"
        opacity="0.35"
      />
      <text
        x="50"
        y="60"
        fill={color}
        fontSize="2.8"
        fontFamily="monospace"
        opacity="0.5"
      >
        WARNING: STABILITY
      </text>
      <text
        x="50"
        y="64"
        fill={color}
        fontSize="2.5"
        fontFamily="monospace"
        opacity="0.4"
      >
        Reboot required.
      </text>
      {/* UI warning triangles */}
      <polygon points="24,70 28,78 20,78" fill={color} opacity="0.3" />
      <polygon points="72,36 76,44 68,44" fill={color} opacity="0.25" />
      {/* System alert bars */}
      <rect
        x="22"
        y="82"
        width="56"
        height="2"
        rx="1"
        fill={color}
        opacity="0.2"
      />
      <rect
        x="26"
        y="86"
        width="40"
        height="1.5"
        rx="0.5"
        fill={color}
        opacity="0.15"
      />
      {/* Diagnostic footer */}
      <text
        x="24"
        y="92"
        fill={color}
        fontSize="2.8"
        fontFamily="monospace"
        opacity="0.35"
        letterSpacing="0.1em"
      >
        {"HUMAN_ERROR_DETECTED // SYSTEM_FAILURE"}
      </text>
    </g>
  );
}

function InstinctProtocolArt({ color }: { color: string }) {
  return (
    <g>
      {/* Minimal symbolic glyphs */}
      {/* Obsession — concentric circles */}
      <circle
        cx="38"
        cy="44"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.4"
      />
      <circle
        cx="38"
        cy="44"
        r="6"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.3"
      />
      <circle cx="38" cy="44" r="2.5" fill={color} opacity="0.5" />
      {/* Chaos — crossed lines */}
      <line
        x1="58"
        y1="36"
        x2="72"
        y2="50"
        stroke={color}
        strokeWidth="0.7"
        opacity="0.35"
      />
      <line
        x1="72"
        y1="36"
        x2="58"
        y2="50"
        stroke={color}
        strokeWidth="0.7"
        opacity="0.35"
      />
      <circle
        cx="65"
        cy="43"
        r="3"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.3"
      />
      {/* Silence — horizontal bar */}
      <rect
        x="30"
        y="58"
        width="18"
        height="2"
        rx="0.5"
        fill={color}
        opacity="0.25"
      />
      <rect
        x="34"
        y="62"
        width="10"
        height="1.5"
        rx="0.5"
        fill={color}
        opacity="0.18"
      />
      {/* Escape — arrow */}
      <line
        x1="56"
        y1="58"
        x2="70"
        y2="58"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.3"
      />
      <polygon points="68,55 74,58 68,61" fill={color} opacity="0.3" />
      {/* Attachment — link shape */}
      <ellipse
        cx="44"
        cy="72"
        rx="5"
        ry="3"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.25"
      />
      <ellipse
        cx="56"
        cy="72"
        rx="5"
        ry="3"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.25"
      />
      <line
        x1="49"
        y1="72"
        x2="51"
        y2="72"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.2"
      />
      {/* Overthinking — spiral hint */}
      <path
        d="M62,68 Q66,64 70,68 Q74,72 70,76"
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.2"
      />
      {/* Label */}
      <text
        x="24"
        y="88"
        fill={color}
        fontSize="3.5"
        fontFamily="monospace"
        opacity="0.35"
        letterSpacing="0.15em"
      >
        {"INSTINCT_PROTOCOL // SYMBOL_SYSTEM"}
      </text>
    </g>
  );
}

const SERIES_COLORS: Record<ProductSeries, string> = {
  "Social Battery Series": "#FF2244",
  "Memory Corruption Series": "#0066CC",
  "Dreamstate Division": "#9B7EDE",
  "Human Error Series": "#7B2FBE",
  "Instinct Protocol": "#CCFF00",
};

function SeriesArt({
  series,
  color,
}: { series: ProductSeries; color: string }) {
  switch (series) {
    case "Social Battery Series":
      return <SocialBatteryArt color={color} />;
    case "Memory Corruption Series":
      return <MemoryCorruptionArt color={color} />;
    case "Dreamstate Division":
      return <DreamstateArt color={color} />;
    case "Human Error Series":
      return <HumanErrorArt color={color} />;
    case "Instinct Protocol":
      return <InstinctProtocolArt color={color} />;
    default:
      return null;
  }
}

export function ProductMockup({
  series,
  category,
  emotion,
  className = "",
}: ProductMockupProps) {
  const mode = useThemeStore((s) => s.mode);
  const isSignal = mode === "signal";
  const color = SERIES_COLORS[series] ?? "#CCFF00";
  const silhouette = SILHOUETTES[category] ?? SILHOUETTES.Tees;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-label={`${series} ${category} mockup`}
    >
      <title>
        {series} {category}
      </title>
      <defs>
        {/* Dream blur filter */}
        <filter id="dreamBlur">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        {/* Glow filter for signal mode */}
        <filter id="signalGlow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Background gradient */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="100" y2="100">
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity={isSignal ? 0.06 : 0.04}
          />
          <stop
            offset="100%"
            stopColor={color}
            stopOpacity={isSignal ? 0.02 : 0.01}
          />
        </linearGradient>
        {/* Silhouette fill */}
        <linearGradient id="silGrad" x1="0" y1="0" x2="0" y2="100">
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity={isSignal ? 0.12 : 0.08}
          />
          <stop
            offset="100%"
            stopColor={color}
            stopOpacity={isSignal ? 0.05 : 0.03}
          />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="100" height="100" fill="url(#bgGrad)" />

      {/* Noise texture overlay */}
      {isSignal && (
        <rect
          width="100"
          height="100"
          fill="url(#noisePattern)"
          opacity="0.03"
        />
      )}

      {/* Product silhouette */}
      <path
        d={silhouette}
        fill="url(#silGrad)"
        stroke={color}
        strokeWidth="0.6"
        opacity={isSignal ? 0.35 : 0.25}
      />

      {/* Series artwork overlaid */}
      <g filter={isSignal ? "url(#signalGlow)" : undefined}>
        <SeriesArt series={series} color={color} />
      </g>

      {/* Emotion badge */}
      {emotion && (
        <g>
          <rect
            x="4"
            y="4"
            width="28"
            height="6"
            rx="1"
            fill={color}
            opacity={isSignal ? 0.15 : 0.1}
          />
          <text
            x="6"
            y="8.5"
            fill={color}
            fontSize="3.5"
            fontFamily="monospace"
            fontWeight="bold"
            opacity={isSignal ? 0.7 : 0.5}
            letterSpacing="0.08em"
          >
            {emotion.toUpperCase()}
          </text>
        </g>
      )}

      {/* Corner accent */}
      <line
        x1="2"
        y1="96"
        x2="2"
        y2="88"
        stroke={color}
        strokeWidth="0.5"
        opacity={isSignal ? 0.3 : 0.15}
      />
      <line
        x1="2"
        y1="96"
        x2="10"
        y2="96"
        stroke={color}
        strokeWidth="0.5"
        opacity={isSignal ? 0.3 : 0.15}
      />
      <line
        x1="98"
        y1="4"
        x2="98"
        y2="12"
        stroke={color}
        strokeWidth="0.5"
        opacity={isSignal ? 0.3 : 0.15}
      />
      <line
        x1="98"
        y1="4"
        x2="90"
        y2="4"
        stroke={color}
        strokeWidth="0.5"
        opacity={isSignal ? 0.3 : 0.15}
      />
    </svg>
  );
}

export default ProductMockup;
