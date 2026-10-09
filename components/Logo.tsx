type LogoProps = {
  /** "light" for light backgrounds (ink strokes), "dark" for dark backgrounds. */
  variant?: "light" | "dark";
  /** Play the one-time "settle" of the gold bowl on load. */
  settle?: boolean;
  width?: number;
  height?: number;
};

/** The "da" monogram: raw material (outlined d) beside refined material (gold a). */
export function Logo({
  variant = "light",
  settle = false,
  width = 52,
  height = 38,
}: LogoProps) {
  const stroke = variant === "dark" ? "#E8EEEA" : "#13221F";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 100"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="36" cy="62" r="22" fill="none" stroke={stroke} strokeWidth="10" />
      <line x1="63" y1="10" x2="63" y2="84" stroke={stroke} strokeWidth="10" strokeLinecap="round" />
      <circle
        className={settle ? "da-settle" : undefined}
        cx="100"
        cy="62"
        r="27"
        fill="#D4A12A"
      />
      <line x1="127" y1="36" x2="127" y2="84" stroke={stroke} strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
