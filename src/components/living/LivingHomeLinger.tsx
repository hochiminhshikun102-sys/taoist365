import { livingHomeLingerIntro, livingHomeLingerParagraphs } from "@/data/living-content/home-linger";

/** Static utility list — no extra paragraph reserve. */
export function LivingHomeLinger() {
  return (
    <div className="mt-10 rounded-2xl border border-border-subtle/30 bg-background/48 p-6 sm:p-8">
      <p className="text-xs text-text-muted/78">Linger</p>
      <p className="mt-4 max-w-3xl text-sm leading-8 text-text-secondary">{livingHomeLingerIntro}</p>
      <ul className="mt-8 space-y-6">
        {livingHomeLingerParagraphs.map((para) => (
          <li key={para} className="max-w-3xl text-sm leading-8 text-text-secondary">
            {para}
          </li>
        ))}
      </ul>
    </div>
  );
}
