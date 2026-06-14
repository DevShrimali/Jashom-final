/* Minimal line glyphs for card corners. Sit at the top-right of a
   .card-neon; the stroke goes neon (warm-white + glow) on card hover. */

export type GlyphVariant = "chip" | "nodes" | "tune" | "pulse" | "doc" | "wave" | "memory";

const S = "var(--text-secondary)";

export default function CardGlyph({ variant }: { variant: GlyphVariant }) {
  return (
    <svg
      className="neon-glyph"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      {variant === "chip" && (
        <>
          <rect className="neon-track" x="44" y="24" width="52" height="52" rx="6" stroke={S} strokeWidth="1.3" />
          <rect x="58" y="38" width="24" height="24" rx="3" stroke={S} strokeWidth="1.1" />
          <path d="M52 76 V96 M70 76 V104 M88 76 V90" stroke={S} strokeWidth="1.1" />
          <path d="M44 38 H28 M44 60 H20" stroke={S} strokeWidth="1.1" />
          <circle cx="70" cy="50" r="2" fill={S} />
        </>
      )}
      {variant === "nodes" && (
        <>
          <circle cx="84" cy="28" r="9" stroke={S} strokeWidth="1.3" />
          <circle cx="46" cy="58" r="9" stroke={S} strokeWidth="1.3" />
          <circle cx="92" cy="78" r="9" stroke={S} strokeWidth="1.3" />
          <path className="neon-track" style={{ animationDelay: "0s" }} d="M76 33 L54 52" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.15s" }} d="M54 64 L84 74" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.3s" }} d="M88 37 L91 69" stroke={S} strokeWidth="1.1" />
          <circle cx="84" cy="28" r="2.2" fill={S} />
          <circle cx="46" cy="58" r="2.2" fill={S} />
        </>
      )}
      {variant === "tune" && (
        <>
          <path d="M32 36 H100 M32 84 H100" stroke={S} strokeWidth="1.2" />
          <path className="neon-track" d="M32 60 H100" stroke={S} strokeWidth="1.2" />
          <circle cx="76" cy="36" r="6" fill="#F7F7F4" stroke={S} strokeWidth="1.3" />
          <circle cx="52" cy="60" r="6" fill="#F7F7F4" stroke={S} strokeWidth="1.3" />
          <circle cx="88" cy="84" r="6" fill="#F7F7F4" stroke={S} strokeWidth="1.3" />
        </>
      )}
      {variant === "pulse" && (
        <>
          <path className="neon-track" d="M24 60 H46 L56 36 L68 84 L78 52 L84 60 H104" stroke={S} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="104" cy="60" r="2.5" fill={S} />
        </>
      )}
      {variant === "doc" && (
        <>
          <rect x="44" y="22" width="50" height="62" rx="5" stroke={S} strokeWidth="1.3" />
          <path className="neon-track" style={{ animationDelay: "0s" }} d="M54 38 H84" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.12s" }} d="M54 50 H78" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.24s" }} d="M54 62 H84" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.36s" }} d="M54 74 H70" stroke={S} strokeWidth="1.1" />
        </>
      )}
      {variant === "wave" && (
        <>
          <path d="M24 64 C 38 44, 50 44, 62 64 S 88 84, 102 64" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
          <path className="neon-track" d="M24 44 C 38 24, 50 24, 62 44 S 88 64, 102 44" stroke={S} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        </>
      )}
      {variant === "memory" && (
        <>
          <rect x="36" y="30" width="60" height="36" rx="4" stroke={S} strokeWidth="1.3" />
          <path d="M44 66 V80 M56 66 V88 M68 66 V80 M80 66 V88 M92 66 V80" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0s" }} d="M44 42 H88" stroke={S} strokeWidth="1.1" />
          <path className="neon-track" style={{ animationDelay: "0.15s" }} d="M44 52 H72" stroke={S} strokeWidth="1.1" />
        </>
      )}
    </svg>
  );
}
