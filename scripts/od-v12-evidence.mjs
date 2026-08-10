import { createRequire } from "module";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const require = createRequire("D:/DH_ORDER_LIST_RUNTIME_V1_1_WT/package.json");
const { chromium } = require("playwright");
const sharp = require("sharp");

const OUT =
  process.env.OUT ||
  "D:/狗蛋cursor专线/2-我的订单/3-订单详情页/01_狗蛋产出/订单详情_V1.2_安装证据";
const WORK =
  process.env.WORK ||
  "D:/DH_PAGE_QI_ISOLATED/ORDER_DETAIL_REBUILD_RUNTIME_V1_2/EXTRACT/DOHARA_OrderDetail_REBUILD_RUNTIME_V1_2/05_QA";
const BASE = "http://127.0.0.1:4783/account/orders/DOH202405160001.html";

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, "截图"), { recursive: true });

async function forceLoad(page) {
  await page.evaluate(async () => {
    for (const img of document.images) {
      if (img.loading === "lazy") img.loading = "eager";
      try {
        await img.decode();
      } catch {}
    }
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    if (document.fonts?.ready) await document.fonts.ready;
  });
}

async function capture(page, w, expectH, name) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await forceLoad(page);
  const metrics = await page.evaluate(() => {
    const broken = [...document.images]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => (i.currentSrc || i.src || "").replace(location.origin, ""));
    const heroImg = document.querySelector(".od-hero img, .od-hero picture img");
    const heroSrc = heroImg ? heroImg.currentSrc || heroImg.src : "";
    const fonts = {};
    const weights = new Set();
    document.querySelectorAll("h1,h2,h3,p,strong,button,span,a,label,small,dt,dd").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.display === "none" || !(el.textContent || "").trim()) return;
      const fam = (s.fontFamily || "").split(",")[0].replace(/["']/g, "").trim();
      if (!fam.startsWith("DHOrderDetail")) return;
      fonts[fam + "@" + s.fontWeight] = (fonts[fam + "@" + s.fontWeight] || 0) + 1;
      weights.add(s.fontWeight);
    });
    const faces = [...document.fonts]
      .filter((f) => f.status === "loaded" && String(f.family).includes("DHOrderDetail"))
      .map((f) => f.family + ":" + f.weight);
    const recImgs = [...document.images].filter((i) =>
      /recommendations\/product_/.test(i.currentSrc || i.src || ""),
    );
    const grid = document.querySelector(".product-grid");
    let columns = null;
    if (grid) {
      const cs = getComputedStyle(grid);
      const t = cs.gridTemplateColumns || "";
      columns = t.split(" ").filter(Boolean).length || null;
    }
    let visibleRec = 0;
    for (const img of recImgs) {
      const art = img.closest("article") || img;
      const s = getComputedStyle(art);
      if (s.display !== "none" && s.visibility !== "hidden") visibleRec++;
    }
    const overflowX =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    return {
      scrollHeight: document.documentElement.scrollHeight,
      overflowX,
      broken,
      heroSrc,
      heroNatural: heroImg ? [heroImg.naturalWidth, heroImg.naturalHeight] : null,
      fonts,
      weights: [...weights].sort(),
      faces: [...new Set(faces)],
      recDom: recImgs.length,
      recVisible: visibleRec,
      columns,
    };
  });
  const shot = path.join(OUT, "截图", name);
  await page.screenshot({ path: shot, fullPage: true });
  const meta = await sharp(shot).metadata();
  return { ...metrics, shot, shotSize: [meta.width, meta.height], expectH };
}

async function diff(a, b, outOverlay) {
  const A = await sharp(a).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const B = await sharp(b)
    .resize(A.info.width, A.info.height, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const n = A.info.width * A.info.height;
  let sum = 0;
  let over = 0;
  const ov = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    const d =
      Math.abs(A.data[o] - B.data[o]) +
      Math.abs(A.data[o + 1] - B.data[o + 1]) +
      Math.abs(A.data[o + 2] - B.data[o + 2]);
    const m = d / 3;
    sum += m;
    if (m > 12) over++;
    ov[o] = 255;
    ov[o + 1] = Math.max(0, 255 - m * 3);
    ov[o + 2] = Math.max(0, 255 - m * 3);
    ov[o + 3] = 255;
  }
  await sharp(ov, { raw: { width: A.info.width, height: A.info.height, channels: 4 } })
    .png()
    .toFile(outOverlay);
  return { mean: +(sum / n).toFixed(3), overPct: +((over / n) * 100).toFixed(3) };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });
const pc = await capture(page, 1440, 4380, "PC_1440_全长.png");
const mobile = await capture(page, 390, 4649, "Mobile_390_全长.png");
await browser.close();

const workPc = path.join(WORK, "pc_fullpage.png");
const workMo = path.join(WORK, "mobile_fullpage.png");
const pcDiff = await diff(pc.shot, workPc, path.join(OUT, "截图", "PC_对照叠印.png"));
const mobileDiff = await diff(mobile.shot, workMo, path.join(OUT, "截图", "Mobile_对照叠印.png"));

const badWeights = [...pc.weights, ...mobile.weights].filter((w) => !["400", "500", "600"].includes(String(w)));
const gates = {
  pc_height: pc.scrollHeight === 4380 && pc.shotSize[1] === 4380,
  mobile_height: mobile.scrollHeight === 4649 && mobile.shotSize[1] === 4649,
  pc_overflow: pc.overflowX === false,
  mobile_overflow: mobile.overflowX === false,
  pc_broken: pc.broken.length === 0,
  mobile_broken: mobile.broken.length === 0,
  pc_hero: /order_detail_hero_pc_indoor_runtime_v1_2_1440x420\.png/.test(pc.heroSrc),
  mobile_hero: /order_detail_hero_mobile_indoor_runtime_v1_2_390x280\.png/.test(mobile.heroSrc),
  pc_rec_16_4: pc.recDom === 16 && pc.recVisible === 16 && pc.columns === 4,
  mobile_rec_12_2: mobile.recDom === 16 && mobile.recVisible === 12 && mobile.columns === 2,
  fonts_weights_ok: badWeights.length === 0,
};

const blockers = Object.entries(gates)
  .filter(([, v]) => !v)
  .map(([k]) => k);

const report = {
  ts: new Date().toISOString(),
  preview: BASE,
  INSTALL_COMPLETE: true,
  PAGE_GO: false,
  PRODUCTION_DEPLOY: false,
  verdict: blockers.length ? "INSTALL_NO_GO" : "INSTALL_COMPLETE_AWAITING_WORK_REVERIFY",
  gates,
  blockers,
  pc,
  mobile,
  pcDiff,
  mobileDiff,
  package_sha256: "6be15f7681d0c131214641eb227444caa2837c8a21dcaae7340c227c29009637",
};

fs.writeFileSync(path.join(OUT, "安装取证报告.json"), JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      verdict: report.verdict,
      blockers,
      gates,
      pcH: pc.scrollHeight,
      moH: mobile.scrollHeight,
      pcHero: pc.heroSrc,
      moHero: mobile.heroSrc,
      pcRec: [pc.recDom, pc.recVisible, pc.columns],
      moRec: [mobile.recDom, mobile.recVisible, mobile.columns],
      weights: { pc: pc.weights, mobile: mobile.weights },
      faces: pc.faces,
      pcDiff,
      mobileDiff,
      broken: { pc: pc.broken, mobile: mobile.broken },
    },
    null,
    2,
  ),
);
