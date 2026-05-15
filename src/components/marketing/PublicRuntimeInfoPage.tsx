import Link from "next/link";

const pageCopy = {
  shipping: {
    eyebrow: "Public Version",
    title: "Shipping",
    body: "Shipping is handled plainly, with region availability, carrier timing, and packaging notes shown before a final order is confirmed.",
    points: ["Region availability", "Carrier and handling state", "Packaging care", "Human support when needed"],
  },
  refund: {
    eyebrow: "Public Version",
    title: "Refund",
    body: "Refund requests are reviewed with order state, shipment state, and human context. The public page stays short; the full runtime stays in Admin OS.",
    points: ["Request review", "Return or shipment link", "Payment release state", "Clear human reply"],
  },
  privacy: {
    eyebrow: "Public Version",
    title: "Privacy",
    body: "Reverent Inquiry keeps the public privacy explanation concise. Full GDPR, CCPA, audit, AML, and sanctions handling stays in the backend runtime.",
    points: ["Account data", "Order data", "Locale and region data", "Backend compliance runtime"],
  },
  cookie: {
    eyebrow: "Public Version",
    title: "Cookie",
    body: "Cookies are used for basic site operation, session continuity, and low-pressure service quality. No public page exposes backend compliance controls.",
    points: ["Essential session state", "Preference memory", "Service quality", "Consent versioning"],
  },
  "quiet-extracts": {
    eyebrow: "Frontstage Runtime",
    title: "Quiet Extracts",
    body: "Quiet Extracts are short notes, object traces, and small public fragments from the Reverent Inquiry world.",
    points: ["Small notes", "Object traces", "Soft reading", "No feed pressure"],
  },
  journal: {
    eyebrow: "Frontstage Runtime",
    title: "Journal",
    body: "Journal is the quieter written layer of Reverent Inquiry: ordinary observations, object stories, and seasonal notes.",
    points: ["Object stories", "Seasonal notes", "Human presence", "Low-pressure reading"],
  },
  driftbox: {
    eyebrow: "Frontstage Runtime",
    title: "Driftbox",
    body: "Driftbox is quiet correspondence. It is not a social feed or support widget; it is a place for careful questions and replies.",
    points: ["Quiet correspondence", "Human replies", "Archive state", "No public risk controls"],
  },
  "wind-seeker-intro": {
    eyebrow: "Public Intro",
    title: "Wind Seeker",
    body: "Wind Seeker is the global distributed object discovery network of Reverent Inquiry. It helps discovered objects become clear, reviewed, and ready to continue.",
    points: ["Discover", "Photograph", "AI generate", "Review", "Publish"],
  },
} as const;

export type PublicRuntimeInfoKey = keyof typeof pageCopy;

export function PublicRuntimeInfoPage({ pageKey }: Readonly<{ pageKey: PublicRuntimeInfoKey }>) {
  const content = pageCopy[pageKey];
  return (
    <main className="min-h-dvh bg-[#F0F2F5] px-5 py-10 text-[#2C323C]">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-[#646E7A]">Reverent Inquiry</Link>
        <div className="mt-8 rounded-[28px] border border-[#D7DCE3] bg-[#E8EBF0] p-6 sm:p-10">
          <p className="text-sm text-[#646E7A]">{content.eyebrow}</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.01em] text-[#2C323C]">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#646E7A]">{content.body}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {content.points.map((point) => (
            <div key={point} className="rounded-2xl border border-[#D7DCE3] bg-white p-5">
              <p className="text-lg font-semibold text-[#2C323C]">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
