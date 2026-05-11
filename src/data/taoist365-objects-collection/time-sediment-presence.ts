/** Many months in one place — historical weight, not staged antiquing */

export type ObjectTimeSediment = {
  timeSedimentInRoom: string;
  historicalWeight: string;
  seasonalTimeMarks: string;
  repetitionNotRoutine: string;
  belongsToSurface: string;
};

export const timeSedimentByCatalogId: Record<string, ObjectTimeSediment> = {
  "taoist365-desk-mug-sand": {
    timeSedimentInRoom:
      "Rings stack shallow geology—summer lip line paler, winter broth ring darker; mug hasn’t earned a cabinet vote in three seasons.",
    historicalWeight:
      "Thumb-polished band widened without ceremony—same cylinder through job changes nobody framed as arc.",
    seasonalTimeMarks:
      "Radiator months dry glaze faster; humid weeks leave sweat-oil crescent outside handle honest.",
    repetitionNotRoutine:
      "Same lateral slide onto coaster misaligned months—sound precedes thought, nobody named it practice.",
    belongsToSurface:
      "Cup belongs to that desk quadrant now—removing it exposes dust shape like moving furniture.",
  },
  "taoist365-linen-napkin-raw": {
    timeSedimentInRoom:
      "Fibers fatigue honest—edge curl fixed months; drawer forgot its name because chair back became linen’s real address.",
    historicalWeight:
      "Stain map stratifies—barbecue summer, ink autumn—calendar without Instagram grid.",
    seasonalTimeMarks:
      "Dry heat papery cheek; humid weeks soften grab corners first.",
    repetitionNotRoutine:
      "Same thumb lifts same corner before bowls—muscle sediment, not mindful napkin ritual.",
    belongsToSurface:
      "Linen belongs to laptop-adjacent heat now—table manners retired.",
  },
  "taoist365-oak-tray-narrow": {
    timeSedimentInRoom:
      "Coin halos deepen; mail dust outlines where stacks sat through two tax seasons unmoved.",
    historicalWeight:
      "Tray became hall geology—keys never learned another landing sound.",
    seasonalTimeMarks:
      "Humid summer swells grain smile; dry winter shrinks crack whisper along one edge.",
    repetitionNotRoutine:
      "Pocket dump identical angle nightly—repetition as weather, not habit tracker.",
    belongsToSurface:
      "Tray belongs to door-adjacent counter—removing it feels like removing outlet.",
  },
  "taoist365-stone-smoke-dish": {
    timeSedimentInRoom:
      "Ash strata reads seasons when someone bothered versus when air won; sill paint paler under stone footprint.",
    historicalWeight:
      "Cool weight same sill coordinate across humid arguments with windows—history is placement, not story.",
    seasonalTimeMarks:
      "Winter shut-window gray thicker; summer breeze thins ash honesty faster.",
    repetitionNotRoutine:
      "Thumb temperature check before lighting—same micro-motion, never named ritual.",
    belongsToSurface:
      "Stone belongs to glass-adjacent sill grammar—empty still reads occupied.",
  },
  "taoist365-layflat-notebook": {
    timeSedimentInRoom:
      "Spine looseness measurable; same page dog-ear thickness doubled since tax season one.",
    historicalWeight:
      "Coffee ellipse on page seven outlasted three software skins—paper is the slowest changelog.",
    seasonalTimeMarks:
      "Heating months crisp page edges; humidity feathers ink you stopped blaming.",
    repetitionNotRoutine:
      "Opens to same margin nightly—fold memory, not journaling discipline.",
    belongsToSurface:
      "Notebook belongs beside that lamp cone—shadow shape proves months.",
  },
  "taoist365-cotton-letter-sheets": {
    timeSedimentInRoom:
      "Drawer weight audio thinned; ghost ink stack visible when light angles winter-low.",
    historicalWeight:
      "Same stamp corner kissed dozens—cotton remembers postage courage without relic tone.",
    seasonalTimeMarks:
      "Static winter lifts fibers when heat clicks; summer drawer smells slower.",
    repetitionNotRoutine:
      "Thumb finds feather edge blind—repetition from correspondence fatigue, not wellness.",
    belongsToSurface:
      "Cotton belongs under laptop thermal corner—apology geology sedimented.",
  },
  "taoist365-night-teacup": {
    timeSedimentInRoom:
      "Crackle map predictable as weather app; interior stain democracy deepened across heating seasons.",
    historicalWeight:
      "Handle wear asymmetry frozen—left-thumb civilization months thick.",
    seasonalTimeMarks:
      "Long nights stack rings shallower; short summer nights cool mug faster between distracted sips.",
    repetitionNotRoutine:
      "Same glow-adjacent placement hundreds of midnights—no calm-routine caption fits.",
    belongsToSurface:
      "Cup belongs inside laptop bloom—removing it widens wrong blue.",
  },
  "taoist365-maple-paperweight": {
    timeSedimentInRoom:
      "Oil moons waxed through quarterlies; receipt stack height changed but block coordinate fossilized.",
    historicalWeight:
      "Corners eased from glass kisses across years not weeks—time is geometry, not vibe.",
    seasonalTimeMarks:
      "Dry months shrink wood whisper-tight; muggy weeks swell grain smile without poetry.",
    repetitionNotRoutine:
      "Same palm rest during calls—sedimented lean, not ergonomic mindfulness.",
    belongsToSurface:
      "Weight belongs pinning that bill stack—wind remembers negotiation.",
  },
};

export function timeSedimentForPiece(piece: { id: string }): ObjectTimeSediment {
  const t = timeSedimentByCatalogId[piece.id];
  if (!t) {
    return {
      timeSedimentInRoom: "Sun and hands wrote slow edits nobody styled.",
      historicalWeight: "Object outlasted several moods without announcement.",
      seasonalTimeMarks: "Heat and humidity argued surfaces honestly.",
      repetitionNotRoutine: "Same drop gesture until sound became furniture.",
      belongsToSurface: "Surface minus object shows outline ghost months.",
    };
  }
  return t;
}
