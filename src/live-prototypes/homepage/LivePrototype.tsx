export function HomepageLivePrototype() {
  const sections = [
    "Calm entry",
    "Slow opening settling",
    "Ritual discovery",
    "Home harmony atmosphere",
    "Daily rhythm invitation",
    "Gentle continuation",
  ];

  return (
    <main className="room-section-y-compact mx-auto w-full max-w-5xl px-6 sm:px-10">
      <header className="room-section-y-standard flex min-h-[70svh] flex-col gap-[var(--room-pause-standard)]">
        <p className="text-sm tracking-[0.15em] text-text-muted uppercase">Dohara - layout draft</p>
        <h1 className="max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl">
          Same site, earlier homepage structure.
        </h1>
        <p className="max-w-2xl text-text-secondary">
          Kept online as a scroll sketch; the domain and navigation match the rest of Dohara.
        </p>
      </header>

      {sections.map((section, index) => (
        <section
          key={section}
          className="room-my-standard rounded-2xl border border-border-subtle bg-surface p-8"
        >
          <p className="text-xs tracking-[0.1em] text-text-muted uppercase">Section {index + 1}</p>
          <h2 className="mt-2 text-2xl text-foreground">{section}</h2>
          <div className="mt-8 h-24 rounded-xl bg-background" />
        </section>
      ))}

      <footer className="room-my-standard rounded-2xl border border-border-subtle bg-surface p-8">
        <p className="text-text-secondary">
          Scroll away whenever; no progress is stored on this page.
        </p>
      </footer>
    </main>
  );
}
