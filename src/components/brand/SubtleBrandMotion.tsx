interface SubtleBrandMotionProps {
  label?: string;
}

/** Still mark in the margin—static so long stays are not pulled by looping motion. */
export function SubtleBrandMotion({
  label = "A quiet mark in the margin.",
}: SubtleBrandMotionProps) {
  return (
    <figure className="flex items-center gap-3 rounded-xl border border-border-subtle/40 bg-background/55 px-3 py-2">
      <span
        aria-hidden
        className="h-7 w-11 shrink-0 bg-[url('/brand/reverent-inquiry-air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-65"
      />
      <figcaption className="text-xs text-text-muted/90">{label}</figcaption>
    </figure>
  );
}
