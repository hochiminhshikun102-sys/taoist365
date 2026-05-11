/**
 * Objects in relation to anonymous human motion, fatigue, interruption — not character fiction.
 */

export type ObjectHumanRoomContext = {
  /** Near-object residue: half-open, draped, unwashed honesty */
  humanResidueNearObject: string;
  /** Interrupted motion tied to this thing */
  interruptedMotion: string;
  /** Life weather — light stress/cold/busy, not psychology */
  humanWeather: string;
  /** Touched / absent-minded placement — felt long-term */
  touchedAndLeft: string;
};

export const humanRoomContextByCatalogId: Record<string, ObjectHumanRoomContext> = {
  "taoist365-desk-mug-sand": {
    humanResidueNearObject:
      "Cup survives overnight beside trackpad because clearing felt like one more task; ring inside maps mornings someone skipped the full rinse.",
    interruptedMotion:
      "Email half-answered—thumb left mug mid-sip to type one word then never returned to the lip angle planned.",
    humanWeather:
      "Heavy week: rings stack shallower geology faster; cold week: mug migrates nearer radiator breath between calls.",
    touchedAndLeft:
      "Thumb oil matte band widens without performance—someone kept lifting without looking.",
  },
  "taoist365-linen-napkin-raw": {
    humanResidueNearObject:
      "Draped over chair back because table clear never happened; half-dry from hands that wiped and walked.",
    interruptedMotion:
      "Folding stopped mid-corner—linen left crooked because the kettle whistled louder than discipline.",
    humanWeather:
      "Humid week: linen smells like last meal longer; tired month: same square lives on laptop thigh instead of table.",
    touchedAndLeft:
      "Grab creases repeat same thumb quadrant—muscle knows which corner lifts bowls.",
  },
  "taoist365-oak-tray-narrow": {
    humanResidueNearObject:
      "Catches keys, receipt spike, one earbud case—someone emptied pockets while standing, never squared edges after.",
    interruptedMotion:
      "Hall dump interrupted—tray slid closer door then stayed; mail avalanche partially hides oak lip weeks.",
    humanWeather:
      "Busy fortnight: tray becomes louder metal chorus; quiet Sunday: coins fewer, dust more honest on grain.",
    touchedAndLeft:
      "Coin polish ovals deepen from absent-minded pocket rhythm, not curation.",
  },
  "taoist365-stone-smoke-dish": {
    humanResidueNearObject:
      "Ash thin because someone stopped mid-stick often; sill dust negotiates with open window someone forgot to close.",
    interruptedMotion:
      "Incense lit then abandoned when phone rang—stone cools mid-intention without drama.",
    humanWeather:
      "Stress week: more gray strata; absent month: stone sits empty gathering dust like any other flat thing.",
    touchedAndLeft:
      "Thumb checks cool before lighting—touch habit without mindfulness vocabulary.",
  },
  "taoist365-layflat-notebook": {
    humanResidueNearObject:
      "Stays cracked open mid-page because closing felt like lying about progress; pen cap chewed beside spine.",
    interruptedMotion:
      "Sentence stopped mid-line when shoulders gave out—notebook left victim to lamp cone only.",
    humanWeather:
      "Busy month: same dog-ear thickens; quiet week: pages actually turn instead of guilt bookmark.",
    touchedAndLeft:
      "Margin smudge from palm heel during one-handed scrolling—unconscious weight transfer.",
  },
  "taoist365-cotton-letter-sheets": {
    humanResidueNearObject:
      "One sheet creased under unpaid envelope stack—someone weighted mail with paper instead of dealing.",
    interruptedMotion:
      "Address written twice wrong—third envelope folded anyway into drawer crack left open.",
    humanWeather:
      "Apology season: stack thins; avoidance season: cotton yellows slower in dark drawer.",
    touchedAndLeft:
      "Feather edges soften where thumbs worried same corner before mailing courage arrived late.",
  },
  "taoist365-night-teacup": {
    humanResidueNearObject:
      "Half tea left because eyelids negotiated truce first; steam ghosted screen corner someone stopped reading.",
    interruptedMotion:
      "Cup abandoned mid-refill when radiator ticked wrong—returned next night without washing crime.",
    humanWeather:
      "Cold snap: more refills; heat wave: ring dries pale faster between distracted sips.",
    touchedAndLeft:
      "Handle wear maps one-finger lift fatigue—same physics nightly without naming ritual.",
  },
  "taoist365-maple-paperweight": {
    humanResidueNearObject:
      "Pins letters someone keeps not opening—wood oil darkens where palm rested during sigh calls.",
    interruptedMotion:
      "Stack shuffled once then frozen—paperweight slid two millimeters then nobody bothered centering again.",
    humanWeather:
      "Windy week: weight earns gratitude; stagnant air week: receipts breed anyway under same block.",
    touchedAndLeft:
      "Face oil half-moon widens from cheek lean during video—bored geometry, not spa calm.",
  },
};

export function humanRoomContextForPiece(piece: { id: string }): ObjectHumanRoomContext {
  const h = humanRoomContextByCatalogId[piece.id];
  if (!h) {
    return {
      humanResidueNearObject: "Nearby clutter admits a body passed—drawer cracked, cup not cleared.",
      interruptedMotion: "Motion stopped honest—chair angle, paper half-fold.",
      humanWeather: "Week texture shifts surfaces without analysis.",
      touchedAndLeft: "Oil and pressure leave democracy marks—no viewer pose.",
    };
  }
  return h;
}
