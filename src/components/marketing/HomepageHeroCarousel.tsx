import Link from "next/link";

const heroSlides = [
  {
    desktop: "/home-hero/desktop-01.png",
    mobile: "/home-hero/mobile-01.png",
    title: "Windform",
    href: "/collections/wind-objects",
  },
  {
    desktop: "/home-hero/desktop-02.png",
    mobile: "/home-hero/mobile-02.png",
    title: "Inner Quiet",
    href: "/objects",
  },
  {
    desktop: "/home-hero/desktop-03.png",
    mobile: "/home-hero/mobile-03.png",
    title: "Wind Form",
    href: "/collections",
  },
] as const;

export function HomepageHeroCarousel() {
  return (
    <section className="homepage-hero-carousel relative aspect-[853/1844] bg-[#eef3f5] md:aspect-video" aria-label="Homepage hero carousel">
      <h1 className="sr-only">Reverent Inquiry</h1>
      {heroSlides.map((slide, index) => (
        <div
          key={slide.desktop}
          className="homepage-hero-carousel__slide absolute inset-0"
          style={{ animationDelay: `${index * 6}s` }}
          aria-hidden={index === 0 ? undefined : true}
        >
          <picture className="absolute inset-0 block">
            <source media="(max-width: 767px)" srcSet={slide.mobile} />
            <img
              src={slide.desktop}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-contain"
            />
          </picture>
        </div>
      ))}
      <nav className="absolute inset-x-0 top-0 z-[2] mx-auto hidden h-[7.5rem] max-w-[92rem] items-center justify-center gap-[3.5rem] px-10 text-sm text-foreground/72 lg:flex" aria-label="Hero navigation">
        <Link href="/healing">Healing</Link>
        <Link href="/windkeep">Windkeep</Link>
        <Link href="/inquiry">Driftbox</Link>
        <Link href="/live">Live</Link>
        <Link href="/objects">Objects</Link>
        <Link href="/healing/stories">Journal</Link>
      </nav>
      <Link
        href="/"
        className="homepage-hero-brand-breath absolute left-5 top-5 z-[3] hidden items-center gap-3 text-foreground/72 sm:left-8 sm:top-7 lg:left-10 lg:top-9 lg:flex"
        aria-label="Reverent Inquiry home"
      >
        <span
          aria-hidden
          className="h-7 w-12 shrink-0 bg-[url('/brand/production/air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-72"
        />
        <span className="font-[var(--font-display-serif)] text-xl leading-none tracking-normal sm:text-2xl">
          Reverent Inquiry
        </span>
      </Link>
      <div className="absolute left-[8%] top-[58%] z-[2] hidden lg:block">
        {heroSlides.map((slide, index) => (
          <Link
            key={slide.href}
            href={slide.href}
            className="homepage-hero-carousel__entry absolute h-16 w-64"
            style={{ animationDelay: `${index * 6}s` }}
            aria-label={slide.title}
          />
        ))}
      </div>
    </section>
  );
}
