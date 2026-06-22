"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomepageBrowserRoom.module.css";

const S01 = "/brand/production/homepage/mobile-v2/s01-first-screen";
const S02 = "/brand/production/homepage/mobile-v2/s02-second-screen";
const S03 = "/brand/production/homepage/mobile-v2/s03-third-screen";
const S04 = "/brand/production/homepage/mobile-v2/s04-fourth-screen";
const S05 = "/brand/production/homepage/mobile-v2/s05-fifth-screen";
const S06 = "/brand/production/homepage/mobile-v2/s06-sixth-screen";

const heroSlides = [
  {
    image: "hero_slide_01@3x.png.png",
    motion: "Rain",
    title: "Feeling a little lost?",
    subtitle: "Start with one quiet step.",
    titleBox: { x: 88, y: 330, w: 660, h: 72 },
    subtitleBox: { x: 88, y: 414, w: 620, h: 40 },
    titleColor: "#4F3559",
    subtitleColor: "#5F4B68",
  },
  {
    image: "hero_slide_02@3x.png.png",
    motion: "Cloth",
    title: "Closer than it feels.",
    subtitle: "One sign can change the road.",
    titleBox: { x: 72, y: 405, w: 650, h: 72 },
    subtitleBox: { x: 72, y: 489, w: 660, h: 40 },
    titleColor: "#123A68",
    subtitleColor: "#123A68",
  },
  {
    image: "hero_slide_03@3x.png.png",
    motion: "Curtain",
    title: "Begin where you are.",
    subtitle: "Let today meet you halfway.",
    titleBox: { x: 72, y: 324, w: 680, h: 72 },
    subtitleBox: { x: 72, y: 408, w: 650, h: 40 },
    titleColor: "#123A68",
    subtitleColor: "#123A68",
  },
] as const;

const topTabs = [
  { icon: "1.png", label: "For busy days", w: 120, h: 112 },
  { icon: "2.png", label: "For clearer mornings", w: 185, h: 112 },
  { icon: "3.png", label: "For what is ahead", w: 150, h: 112 },
  { icon: "4.png", label: "Made to stay nearby", w: 174, h: 112 },
] as const;

const cardSlides = [
  { image: "card_02_01@3x.png.png", copy: "Too much on your mind?" },
  { image: "card_02_02@3x.png.png", copy: "Need a little direction?" },
  { image: "card_02_03@3x.png.png", copy: "Feeling stuck?" },
  { image: "card_02_04@3x.png.png", copy: "Low on energy?" },
  { image: "card_02_05@3x.png.png", copy: "Not sure what you need?" },
  { image: "card_02_06@3x.png.png", copy: "Ready for a small shift?" },
] as const;

const guidanceSlides = [
  {
    image: "lena_slide_01.png",
    title: "Meet Lena",
    subtitle: "A guide for slower hours.",
    titleBox: { x: 99, y: 65, w: 348, h: 59 },
    subtitleBox: { x: 99, y: 146, w: 302, h: 32 },
  },
  {
    image: "lena_slide_02.png",
    title: "Learn the Form",
    subtitle: "Rituals help attention settle.",
    titleBox: { x: 118, y: 52, w: 333, h: 66 },
    subtitleBox: { x: 118, y: 124, w: 420, h: 36 },
  },
  {
    image: "lena_slide_03.png",
    title: "Make by Hand",
    subtitle: "Your hands know the way.",
    titleBox: { x: 110, y: 63, w: 333, h: 56 },
    subtitleBox: { x: 110, y: 128, w: 249, h: 30 },
  },
  {
    image: "lena_slide_04.png",
    title: "Move Slowly",
    subtitle: "Balance is practiced.",
    titleBox: { x: 99, y: 63, w: 312, h: 74 },
    subtitleBox: { x: 99, y: 147, w: 231, h: 33 },
  },
  {
    image: "lena_slide_05.png",
    title: "Back to the Day",
    subtitle: "Return a little clearer.",
    titleBox: { x: 106, y: 79, w: 336, h: 59 },
    subtitleBox: { x: 106, y: 154, w: 249, h: 26 },
  },
] as const;

const shareCards = [
  { image: "3.5_slide_01.png", copy: "Others have felt this too." },
  { image: "3.5_slide_02.png", copy: "You are not the only one." },
  { image: "3.5_slide_03.png", copy: "Nothing here is strange." },
] as const;

const lifeSlides = [
  {
    image: "life-01.png",
    title: "Starting\nOver",
    subtitle: "Second chances\narrive quietly.",
    titleBox: { x: 377, y: 1638, w: 187, h: 100 },
    subtitleBox: { x: 377, y: 1768, w: 142, h: 50 },
  },
  {
    image: "life-02.png",
    title: "Looking for\nSomething",
    subtitle: "You are not lost.",
    titleBox: { x: 373, y: 1672, w: 239, h: 102 },
    subtitleBox: { x: 373, y: 1789, w: 129, h: 24 },
  },
  {
    image: "life-03.png",
    title: "A Little\nMore Air",
    subtitle: "Breathe before deciding.",
    titleBox: { x: 375, y: 1651, w: 222, h: 96 },
    subtitleBox: { x: 375, y: 1788, w: 222, h: 30 },
  },
  {
    image: "life-04.png",
    title: "Letting Go",
    subtitle: "Some things leave\nso you can move.",
    titleBox: { x: 334, y: 1704, w: 204, h: 45 },
    subtitleBox: { x: 334, y: 1769, w: 148, h: 46 },
  },
  {
    image: "life-05.png",
    title: "Found\nAlong\nthe Way",
    subtitle: "The right people\narrive in time.",
    titleBox: { x: 371, y: 1646, w: 183, h: 158 },
    subtitleBox: { x: 371, y: 1815, w: 163, h: 59 },
  },
  {
    image: "life-06.png",
    title: "Between\nBreaths",
    subtitle: "Pause. You do not\nneed all the answers.",
    titleBox: { x: 388, y: 1584, w: 188, h: 92 },
    subtitleBox: { x: 388, y: 1798, w: 168, h: 45 },
  },
] as const;

const quietCards = [
  {
    image: "quiet-card-01.png",
    title: "Ceramic Cup",
    subtitle: "A warm start.",
  },
  {
    image: "quiet-card-02.png",
    title: "Glass Vase",
    subtitle: "Something simple nearby.",
  },
  {
    image: "quiet-card-03.png",
    title: "Candle",
    subtitle: "Light for slower hours.",
  },
  {
    image: "quiet-card-04.png",
    title: "Linen Cloth",
    subtitle: "Softness you can touch.",
  },
] as const;

const needPaths = [
  { kind: "calm", label: "Need Calm", icon: "need-calm.png" },
  { kind: "clarity", label: "Need Clarity", icon: "need-clarity.png" },
  { kind: "release", label: "Need Release", icon: "need-release.png" },
  { kind: "protection", label: "Need Protection", icon: "need-protection.png" },
  { kind: "direction", label: "Need Direction", icon: "need-direction.png" },
] as const;

const windkeepCards = [
  {
    title: "Swap Objects",
    lines: ["Give one.", "Receive one."],
  },
  {
    title: "Time Auction",
    lines: ["Bid on objects", "with history."],
  },
  {
    title: "MEMORY SKY",
    lines: ["Keep a day", "as a sky."],
  },
] as const;

const slowLivingCards = [
  {
    title: "TEA & PAUSE",
    subtitle: "Slow down first.",
  },
  {
    title: "PAGE & MIND",
    subtitle: "Let thoughts loosen.",
  },
  {
    title: "LIGHT & REST",
    subtitle: "Rest is a choice.",
  },
] as const;

const ordinaryLifeCards = [
  {
    title: "Morning Unfolded",
    subtitle: "A quiet start changes the day.",
  },
  {
    title: "A Few Good Lines",
    subtitle: "Some pages say enough.",
  },
  {
    title: "Shared Moments",
    subtitle: "Peace is easier together.",
  },
] as const;

const footerNavItems = [
  { kind: "about", label: "About", href: "/about" },
  { kind: "objects", label: "Objects", href: "/objects" },
  { kind: "healing", label: "Healing", href: "/healing" },
  { kind: "windkeep", label: "Windkeep", href: "/windkeep" },
  { kind: "support", label: "Support", href: "/contact" },
] as const;

function FooterGlyph({ kind }: { kind: (typeof footerNavItems)[number]["kind"] }) {
  if (kind === "about") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10c8 8 14 17 14 28 0 10-6 17-14 17s-14-7-14-17c0-11 6-20 14-28Z" />
        <path d="M32 24v28M23 36h18" />
      </svg>
    );
  }

  if (kind === "objects") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 20h32v30H16z" />
        <path d="M21 20c2-7 20-7 22 0M24 31h16M24 40h16" />
      </svg>
    );
  }

  if (kind === "healing") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 11v42M17 32h30" />
        <path d="M21 18c8 3 15 8 11 18-10-1-15-8-11-18ZM43 18c-8 3-15 8-11 18 10-1 15-8 11-18Z" />
      </svg>
    );
  }

  if (kind === "windkeep") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M13 34h27c7 0 10-8 5-12-4-3-9-1-10 3" />
        <path d="M17 44h31c6 0 9 7 5 11-3 3-8 2-11-1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 12a13 13 0 0 1 13 13c0 11-13 27-13 27S19 36 19 25a13 13 0 0 1 13-13Z" />
      <path d="M32 20v13M32 42v2" />
    </svg>
  );
}

function nextIndex(current: number, total: number) {
  return (current + 1) % total;
}

function previousIndex(current: number, total: number) {
  return (current + total - 1) % total;
}

function pxVars(box: { x: number; y: number; w: number; h: number }) {
  return {
    "--x": `${box.x / 11.7}vw`,
    "--y": `${box.y / 11.7}vw`,
    "--w": `${box.w / 11.7}vw`,
    "--h": `${box.h / 11.7}vw`,
  } as CSSProperties;
}

export function HomepageBrowserRoom() {
  const [activeHero, setActiveHero] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [activeGuidance, setActiveGuidance] = useState(0);
  const [activeLife, setActiveLife] = useState(0);
  const heroTouchStartX = useRef<number | null>(null);
  const cardTouchStartX = useRef<number | null>(null);
  const guidanceTouchStartX = useRef<number | null>(null);
  const lifeTouchStartX = useRef<number | null>(null);
  const heroMouseStartX = useRef<number | null>(null);
  const cardMouseStartX = useRef<number | null>(null);
  const guidanceMouseStartX = useRef<number | null>(null);
  const lifeMouseStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => nextIndex(current, heroSlides.length));
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function settleSwipe(startX: number | null, endX: number, onNext: () => void, onPrevious: () => void) {
    if (startX === null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 28) return;
    if (delta < 0) onNext();
    else onPrevious();
  }

  const visibleCards = [activeCard, nextIndex(activeCard, cardSlides.length)];
  const previousLife = previousIndex(activeLife, lifeSlides.length);
  const nextLife = nextIndex(activeLife, lifeSlides.length);

  return (
    <main className="ri-final-home min-h-full text-[#14213a]">
      <section className="hidden md:block">
        <div className="sr-only">
          <p>VIVLUM</p>
          <h1>A browser room for wind, time, air, and presence.</h1>
        </div>

      </section>

      <section className={`${styles.mobileTaskSurface} md:hidden`} aria-label="VIVLUM mobile homepage">
        <div className={styles.mobileV2FirstScreen}>
          <Image
            src={`${S01}/backgrounds/screen-bg.png`}
            alt=""
            fill
            className={styles.mobileV2FirstScreenBg}
            sizes="100vw"
            priority
            aria-hidden="true"
            unoptimized
          />

          <section
            className={styles.mobileV2Hero}
            aria-label="VIVLUM first screen hero carousel"
            onTouchStart={(event) => {
              heroTouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              settleSwipe(
                heroTouchStartX.current,
                event.changedTouches[0]?.clientX ?? 0,
                () => setActiveHero((current) => nextIndex(current, heroSlides.length)),
                () => setActiveHero((current) => previousIndex(current, heroSlides.length)),
              );
              heroTouchStartX.current = null;
            }}
            onMouseDown={(event) => {
              heroMouseStartX.current = event.clientX;
            }}
            onMouseUp={(event) => {
              settleSwipe(
                heroMouseStartX.current,
                event.clientX,
                () => setActiveHero((current) => nextIndex(current, heroSlides.length)),
                () => setActiveHero((current) => previousIndex(current, heroSlides.length)),
              );
              heroMouseStartX.current = null;
            }}
          >
            {heroSlides.map((slide, index) => (
              <article
                key={slide.image}
                className={`${styles.mobileV2HeroSlide} ${styles[`mobileV2HeroMotion${slide.motion}`]} ${index === activeHero ? styles.mobileV2HeroSlideActive : ""}`}
                aria-hidden={index !== activeHero}
              >
                <Image
                  src={`${S01}/hero/${slide.image}`}
                  alt=""
                  width={1170}
                  height={1589}
                  className={styles.mobileV2HeroImage}
                  sizes="100vw"
                  priority={index === 0}
                  aria-hidden="true"
                  unoptimized
                />
                <span className={styles.mobileV2HeroMotionLayer} aria-hidden="true" />
                <span className={styles.mobileV2HeroMicroA} aria-hidden="true" />
                <span className={styles.mobileV2HeroMicroB} aria-hidden="true" />
                <span className={styles.mobileV2HeroMicroC} aria-hidden="true" />
                <div
                  className={styles.mobileV2HeroTitle}
                  style={{ ...pxVars(slide.titleBox), "--hero-text-color": slide.titleColor } as CSSProperties}
                >
                  {slide.title}
                </div>
                <p
                  className={styles.mobileV2HeroSubtitle}
                  style={{ ...pxVars(slide.subtitleBox), "--hero-text-color": slide.subtitleColor } as CSSProperties}
                >
                  {slide.subtitle}
                </p>
              </article>
            ))}
          </section>

          <nav className={styles.mobileV2TopNav} aria-label="VIVLUM top navigation">
            <Link href="/" className={styles.mobileV2Logo} aria-label="VIVLUM home">
              <Image
                src={`${S01}/chrome/logo.png`}
                alt="VIVLUM"
                width={309}
                height={183}
                className={styles.mobileV2LogoImage}
                priority
                unoptimized
              />
            </Link>
            <div className={styles.mobileV2NavIcons} aria-label="VIVLUM quick actions">
              <button className={`${styles.mobileV2IconButton} ${styles.mobileV2IconSearch}`} type="button" aria-label="Search" />
              <button className={`${styles.mobileV2IconButton} ${styles.mobileV2IconBag}`} type="button" aria-label="Cart">
                <span>0</span>
              </button>
              <button className={`${styles.mobileV2IconButton} ${styles.mobileV2IconUser}`} type="button" aria-label="Account" />
              <button className={`${styles.mobileV2IconButton} ${styles.mobileV2IconMenu}`} type="button" aria-label="Menu" />
            </div>
          </nav>

          <div className={styles.mobileV2HeroDots} aria-label="Hero slides">
            {[0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                type="button"
                className={dot === activeHero ? styles.mobileV2HeroDotActive : styles.mobileV2HeroDot}
                aria-label={`Hero dot ${dot + 1}`}
                aria-current={dot === activeHero ? "true" : undefined}
                onClick={() => setActiveHero(dot % heroSlides.length)}
              />
            ))}
          </div>

          <nav className={styles.mobileV2Tabs} aria-label="VIVLUM first screen paths">
            {topTabs.map((tab) => (
              <button key={tab.label} className={styles.mobileV2Tab} type="button">
                <Image
                  src={`${S01}/tabs/${tab.icon}`}
                  alt=""
                  width={tab.w}
                  height={tab.h}
                  className={styles.mobileV2TabIcon}
                  aria-hidden="true"
                  unoptimized
                />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <Image
            src={`${S01}/backgrounds/first-divider.png`}
            alt=""
            width={1170}
            height={158}
            className={styles.mobileV2FirstDivider}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section
            className={styles.mobileV2CardLayer}
            aria-label="VIVLUM second layer cards"
            onTouchStart={(event) => {
              cardTouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              settleSwipe(
                cardTouchStartX.current,
                event.changedTouches[0]?.clientX ?? 0,
                () => setActiveCard((current) => nextIndex(current, cardSlides.length)),
                () => setActiveCard((current) => previousIndex(current, cardSlides.length)),
              );
              cardTouchStartX.current = null;
            }}
            onMouseDown={(event) => {
              cardMouseStartX.current = event.clientX;
            }}
            onMouseUp={(event) => {
              settleSwipe(
                cardMouseStartX.current,
                event.clientX,
                () => setActiveCard((current) => nextIndex(current, cardSlides.length)),
                () => setActiveCard((current) => previousIndex(current, cardSlides.length)),
              );
              cardMouseStartX.current = null;
            }}
          >
            <button
              type="button"
              className={`${styles.mobileV2CardArrow} ${styles.mobileV2CardArrowLeft}`}
              aria-label="Previous card"
              onClick={() => setActiveCard((current) => previousIndex(current, cardSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
            <div className={styles.mobileV2CardPair}>
              {visibleCards.map((cardIndex) => {
                const card = cardSlides[cardIndex];
                return (
                  <article key={card.image} className={styles.mobileV2Card}>
                    <Image
                      src={`${S01}/cards/${card.image}`}
                      alt=""
                      width={513}
                      height={491}
                      className={styles.mobileV2CardImage}
                      sizes="46vw"
                      unoptimized
                    />
                    <div className={styles.mobileV2CardCopy}>
                      <p>{card.copy}</p>
                      <span aria-hidden="true" />
                    </div>
                  </article>
                );
              })}
            </div>
            <button
              type="button"
              className={`${styles.mobileV2CardArrow} ${styles.mobileV2CardArrowRight}`}
              aria-label="Next card"
              onClick={() => setActiveCard((current) => nextIndex(current, cardSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
            <div className={styles.mobileV2CardDots} aria-label="Second layer card slides">
              {cardSlides.map((card, index) => (
                <button
                  key={card.image}
                  type="button"
                  className={index === activeCard ? styles.mobileV2CardDotActive : styles.mobileV2CardDot}
                  aria-label={`Show ${card.copy}`}
                  aria-current={index === activeCard ? "true" : undefined}
                  onClick={() => setActiveCard(index)}
                />
              ))}
            </div>
          </section>

          <Image
            src={`${S01}/backgrounds/first-buffer.png`}
            alt=""
            width={1170}
            height={170}
            className={styles.mobileV2Buffer}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
        </div>

        <div className={styles.mobileV2SecondScreen}>
          <Image
            src={`${S02}/backgrounds/screen-bg.png`}
            alt=""
            fill
            className={styles.mobileV2SecondBg}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section
            className={styles.mobileV2Guidance}
            aria-label="Meet Lena guidance"
            onTouchStart={(event) => {
              guidanceTouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              settleSwipe(
                guidanceTouchStartX.current,
                event.changedTouches[0]?.clientX ?? 0,
                () => setActiveGuidance((current) => nextIndex(current, guidanceSlides.length)),
                () => setActiveGuidance((current) => previousIndex(current, guidanceSlides.length)),
              );
              guidanceTouchStartX.current = null;
            }}
            onMouseDown={(event) => {
              guidanceMouseStartX.current = event.clientX;
            }}
            onMouseUp={(event) => {
              settleSwipe(
                guidanceMouseStartX.current,
                event.clientX,
                () => setActiveGuidance((current) => nextIndex(current, guidanceSlides.length)),
                () => setActiveGuidance((current) => previousIndex(current, guidanceSlides.length)),
              );
              guidanceMouseStartX.current = null;
            }}
          >
            {guidanceSlides.map((slide, index) => (
              <article
                key={slide.image}
                className={`${styles.mobileV2GuidanceSlide} ${index === activeGuidance ? styles.mobileV2GuidanceSlideActive : ""}`}
                aria-hidden={index !== activeGuidance}
              >
                <Image
                  src={`${S02}/guidance/${slide.image}`}
                  alt=""
                  width={1061}
                  height={687}
                  className={styles.mobileV2GuidanceImage}
                  sizes="91vw"
                  unoptimized
                />
                <span className={styles.mobileV2GuidanceMicroA} aria-hidden="true" />
                <span className={styles.mobileV2GuidanceMicroB} aria-hidden="true" />
                <h2 className={styles.mobileV2GuidanceTitle} style={pxVars(slide.titleBox)}>
                  {slide.title}
                </h2>
                <p className={styles.mobileV2GuidanceSubtitle} style={pxVars(slide.subtitleBox)}>
                  {slide.subtitle}
                </p>
              </article>
            ))}
            <button
              type="button"
              className={`${styles.mobileV2GuidanceArrow} ${styles.mobileV2GuidanceArrowLeft}`}
              aria-label="Previous Lena slide"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                setActiveGuidance((current) => previousIndex(current, guidanceSlides.length));
              }}
            >
              <span aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.mobileV2GuidanceArrow} ${styles.mobileV2GuidanceArrowRight}`}
              aria-label="Next Lena slide"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                setActiveGuidance((current) => nextIndex(current, guidanceSlides.length));
              }}
            >
              <span aria-hidden="true" />
            </button>
          </section>

          <Image
            src={`${S02}/backgrounds/transition-03-04.png`}
            alt=""
            width={1170}
            height={140}
            className={styles.mobileV2SecondTransition}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <div className={styles.mobileV2ShareDots} aria-hidden="true">
            <span className={styles.mobileV2ShareDotActive} />
            <span className={styles.mobileV2ShareDot} />
            <span className={styles.mobileV2ShareDot} />
          </div>

          <section className={styles.mobileV2ShareBuffer} aria-label="Shared gentle reminders">
            {shareCards.map((card) => (
              <article key={card.image} className={styles.mobileV2ShareCard}>
                <Image
                  src={`${S02}/share-buffer/${card.image}`}
                  alt=""
                  width={1101}
                  height={1429}
                  className={styles.mobileV2ShareImage}
                  sizes="29vw"
                  unoptimized
                />
                <p>{card.copy}</p>
              </article>
            ))}
          </section>

          <section
            className={styles.mobileV2LifeStage}
            aria-label="Life stages carousel"
            onTouchStart={(event) => {
              lifeTouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              settleSwipe(
                lifeTouchStartX.current,
                event.changedTouches[0]?.clientX ?? 0,
                () => setActiveLife((current) => nextIndex(current, lifeSlides.length)),
                () => setActiveLife((current) => previousIndex(current, lifeSlides.length)),
              );
              lifeTouchStartX.current = null;
            }}
            onMouseDown={(event) => {
              lifeMouseStartX.current = event.clientX;
            }}
            onMouseUp={(event) => {
              settleSwipe(
                lifeMouseStartX.current,
                event.clientX,
                () => setActiveLife((current) => nextIndex(current, lifeSlides.length)),
                () => setActiveLife((current) => previousIndex(current, lifeSlides.length)),
              );
              lifeMouseStartX.current = null;
            }}
          >
            <button
              type="button"
              className={`${styles.mobileV2LifeArrow} ${styles.mobileV2LifeArrowLeft}`}
              aria-label="Previous life stage"
              onClick={() => setActiveLife((current) => previousIndex(current, lifeSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
            <Image
              src={`${S02}/life-stages/${lifeSlides[previousLife].image}`}
              alt=""
              width={1106}
              height={1422}
              className={`${styles.mobileV2LifeImage} ${styles.mobileV2LifeSideLeft}`}
              sizes="22vw"
              unoptimized
            />
            <article className={styles.mobileV2LifeCenter}>
              <Image
                src={`${S02}/life-stages/${lifeSlides[activeLife].image}`}
                alt=""
                width={1106}
                height={1422}
                className={styles.mobileV2LifeImage}
                sizes="43vw"
                unoptimized
              />
              <h2 className={styles.mobileV2LifeTitle} style={pxVars(lifeSlides[activeLife].titleBox)}>
                {lifeSlides[activeLife].title}
              </h2>
              <p className={styles.mobileV2LifeSubtitle} style={pxVars(lifeSlides[activeLife].subtitleBox)}>
                {lifeSlides[activeLife].subtitle}
              </p>
            </article>
            <Image
              src={`${S02}/life-stages/${lifeSlides[nextLife].image}`}
              alt=""
              width={1106}
              height={1422}
              className={`${styles.mobileV2LifeImage} ${styles.mobileV2LifeSideRight}`}
              sizes="22vw"
              unoptimized
            />
            <button
              type="button"
              className={`${styles.mobileV2LifeArrow} ${styles.mobileV2LifeArrowRight}`}
              aria-label="Next life stage"
              onClick={() => setActiveLife((current) => nextIndex(current, lifeSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
          </section>

          <Image
            src={`${S02}/backgrounds/bottom-buffer.png`}
            alt=""
            width={1170}
            height={307}
            className={styles.mobileV2SecondBuffer}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileV2SecondBufferControls} aria-label="Life stages buffer controls">
            <button
              type="button"
              className={`${styles.mobileV2SecondBufferArrow} ${styles.mobileV2SecondBufferArrowLeft}`}
              aria-label="Previous buffer slide"
              onClick={() => setActiveLife((current) => previousIndex(current, lifeSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
            <div className={styles.mobileV2SecondBufferDots} aria-label="Buffer slides">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  className={dot === activeLife % 3 ? styles.mobileV2SecondBufferDotActive : styles.mobileV2SecondBufferDot}
                  aria-label={`Show buffer slide ${dot + 1}`}
                  aria-current={dot === activeLife % 3 ? "true" : undefined}
                  onClick={() => setActiveLife(dot)}
                />
              ))}
            </div>
            <button
              type="button"
              className={`${styles.mobileV2SecondBufferArrow} ${styles.mobileV2SecondBufferArrowRight}`}
              aria-label="Next buffer slide"
              onClick={() => setActiveLife((current) => nextIndex(current, lifeSlides.length))}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.mobileV2ThirdScreen}>
          <section className={styles.mobileV2VeluneLayer} aria-label="VELUNE product layer">
            <Image
              src={`${S03}/backgrounds/velune-bg.png`}
              alt=""
              width={1293}
              height={1217}
              className={styles.mobileV2VeluneBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2VeluneCopy}>
              <i aria-hidden="true" />
              <h2>VELUNE</h2>
              <span aria-hidden="true" />
              <p>For days when your body feels too loud.</p>
              <em>Not fixing. Just easing.</em>
            </div>
          </section>

          <Image
            src={`${S03}/backgrounds/third-divider.png`}
            alt=""
            width={1170}
            height={132}
            className={styles.mobileV2ThirdDivider}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section className={styles.mobileV2ThingsLayer} aria-label="Things that stayed">
            <Image
              src={`${S03}/backgrounds/things-bg.png`}
              alt=""
              width={1300}
              height={1209}
              className={styles.mobileV2ThingsBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2ThingsCopy}>
              <h2>Some Things<br />Stay With You</h2>
              <p>Not rare. Just yours.</p>
            </div>
            <div className={styles.mobileV2ThingsCardText} aria-hidden="true">
              <span><b>Close to You</b></span>
              <span><b>For Everyday</b></span>
              <span><b>Carry Meaning</b></span>
            </div>
          </section>

          <Image
            src={`${S03}/backgrounds/third-buffer.png`}
            alt=""
            width={1170}
            height={212}
            className={styles.mobileV2ThirdBuffer}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
        </div>

        <div className={styles.mobileV2FourthScreen}>
          <section className={styles.mobileV2QuietLayer} aria-label="Quiet moments">
            <Image
              src={`${S04}/backgrounds/quiet-bg.png`}
              alt=""
              width={1209}
              height={1301}
              className={styles.mobileV2QuietBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2QuietCopy}>
              <h2>Quiet<br />Moments</h2>
              <span aria-hidden="true" />
              <p>Little things that bring you back.</p>
            </div>
            <button className={styles.mobileV2QuietCta} type="button" aria-label="Explore quiet moments">
              <span aria-hidden="true" />
            </button>
            <div className={styles.mobileV2QuietCards}>
              {quietCards.map((card) => (
                <article key={card.image} className={styles.mobileV2QuietCard}>
                  <Image
                    src={`${S04}/quiet-cards/${card.image}`}
                    alt=""
                    width={1296}
                    height={1213}
                    className={styles.mobileV2QuietCardImage}
                    sizes="21vw"
                    aria-hidden="true"
                    unoptimized
                  />
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                  <span aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className={styles.mobileV2NeedsLayer} aria-label="What do you need today">
            <Image
              src={`${S04}/backgrounds/needs-bg.png`}
              alt=""
              width={1293}
              height={1217}
              className={styles.mobileV2NeedsBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2NeedsCopy}>
              <h2>What Do<br />You Need Today</h2>
              <div className={styles.mobileV2NeedsSupport}>
                <p>Choose one small path.</p>
                <p>Explore Yourself in 45 Ways<br />Tests. Signs. Reflections.</p>
              </div>
              <button type="button">
                Begin Gently
                <span aria-hidden="true" />
              </button>
            </div>
            <div className={styles.mobileV2NeedIcons}>
              {needPaths.map((path) => (
                <button
                  key={path.label}
                  type="button"
                  className={`${styles.mobileV2NeedIcon} ${styles[`mobileV2NeedIcon${path.kind[0].toUpperCase()}${path.kind.slice(1)}`]}`}
                  aria-label={path.label}
                >
                  <span className={styles.mobileV2NeedCircle}>
                    <Image
                      src={`${S04}/need-icons/${path.icon}`}
                      alt=""
                      width={220}
                      height={220}
                      className={styles.mobileV2NeedIconImage}
                      aria-hidden="true"
                      unoptimized
                    />
                  </span>
                  <span className={styles.mobileV2NeedLabel}>{path.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Image
            src={`${S04}/backgrounds/bottom-buffer.png`}
            alt=""
            width={1170}
            height={178}
            className={styles.mobileV2FourthBuffer}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
        </div>

        <div className={styles.mobileV2FifthScreen}>
          <Image
            src={`${S05}/backgrounds/screen-bg.png`}
            alt=""
            fill
            className={styles.mobileV2FifthBg}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section className={styles.mobileV2WindkeepLayer} aria-label="Windkeep exchange layer">
            <Image
              src={`${S05}/backgrounds/windkeep-bg-1170.png`}
              alt=""
              width={1170}
              height={1358}
              className={styles.mobileV2WindkeepBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2WindkeepCopy}>
              <h2>WINDKEEP</h2>
              <span aria-hidden="true" />
              <div className={styles.mobileV2WindkeepSupport}>
                <p>Exchange. Auction. Memory Sky.</p>
                <p>Things carry stories.</p>
                <p>Here, they move again.</p>
              </div>
            </div>
            <div className={styles.mobileV2WindkeepCards}>
              {windkeepCards.map((card) => (
                <article key={card.title} className={styles.mobileV2WindkeepCardText}>
                  <h3>{card.title}</h3>
                  <span aria-hidden="true" />
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </article>
              ))}
            </div>
            <div className={styles.mobileV2WindkeepFooterMarks} aria-hidden="true">
              <span>
                <FooterGlyph kind="about" />
                <b>About Time</b>
                <small>Objects hold calm.</small>
              </span>
              <span>
                <FooterGlyph kind="objects" />
                <b>About Gifts</b>
                <small>Every gift carries a story.</small>
              </span>
              <span>
                <FooterGlyph kind="support" />
                <b>About Memories</b>
                <small>Memories return through things.</small>
              </span>
              <span>
                <FooterGlyph kind="healing" />
                <b>About Keeping</b>
                <small>Some things stay by moving on.</small>
              </span>
            </div>
          </section>

          <Image
            src={`${S05}/backgrounds/top-band.png`}
            alt=""
            width={1170}
            height={83}
            className={styles.mobileV2WindkeepToSlowBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section className={styles.mobileV2SlowLivingLayer} aria-label="Slow Living">
            <Image
              src={`${S05}/backgrounds/slow-living-bg.png`}
              alt=""
              width={1392}
              height={1130}
              className={styles.mobileV2SlowLivingBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2SlowLivingCopy}>
              <h2>Slow Living</h2>
              <span aria-hidden="true" />
              <p>Less rush. More room.</p>
              <button type="button">
                Stay Awhile
                <span aria-hidden="true" />
              </button>
            </div>
            <div className={styles.mobileV2SlowLivingCards}>
              {slowLivingCards.map((card) => (
                <article key={card.title} className={styles.mobileV2SlowLivingCardCopy}>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </article>
              ))}
            </div>
          </section>

          <Image
            src={`${S05}/backgrounds/bottom-buffer.png`}
            alt=""
            width={1170}
            height={138}
            className={styles.mobileV2FifthBuffer}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
        </div>

        <div className={styles.mobileV2SixthScreen}>
          <Image
            src={`${S06}/backgrounds/screen-bg.png`}
            alt=""
            fill
            className={styles.mobileV2SixthBg}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />

          <section className={styles.mobileV2OrdinaryLayer} aria-label="Ordinary Life">
            <Image
              src={`${S06}/backgrounds/ordinary-life-bg.png`}
              alt=""
              width={1181}
              height={1331}
              className={styles.mobileV2OrdinaryBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2OrdinaryCopy}>
              <span aria-hidden="true" />
              <h2>Let the ordinary be enough.</h2>
              <i aria-hidden="true" />
              <p>Small moments.<br />A more peaceful you.</p>
            </div>
            <div className={styles.mobileV2OrdinaryCards}>
              {ordinaryLifeCards.map((card) => (
                <article key={card.title} className={styles.mobileV2OrdinaryCardCopy}>
                  <i aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </article>
              ))}
            </div>
            <p className={styles.mobileV2OrdinarySummary}>
              <span aria-hidden="true" />
              Real life is where it lands.
              <span aria-hidden="true" />
            </p>
          </section>

          <section className={styles.mobileV2ObjectTraceLayer} aria-label="Object trace buffer">
            <Image
              src={`${S06}/backgrounds/object-trace-buffer-bg.png`}
              alt=""
              width={2169}
              height={725}
              className={styles.mobileV2ObjectTraceBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2ObjectTraceCopy}>
              <span aria-hidden="true" />
              <p>Objects drift. Quiet traces remain.</p>
            </div>
          </section>

          <footer className={styles.mobileV2FooterLayer} aria-label="VIVLUM footer">
            <Image
              src={`${S06}/backgrounds/footer-bg.png`}
              alt=""
              width={1501}
              height={1048}
              className={styles.mobileV2FooterBg}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileV2FooterCopy}>
              <span aria-hidden="true" />
              <h2>
                Still near
                <br />
                the wind.
              </h2>
              <i aria-hidden="true" />
              <p>
                Wherever you are,
                <br />
                breathe gently.
              </p>
            </div>
            <nav className={styles.mobileV2FooterNav} aria-label="VIVLUM footer navigation">
              {footerNavItems.map((item) => (
                <Link key={item.label} href={item.href} className={styles.mobileV2FooterNavItem}>
                  <FooterGlyph kind={item.kind} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className={styles.mobileV2FooterBrand}>
              <p>VIVLUM</p>
              <span aria-hidden="true" />
            </div>
            <p className={styles.mobileV2FooterCopyright}>© 2025 VIVLUM Studio. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
