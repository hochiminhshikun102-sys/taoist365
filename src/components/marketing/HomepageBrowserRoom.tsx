"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomepageBrowserRoom.module.css";

const A = "/brand/production/homepage/final-air";
const S01_20260611 = "/brand/production/homepage/s01-hero-20260611";
const S02 = "/brand/production/homepage/s02-vivlum";
const S03 = "/brand/production/homepage/s03-vivlum";
const S04 = "/brand/production/homepage/s04-state-cards";

const quietEntries = [
  ["Wind & Bells", "wind-bell.webp", "/objects"],
  ["Ambient Light", "candle.webp", "/objects"],
  ["Scent & Care", "scent-care.webp", "/objects"],
  ["Jewelry", "swan-crystal.webp", "/objects"],
  ["Textiles", "textile-chair.webp", "/objects"],
  ["Vases & Flowers", "vase-flower.webp", "/objects"],
] as const;

const lifeStages = [
  ["Morning", "Begin with light.", "textile-chair.webp"],
  ["Working", "Stay focused, stay soft.", "coffee-cup.webp"],
  ["Resting", "Pause. You deserve it.", "linen-candle.webp"],
  ["Becoming", "Grow in your own way.", "vase-flower.webp"],
  ["Remembering", "Honor what stays.", "embroidered-frame.webp"],
] as const;

const quietObjects = [
  ["Gramophone of Slow Time", "gramophone.webp"],
  ["Ivory Flower Vessel", "vase-flower.webp"],
  ["Embroidered Memory Frame", "embroidered-frame.webp"],
  ["Matsutake Candle", "candle.webp"],
  ["Linen Hanging Chair", "textile-chair.webp"],
  ["Tea Light Care Set", "scent-care.webp"],
] as const;

const windkeepObjects = [
  ["Dried Flower Basket", "vase-flower.webp"],
  ["Small Passing Bell", "wind-bell.webp"],
  ["Amber Care Bottles", "scent-care.webp"],
  ["Pillow After Morning", "linen-candle.webp"],
  ["Flowers Near Light", "vase-flower.webp"],
] as const;

const guidance = [
  ["Carefully Made", "Thoughtful materials and timeless quality."],
  ["Beautiful Packaging", "Every order is wrapped with care."],
  ["Worldwide Shipping", "Delivering beauty to your door."],
  ["A Life With Air", "Thank you for supporting slow living."],
] as const;

const mobileHeroTabs = [
  ["leaf", "For quiet days"],
  ["lotus", "For clearer mornings"],
  ["triangle", "For what is ahead"],
  ["heart", "Made to stay nearby"],
  ["wind", "For gentle moments"],
] as const;

const mobileHeroSlides20260611 = [
  {
    image: "hero-01-bg.webp",
    title: ["The rain arrived", "before you did."],
    subtitle: ["There is nowhere", "else to be."],
    left: 194,
    top: 444,
    width: 626,
    titleSize: 64,
    subtitleSize: 32,
    ruleGap: 42,
    subtitleGap: 45,
  },
  {
    image: "hero-02-bg.webp",
    title: ["Something new", "is already unfolding."],
    subtitle: ["You do not need", "to chase it."],
    left: 273,
    top: 380,
    width: 832,
    titleSize: 94,
    subtitleSize: 42,
    ruleGap: 60,
    subtitleGap: 42,
  },
  {
    image: "hero-03-bg.webp",
    title: ["Something new", "is already unfolding."],
    subtitle: ["You do not need", "to chase it."],
    left: 273,
    top: 365,
    width: 783,
    titleSize: 94,
    subtitleSize: 42,
    ruleGap: 60,
    subtitleGap: 42,
  },
] as const;

/* S02 Morning 鍗＄墖鍖?*/
const mobileS02Cards = [
  {
    img: "card-01.png",
    copy: "The kettle is already warm.",
  },
  {
    img: "card-02.png",
    copy: "The day has not decided yet.",
  },
  {
    img: "card-03.png",
    copy: "A corner you may miss later.",
  },
] as const;

const mobileS03Slides = [
  { img: "slide-01.png", alt: "A Question Arrives" },
  { img: "slide-02.png", alt: "Learning The Form" },
  { img: "slide-03.png", alt: "Learning By Hand" },
  { img: "slide-04.png", alt: "Moving Slowly" },
  { img: "slide-05.png", alt: "Back To The Day" },
] as const;

const mobileS04Cards = [
  { img: "state-card-01.png", alt: "Starting Over" },
  { img: "state-card-02.png", alt: "Looking For Something" },
  { img: "state-card-03.png", alt: "A Little More Air" },
  { img: "state-card-04.png", alt: "Letting Go" },
  { img: "state-card-05.png", alt: "Found Along The Way" },
  { img: "state-card-06.png", alt: "Between Breaths" },
  { img: "state-card-07.png", alt: "Room For Whatever Comes" },
  { img: "state-card-08.png", alt: "Home Feels Like Enough" },
] as const;

const guidanceMobileWeather = [
  "Morning light is thin. Nothing asks for a decision yet.",
  "One quiet direction is enough for this screen.",
] as const;

/* S05 Velune 浜旇棣欐皼 鈥?PSD 鑹插彿 */
const veluneElements = [
  ["WOOD",  "Something New Begins", "#2D5A27"],
  ["FIRE",  "The Light Returns",    "#D8572A"],
  ["EARTH", "Back In Balance",      "#7D6B5D"],
  ["METAL", "Space To Think",       "#5A5A5A"],
  ["WATER", "Moving Again",         "#2A78B5"],
] as const;
const V = '/brand/production/homepage/velune-section';
const S06 = "/brand/production/homepage/s06-stay-with-you";
const S07 = "/brand/production/homepage/s07-quiet-moments";
const S08 = "/brand/production/homepage/s08-healing-paths";
const S09 = "/brand/production/homepage/s09-windkeep";
const S10 = "/brand/production/homepage/s10-live-intention";
const S11 = "/brand/production/homepage/s11-moments";
const S12 = "/brand/production/homepage/s12-still-wind";

const mobileS06Cards = [
  ["moon-sea-bracelet.png", "MOON SEA BRACELET", "Worn often.\nForgotten never."],
  ["breeze-window.png", "BREEZE & WINDOW", "The room remembers."],
  ["floral-horse-tee.png", "FLORAL HORSE TEE", "A gift from another year."],
  ["taiji-fu-tee.png", "TAIJI FU TEE", "Still hanging here."],
] as const;

const mobileS07Cards = [
  ["card-01.png", "Little Companions", "A soft reminder you're not alone."],
  ["card-02.png", "Scented Pause", "One breath can change the moment."],
  ["card-03.png", "A Page For You", "Thoughts become lighter on paper."],
  ["card-04.png", "Warmth, Anywhere", "Create a calm space, wherever you are."],
] as const;

const mobileS08Balloons = [
  { label: "Breathe", icon: "wind", tone: "warm", className: "mobileHealingBalloonBreathe" },
  { label: "Move", icon: "move", tone: "blue", className: "mobileHealingBalloonMove" },
  { label: "Reflect", icon: "leaf", tone: "coral", className: "mobileHealingBalloonReflect" },
  { label: "Create", icon: "pencil", tone: "blue", className: "mobileHealingBalloonCreate" },
  { label: "Rest", icon: "moon", tone: "blue", className: "mobileHealingBalloonRest" },
  { label: "Nourish", icon: "bowl", tone: "green", className: "mobileHealingBalloonNourish" },
  { label: "Gratitude", icon: "heart", tone: "coral", className: "mobileHealingBalloonGratitude" },
  { label: "Dream", icon: "cloud", tone: "green", className: "mobileHealingBalloonDream" },
] as const;

const mobileS09Services = [
  {
    title: "PASSING THINGS",
    subtitle: "Exchange Objects.",
    body: "Give one.\nReceive one.",
    image: "card-passing.png",
    tone: "blue",
    icon: "↔",
  },
  {
    title: "QUIET RECEIVING",
    subtitle: "Receive Something\nUnexpected.",
    body: "A gift may arrive quietly.",
    image: "card-receiving.png",
    tone: "green",
    icon: "□",
  },
  {
    title: "DATE SKY",
    subtitle: "The Sky From A Day.",
    body: "Keep the stars from\na moment that mattered.",
    image: "card-date-sky.png",
    tone: "gold",
    icon: "*",
  },
] as const;

const mobileS09Modules = [
  ["ABOUT TIME", "Time is the truest witness.\nWe honor every moment.", "clock"],
  ["ABOUT GIFTS", "Every gift carries\na piece of someone's heart.", "gift"],
  ["ABOUT MEMORIES", "Memories make life warmer\nand more meaningful.", "heart"],
  ["ABOUT KEEPING", "To keep is to cherish.\nTo cherish is to live gently.", "leaf"],
] as const;

const mobileS10Cards = [
  ["card-01.png", "Tea & Pause", "Slow down.", "Be here."],
  ["card-02.png", "Page & Mind", "Read gently.", "Let thoughts wander."],
  ["card-03.png", "Flowers & Light", "Beauty in small things.", "Every day."],
  ["card-04.png", "Soul & Rest", "Rest is not doing less.", "It's choosing well."],
] as const;

const mobileS12NavItems = [
  ["icon-01.png", "About", "/about"],
  ["icon-02.png", "Objects", "/objects"],
  ["icon-03.png", "Healing", "/healing"],
  ["icon-04.png", "Windkeep", "/windkeep"],
  ["icon-05.png", "Support", "/guidance"],
] as const;

const mobileS11Cards = [
  ["card-01.png", "Morning Unfolded", "A soft start", "makes a better day."],
  ["card-02.png", "Doors & Detours", "New paths begin", "in quiet ways."],
  ["card-03.png", "A Few Good Lines", "Not every question", "needs a reply."],
  ["card-04.png", "Shared Moments", "Presence is", "often enough."],
] as const;

const journal = [
  ["Let the Wind Carry What You No Longer Need", "May 12, 2024", "candle.webp"],
  ["A Linen Morning Beside the Window", "May 6, 2024", "textile-chair.webp"],
  ["The Beauty of Doing Nothing", "April 28, 2024", "vase-flower.webp"],
] as const;


function Drift() {
  return (
    <div className="browser-air-drift" aria-hidden>
      <span />
      <span />
    </div>
  );
}

function ProductImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={`${A}/${src}`}
      alt={alt}
      width={720}
      height={540}
      className={`sunlight-product h-full w-full object-cover ${className}`}
      sizes="(max-width: 768px) 50vw, 18vw"
    />
  );
}

export function HomepageBrowserRoom() {
  const [activeMobileHero, setActiveMobileHero] = useState(0);
  const [activeMobileS03, setActiveMobileS03] = useState(0);
  const [activeMobileS04, setActiveMobileS04] = useState(0);
  const mobileS04TouchStartX = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const previewHero = Number(new URLSearchParams(window.location.search).get("hero"));
    if (Number.isInteger(previewHero) && previewHero >= 1 && previewHero <= mobileHeroSlides20260611.length) {
      setActiveMobileHero(previewHero - 1);
    }
  }, []);

  function showPreviousS03() {
    setActiveMobileS03((current) => (current + mobileS03Slides.length - 1) % mobileS03Slides.length);
  }

  function showNextS03() {
    setActiveMobileS03((current) => (current + 1) % mobileS03Slides.length);
  }

  function showPreviousS04() {
    setActiveMobileS04((current) => (current + mobileS04Cards.length - 1) % mobileS04Cards.length);
  }

  function showNextS04() {
    setActiveMobileS04((current) => (current + 1) % mobileS04Cards.length);
  }

  function getMobileS04Offset(index: number) {
    const rawOffset = index - activeMobileS04;
    const half = Math.floor(mobileS04Cards.length / 2);
    if (rawOffset > half) return rawOffset - mobileS04Cards.length;
    if (rawOffset < -half) return rawOffset + mobileS04Cards.length;
    return rawOffset;
  }

  function handleMobileS04TouchEnd(clientX: number) {
    if (mobileS04TouchStartX.current === null) return;
    const deltaX = clientX - mobileS04TouchStartX.current;
    mobileS04TouchStartX.current = null;
    if (Math.abs(deltaX) < 24) return;
    if (deltaX < 0) {
      showNextS04();
    } else {
      showPreviousS04();
    }
  }

  return (
    <main className="ri-final-home min-h-full text-[#14213a]">
      {/* PC 绔?nav 鍗犱綅锛屾槑澶╅噸寤?*/}
      <nav className="hidden md:block" />

      {/* PC 绔?棣栫劍鍗犱綅锛屾槑澶╅噸寤?*/}
      <section className="hidden md:block">
        <div className="sr-only">
          <p>REVERENT INQUIRY</p>
          <h1>A browser room for wind, light, and quiet return.</h1>
        </div>
      </section>


      <section className={`${styles.mobileTaskSurface} md:hidden`} aria-label="Mobile homepage navigation and cards">
        {/* S01 Hero 20260611 - first slide only */}
        <div className={styles.mobileHero}>
          <div className={styles.mobileHeroNav}>
            <Link href="/" className={styles.mobileHeroLogo} aria-label="VIVLUM home">
              <Image
                src={`${S01_20260611}/logo.png`}
                alt="VIVLUM"
                width={366}
                height={266}
                className={styles.mobileHeroLogoImage}
                priority
                unoptimized
              />
            </Link>
            <div className={styles.mobileNavIconsRight}>
              <button className={`${styles.mobileHeroTopIcon} ${styles.mobileHeroTopIconSearch}`} aria-label="Search" type="button" />
              <button className={`${styles.mobileHeroTopIcon} ${styles.mobileHeroTopIconUser}`} aria-label="Account" type="button" />
              <button className={`${styles.mobileHeroTopIcon} ${styles.mobileHeroTopIconBag}`} aria-label="Cart" type="button">
                <span>0</span>
              </button>
              <button className={`${styles.mobileHeroTopIcon} ${styles.mobileHeroTopIconMenu}`} aria-label="Menu" type="button" />
            </div>
          </div>
          {mobileHeroSlides20260611.map((slide, index) => (
            <section
              key={slide.image}
              className={`${styles.mobileHeroSlide} ${index === activeMobileHero ? styles.mobileHeroSlideActive : ""}`}
              aria-hidden={index !== activeMobileHero}
              style={{
                "--hero-copy-left": `calc(${slide.left} * var(--s01-unit))`,
                "--hero-copy-top": `calc(${slide.top} * var(--s01-unit))`,
                "--hero-copy-width": `calc(${slide.width} * var(--s01-unit))`,
                "--hero-title-size": `calc(${slide.titleSize} * var(--s01-unit))`,
                "--hero-subtitle-size": `calc(${slide.subtitleSize} * var(--s01-unit))`,
                "--hero-rule-gap": `calc(${slide.ruleGap} * var(--s01-unit))`,
                "--hero-subtitle-gap": `calc(${slide.subtitleGap} * var(--s01-unit))`,
              } as CSSProperties}
            >
              {index === activeMobileHero ? (
                <Image
                  src={`${S01_20260611}/${slide.image}`}
                  alt=""
                  fill
                  className={styles.mobileHeroImage}
                  sizes="100vw"
                  priority={index === 0}
                  aria-hidden="true"
                  unoptimized
                />
              ) : null}
              <div className={styles.mobileHeroCopy}>
                <h1>
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </h1>
                <span aria-hidden="true" />
                <p>
                  {slide.subtitle[0]}
                  <br />
                  {slide.subtitle[1]}
                </p>
              </div>
            </section>
          ))}
          <div className={styles.mobileHeroDots}>
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                className={i === activeMobileHero ? styles.mobileHeroDotActive : styles.mobileHeroDot}
                aria-label={`Hero slide ${i + 1}`}
                aria-current={i === activeMobileHero ? "true" : undefined}
                onClick={() => {
                  if (i < mobileHeroSlides20260611.length) setActiveMobileHero(i);
                }}
              />
            ))}
          </div>
          <nav className={styles.mobileNavTabs} aria-label="Mobile quick navigation">
            {mobileHeroTabs.map(([icon, label]) => (
              <button key={label} type="button" className={styles.mobileNavTab}>
                <span className={styles.mobileHeroTabIcon} data-icon={icon} aria-hidden="true" />
                <span>{label}</span>
                <em aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
{/* 鈹€鈹€ S05 Velune 浜旇棣欐皼 鈹€鈹€ PSD 2251脳1196px 梅6=375脳199.33px */}

        {/* S02 VIVLUM three-card layer */}
        <section className={styles.mobileMorningCards} aria-label="VIVLUM quiet three-card layer">
          <Image
            src={`${S02}/top-band.png`}
            alt=""
            width={2255}
            height={222}
            className={styles.mobileMorningTopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileMorningCardStage}>
            {mobileS02Cards.map((card, i) => (
              <figure key={card.copy} className={styles.mobileMorningCard}>
                <Image
                  src={`${S02}/${card.img}`}
                  alt=""
                  width={658}
                  height={630}
                  className={styles.mobileMorningCardImg}
                  sizes="33vw"
                  priority={i === 0}
                  unoptimized
                />
                <figcaption className={styles.mobileMorningCaption}>
                  {card.copy}
                  <span aria-hidden="true" />
                </figcaption>
              </figure>
            ))}
          </div>
          <button type="button" className={`${styles.mobileMorningArrow} ${styles.mobileMorningArrowLeft}`} aria-label="Previous VIVLUM card">
            <span aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.mobileMorningArrow} ${styles.mobileMorningArrowRight}`} aria-label="Next VIVLUM card">
            <span aria-hidden="true" />
          </button>
        </section>

        <section className={styles.mobileS03Carousel} aria-label="VIVLUM learning carousel">
          <Image
            src={`${S03}/top-band.png`}
            alt=""
            width={2255}
            height={200}
            className={styles.mobileS03TopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileS03Viewport}>
            <div
              className={styles.mobileS03Track}
              style={{ transform: `translateX(calc(-${activeMobileS03} * var(--s03-step)))` }}
            >
              {mobileS03Slides.map((slide, i) => (
                <figure key={slide.img} className={styles.mobileS03Slide}>
                  <Image
                    src={`${S03}/${slide.img}`}
                    alt={slide.alt}
                    width={i === 0 || i === 4 ? 1684 : 1672}
                    height={i === 0 ? 934 : i === 4 ? 933 : 941}
                    className={styles.mobileS03SlideImg}
                    sizes="46vw"
                    priority={i === 0}
                    unoptimized
                  />
                </figure>
              ))}
            </div>
          </div>
          <button type="button" className={`${styles.mobileS03Arrow} ${styles.mobileS03ArrowLeft}`} onClick={showPreviousS03} aria-label="Previous VIVLUM learning card">
            <span aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.mobileS03Arrow} ${styles.mobileS03ArrowRight}`} onClick={showNextS03} aria-label="Next VIVLUM learning card">
            <span aria-hidden="true" />
          </button>
        </section>

        <section className={styles.mobileS04StateCards} aria-label="State Cards">
          <Image
            src={`${S04}/top-band.png`}
            alt=""
            width={2255}
            height={199}
            className={styles.mobileS04TopBand}
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className={styles.mobileS04Stage}
            onTouchStart={(event) => {
              mobileS04TouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              handleMobileS04TouchEnd(event.changedTouches[0]?.clientX ?? 0);
            }}
          >
            {mobileS04Cards.map((card, i) => (
              <button
                key={card.img}
                type="button"
                className={styles.mobileS04Card}
                data-offset={getMobileS04Offset(i)}
                onClick={() => setActiveMobileS04(i)}
                aria-label={`Show ${card.alt}`}
                aria-current={i === activeMobileS04 ? "true" : undefined}
              >
                <Image
                  src={`${S04}/${card.img}`}
                  alt={card.alt}
                  width={i === 2 ? 822 : 821}
                  height={i === 2 ? 1914 : 1915}
                  className={styles.mobileS04CardImage}
                  sizes="92px"
                  priority={i === 0}
                  unoptimized
                />
              </button>
            ))}
          </div>
          <div className={styles.mobileS04Dots} aria-label="State card slides">
            {mobileS04Cards.map((card, i) => (
              <button
                key={card.img}
                type="button"
                className={i === activeMobileS04 ? styles.mobileS04DotActive : styles.mobileS04Dot}
                onClick={() => setActiveMobileS04(i)}
                aria-label={`Show ${card.alt}`}
                aria-current={i === activeMobileS04 ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section className={styles.mobileVeluneQuiet} aria-label="Velune 浜旇棣欐皼">

          {/* BG 涓婂眰锛堜袱渚х暀鐧?8.17px/7.17px锛夆€?CSS background */}
          <div className={styles.mobileVeluneBgInsetWrap} aria-hidden="true" />

          {/* 椤堕儴鑺辫崏瑁呴グ鏉★細2251脳284px 鈫?CSS 47.33px */}
          <div className={styles.mobileVeluneStrip}>
            <Image src={`${V}/top_strip.webp`} alt=""
              width={2251} height={284}
              className={styles.mobileVeluneStripImg} sizes="100vw" priority />
          </div>

          {/* 涓诲唴瀹瑰尯锛?251脳913px 鈫?CSS 152px锛宺elative 渚涙枃瀛楀彔鍔?*/}
          <div className={styles.mobileVeluneContent}>
            <Image src={`${V}/products.webp`} alt="Velune 棣欐皼浜у搧绯诲垪"
              fill sizes="100vw"
              className={styles.mobileVeluneProductsImg} priority />

            {/* Velune 涓绘爣棰橈細left=161/6=26.83px  top=253/6=42.17px  size=130/6=21.67px */}
            <h2 className={styles.mobileVeluneTitle}>Velune</h2>

            {/* 鍝佺墝 tagline锛氳瑙?5px锛?0px 脳 scale(0.5) */}
            <div className={styles.mobileVeluneTaglineOuter}>
              <p className={styles.mobileVeluneTagline}>For days that ask a little less of you.</p>
            </div>

            {/* 浜旇鍥炬爣 + 鏂囧瓧锛歜ottom鈮?4.67px */}
            <div className={styles.mobileVeluneWuxing}>
              {veluneElements.map(([el, sub, color]) => (
                <div key={el} className={styles.mobileVeluneEl}>
                  <div className={styles.mobileVeluneElIconWrap}>
                    <Image
                      src={`${V}/icon_${el.toLowerCase()}.webp`}
                      alt={el} width={30} height={30}
                      className={styles.mobileVeluneElIcon}
                    />
                  </div>
                  <span className={styles.mobileVeluneElTitle} style={{ color }}>{el}</span>
                  <div className={styles.mobileVeluneElSubOuter}>
                    <p className={styles.mobileVeluneElSub}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* S06 Some things stay with you. PSD 2255x1908 / 6 = 375.83x318px */}
        <section className={styles.mobileStayWithYou} aria-label="Some things stay with you">
          <Image
            src={`${S06}/top-divider.png`}
            alt=""
            width={2255}
            height={199}
            className={styles.mobileStayDivider}
            sizes="100vw"
          />
          <div className={styles.mobileStayScene}>
            <Image
              src={`${S06}/reference.png`}
              alt="Taiji Fu Tee and quiet kept objects in sunlight"
              fill
              className={styles.mobileStaySceneImage}
              sizes="100vw"
              priority
            />
          </div>
        </section>

        {/* S07 Quiet Moments */}
        <section className={styles.mobileQuietMoments07Wrap} aria-label="Quiet Moments">
          <Image
            src={`${S07}/top-gap.png`}
            alt=""
            width={2255}
            height={202}
            className={styles.mobileQuietMoments07Gap}
            sizes="100vw"
          />
          <div className={styles.mobileQuietMoments07}>
            <Image
              src={`${S07}/bg-clean.png`}
              alt=""
              fill
              className={styles.mobileQuietMoments07Bg}
              sizes="100vw"
            />
            <div className={styles.mobileQuietMoments07Copy}>
              <h2>Quiet Moments</h2>
              <p>Little things that bring you back to yourself.</p>
              <p>Whenever you need them.</p>
            </div>
            <div className={styles.mobileQuietMoments07Cards} aria-label="Quiet Moments product cards">
              <div className={styles.mobileQuietMoments07CardTrack}>
                {mobileS07Cards.map(([image, title, body], index) => (
                  <article
                    key={title}
                    className={styles.mobileQuietMoments07Card}
                    data-card-index={index}
                  >
                    <Image
                      src={`${S07}/${image}`}
                      alt={title}
                      width={450}
                      height={350}
                      className={styles.mobileQuietMoments07Product}
                      sizes="75px"
                    />
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* S08 Healing Paths */}
        <section className={styles.mobileHealingPaths} aria-label="Healing Paths">
          <Image
            src={`${S08}/top-band.png`}
            alt=""
            width={2255}
            height={257}
            className={styles.mobileHealingTopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileHealingScene}>
            <Image
              src={`${S08}/background.png`}
              alt=""
              fill
              className={styles.mobileHealingBgImage}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileHealingCopy}>
              <h2>Healing<br />Paths</h2>
              <p className={styles.mobileHealingSubtitle}>What do you need most today?</p>
              <p className={styles.mobileHealingBody}>Not tomorrow.<br />Not someday.<br />Today.</p>
              <span className={styles.mobileHealingWave} aria-hidden="true" />
              <p className={styles.mobileHealingCount}>45 quiet paths are waiting.</p>
              <Link href="/healing" className={styles.mobileHealingCta}>Begin Gently <span aria-hidden="true">→</span></Link>
            </div>
            {mobileS08Balloons.map((balloon, index) => (
              <div
                key={balloon.label}
                className={`${styles.mobileHealingBalloon} ${styles[balloon.className]}`}
                style={{ "--balloon-delay": `${index * -0.55}s` } as CSSProperties}
              >
                <span className={styles.mobileHealingString} aria-hidden="true" />
                <span className={styles.mobileHealingBalloonFace} data-tone={balloon.tone}>
                  <span className={styles.mobileHealingBalloonIcon} data-icon={balloon.icon} aria-hidden="true" />
                  <span className={styles.mobileHealingBalloonLabel}>{balloon.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* S09 Windkeep Concept */}
        <section className={styles.mobileWindkeep} aria-label="Windkeep">
          <Image
            src={`${S09}/top-gap.png`}
            alt=""
            width={2255}
            height={200}
            className={styles.mobileWindkeepTopGap}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileWindkeepScene}>
            <Image
              src={`${S09}/background.png`}
              alt=""
              fill
              className={styles.mobileWindkeepSceneImage}
              sizes="100vw"
              priority={false}
              unoptimized
            />
            <div className={styles.mobileWindkeepCopy}>
              <h2 className={styles.mobileWindkeepTitle}>WINDKEEP</h2>
              <p className={styles.mobileWindkeepSub}>A place for things that stay.</p>
              <span className={styles.mobileWindkeepRule} aria-hidden="true" />
              <p className={styles.mobileWindkeepBody}>When objects meet time,<br />life becomes poetry.</p>
            </div>

            <div className={styles.mobileWindkeepRail} aria-label="Windkeep services">
              {mobileS09Services.map((service) => (
                <article key={service.title} className={styles.mobileWindkeepCard}>
                  <span className={styles.mobileWindkeepIcon} data-tone={service.tone} aria-hidden="true">
                    {service.icon}
                  </span>
                  <div className={styles.mobileWindkeepCardCopy}>
                    <h3>{service.title}</h3>
                    <span className={styles.mobileWindkeepCardRule} aria-hidden="true" />
                    <p className={styles.mobileWindkeepCardSub}>{service.subtitle}</p>
                    <p className={styles.mobileWindkeepCardBody}>
                      {service.body.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                  <Link
                    href="/windkeep"
                    className={styles.mobileWindkeepArrow}
                    data-tone={service.tone}
                    aria-label={service.title}
                  >
                    <Image
                      src={`${S09}/card-arrow-clean.png`}
                      alt=""
                      width={49}
                      height={49}
                      className={styles.mobileWindkeepArrowImage}
                      aria-hidden="true"
                      unoptimized
                    />
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.mobileWindkeepModules}>
              {mobileS09Modules.map(([title, body], index) => (
                <div key={title} className={styles.mobileWindkeepModule}>
                  <Image
                    src={`${S09}/bottom-icon-0${index + 1}.png`}
                    alt=""
                    width={120}
                    height={120}
                    className={styles.mobileWindkeepModuleIconImage}
                    aria-hidden="true"
                    unoptimized
                  />
                  <div>
                    <h3>{title}</h3>
                    <p>
                      {body.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={`${S09}/top-gap.png`}
            alt=""
            width={2255}
            height={200}
            className={styles.mobileWindkeepFlowerBand}
            sizes="100vw"
            unoptimized
          />
        </section>

        {/* S10 Live with Intention */}
        <section className={styles.mobileLiveIntention} aria-label="Live with Intention">
          <Image
            src={`${S10}/top-band.png`}
            alt=""
            width={2252}
            height={95}
            className={styles.mobileLiveTopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileLiveScene}>
            <Image
              src={`${S10}/background.png`}
              alt=""
              fill
              className={styles.mobileLiveBackground}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <span className={styles.mobileLiveVeilMotion} aria-hidden="true" />
            <span className={styles.mobileLiveBranchMotion} aria-hidden="true" />
            <span className={styles.mobileLiveFlowerMotion} aria-hidden="true" />
            <div className={styles.mobileLiveCopy}>
              <h2>Live with<br />Intention.</h2>
              <span className={styles.mobileLiveRule} aria-hidden="true" />
              <p>Simple rhythms.<br />Meaningful days.</p>
              <span className={styles.mobileLiveWave} aria-hidden="true" />
            </div>
            <div className={styles.mobileLiveCards}>
              {mobileS10Cards.map(([image, title, line1, line2], index) => (
                <article key={title} className={styles.mobileLiveCard}>
                  <Image
                    src={`${S10}/${image}`}
                    alt={title}
                    width={index === 2 ? 470 : index === 3 ? 1362 : 487}
                    height={index === 1 ? 408 : index === 2 ? 411 : index === 3 ? 1155 : 407}
                    className={styles.mobileLiveCardImage}
                    sizes="25vw"
                    unoptimized
                  />
                  <div className={styles.mobileLiveCardCopy}>
                    <h3>{title}</h3>
                    <span aria-hidden="true" />
                    <p>{line1}<br />{line2}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* S11 Moments of Presence */}
        <section className={styles.mobileMomentsPresence} aria-label="Moments of Presence">
          <Image
            src={`${S11}/top-band.png`}
            alt=""
            width={2255}
            height={199}
            className={styles.mobileMomentsTopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileMomentsHero}>
            <Image
              src={`${S11}/hero-right.png`}
              alt=""
              fill
              className={styles.mobileMomentsHeroImage}
              sizes="60vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileMomentsHeroCopy}>
              <h2>Moments of Presence</h2>
              <span aria-hidden="true" />
              <p>Simple moments.<br />Remembered gently.</p>
            </div>
          </div>
          <div className={styles.mobileMomentsCards}>
            {mobileS11Cards.map(([img, title, line1, line2]) => (
              <article key={title} className={styles.mobileMomentsCard}>
                <div className={styles.mobileMomentsImageWrap}>
                  <Image
                    src={`${S11}/${img}`}
                    alt={title}
                    fill
                    className={styles.mobileMomentsCardImage}
                    sizes="83px"
                    unoptimized
                  />
                  <span className={styles.mobileMomentsPlay} aria-hidden="true" />
                </div>
                <div className={styles.mobileMomentsCardCopy}>
                  <h3>{title}</h3>
                  <span aria-hidden="true" />
                  <p>{line1}<br />{line2}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.mobileMomentsQuote}>
            <span className={styles.mobileMomentsLeaf} aria-hidden="true" />
            <p>Let the ordinary be enough.<br />It holds more than we think.</p>
            <span className={styles.mobileMomentsQuoteRule} aria-hidden="true" />
          </div>
        </section>

        {/* S12 Still near the wind */}
        <section className={styles.mobileS12StillWind} aria-label="Still near the wind">
          <Image
            src={`${S12}/top-band.png`}
            alt=""
            width={2254}
            height={201}
            className={styles.mobileS12TopBand}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <div className={styles.mobileS12Scene}>
            <Image
              src={`${S12}/background.png`}
              alt=""
              fill
              className={styles.mobileS12Background}
              sizes="100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.mobileS12BranchMotion} aria-hidden="true" />
            <div className={styles.mobileS12Copy}>
              <h2>Still near<br />the wind.</h2>
              <span className={styles.mobileS12Wave} aria-hidden="true" />
            </div>
            <nav className={styles.mobileS12Nav} aria-label="Still near the wind navigation">
              {mobileS12NavItems.map(([icon, label, href]) => (
                <Link href={href} key={label} className={styles.mobileS12NavItem}>
                  <Image
                    src={`${S12}/${icon}`}
                    alt=""
                    width={300}
                    height={300}
                    className={styles.mobileS12NavIcon}
                    sizes="15vw"
                    unoptimized
                  />
                  <span>{label}</span>
                  <em aria-hidden="true">+</em>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className={styles.mobileS12Closing} aria-label="VIVLUM closing">
          <div className={styles.mobileS12ClosingLeaves} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Image
            src={`${S12}/closing-ribbon.png`}
            alt=""
            width={3531}
            height={1187}
            className={styles.mobileS12ClosingRibbon}
            sizes="100vw"
            aria-hidden="true"
            unoptimized
          />
          <Image
            src={`${S12}/closing-logo.png`}
            alt="VIVLUM"
            width={2790}
            height={1502}
            className={styles.mobileS12ClosingLogo}
            sizes="55vw"
            unoptimized
          />
          <p className={styles.mobileS12ClosingCopyright}>© 2025 RI WIND Studio. All rights reserved.</p>
        </section>

      </section>

      {/* 搴曢儴鍥哄畾 Tab 鏍忥紙绉诲姩绔笓灞烇級 */}
      <nav className={styles.mobileTabBar} aria-label="搴曢儴瀵艰埅">
        {[
          {
            href: "/",
            label: "Home",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                <rect x="7.5" y="12" width="5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              </svg>
            ),
          },
          {
            href: "/objects",
            label: "Objects",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
            ),
          },
          {
            href: "/healing",
            label: "Healing",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16s-7-4.5-7-8.5A4 4 0 0110 5.5 4 4 0 0117 7.5C17 11.5 10 16 10 16z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              </svg>
            ),
          },
          {
            href: "/windkeep",
            label: "Windkeep",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3l8 14H2L10 3z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              </svg>
            ),
          },
          {
            href: "/guidance",
            label: "Support",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="10" r="1.2" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.2" fill="currentColor"/>
                <circle cx="14" cy="10" r="1.2" fill="currentColor"/>
              </svg>
            ),
          },
        ].map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? styles.mobileTabItemActive : styles.mobileTabItem}
          >
            {icon}
            <span className={styles.mobileTabLabel}>{label}</span>
          </Link>
        ))}
      </nav>

    </main>
  );
}
