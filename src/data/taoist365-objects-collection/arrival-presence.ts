/** First week + first wear — ordinary arrival, not unboxing theater */

export type ObjectArrivalPresence = {
  /** Week one narrative: unwrap, place, first stain, first forget, notice again */
  firstWeekInRoom: string;
  /** First marks that make it yours — not care instructions */
  firstWearMarks: string;
  /** Quiet ordinary arrival moments */
  quietArrivalVignette: string;
  /** Lands among receipts / hall table — room closes */
  roomLandingOrdinary: string;
  /** Settles rather than peaks */
  settledThingClosing: string;
};

export const arrivalPresenceByCatalogId: Record<string, ObjectArrivalPresence> = {
  "taoist365-desk-mug-sand": {
    firstWeekInRoom:
      "Day one it steals the coaster spot without asking; by day four the first ring braids inside glaze honest—oil from thumbs, not ceremony pour. You forget it exists until midnight water brings your hand back blind to the thick rim; week’s end it already migrated once—from counter lip to desk edge after dinner dishes stalled.",
    firstWearMarks:
      "First chip usually kisses radiator paint or tile lip; sand glaze dulls along lip line before Instagram would forgive.",
    quietArrivalVignette:
      "Box beside door through drizzle; opened standing because couch held laundry; rinsed once impatiently while kettle screamed.",
    roomLandingOrdinary:
      "First lands on hall mail stack—then beside charger knot and grocery receipt someone meant to photograph for returns.",
    settledThingClosing:
      "Stops announcing sand stoneware and becomes the mug your thumb routes to—ordinary annexation.",
  },
  "taoist365-linen-napkin-raw": {
    firstWeekInRoom:
      "Unpack smells like dryer sheets lied—linen arrives stiff then softens mid-week under mug steam. First stain might be jam thumb honest day two; you fold wrong twice then stop apologizing. Forgotten under laptop Friday; Saturday breakfast remembers it before you do.",
    firstWearMarks:
      "Raw hem lifts threads after first wash spiral; center square darkens before corners admit defeat.",
    quietArrivalVignette:
      "Envelope thin—sat on dresser two nights; unfolded beside sink while brushing teeth.",
    roomLandingOrdinary:
      "Briefly draped over laundry chair back—then crumpled permanently beside trackpad heat.",
    settledThingClosing:
      "Becomes ‘that linen’ rather than inventory square—frayed sovereignty.",
  },
  "taoist365-oak-tray-narrow": {
    firstWeekInRoom:
      "Paper rattles—first placement wrong three times before hall table accepts it. Keys scratch honest hour one; by day five coins polish twin ghosts you stop polishing away. Tray forgotten entire Sunday until Monday pocket dump proves dependence.",
    firstWearMarks:
      "Grain lifts along coin paths first; one corner softens when box corner kissed it during clumsy unpack.",
    quietArrivalVignette:
      "Arrived taped to cardboard cousin—opened after shift under ceiling LED only half lit.",
    roomLandingOrdinary:
      "Starts kitchen-adjacent—migrates toward door debris where mail breeds.",
    settledThingClosing:
      "Ceases being oak purchase—becomes landing democracy your pockets respect.",
  },
  "taoist365-stone-smoke-dish": {
    firstWeekInRoom:
      "Heavy pocket inside tissue lies—first placement windowsill until ventilation panic moves it kettle-adjacent. Ash begins innocent gray dust if anything burns week one; mostly it sits cool reminding palms. Forgotten until smell argues Wednesday.",
    firstWearMarks:
      "First ring lighter than later strata—humidity smears gray softer on humid coast weeks.",
    quietArrivalVignette:
      "Small box rattled; left unopened beside boots until midnight brain remembered patience.",
    roomLandingOrdinary:
      "Shares sill with metro card and drought succulent honesty.",
    settledThingClosing:
      "Mineral stops demanding introduction—just cool neighbor beside glass.",
  },
  "taoist365-layflat-notebook": {
    firstWeekInRoom:
      "Spine crack audible day three under heavier hand; coffee miss lands mid-week forgiving blot. Forgotten closed Monday anxiety; Tuesday opens mid-meeting guilt. First dog-ear accidental Wednesday folding laundry atop it.",
    firstWearMarks:
      "Glue pale stripe where humidity lifted; corner bend permanent after backpack squeeze.",
    quietArrivalVignette:
      "Cardboard sleeve bent—opened after dishes because counter was only flat plane clean.",
    roomLandingOrdinary:
      "Nestles under mug steam edge beside charger diplomacy.",
    settledThingClosing:
      "Notebook stops being oat SKU—becomes half-thought archive refusing cloud etiquette.",
  },
  "taoist365-cotton-letter-sheets": {
    firstWeekInRoom:
      "Drawer shuffle finds space beside stamps crooked; first sheet sacrificed to pen test bleeds feather honest. Forgotten envelope fantasy Thursday; Friday thumb remembers cotton weight. Stack thins audibly without shame.",
    firstWearMarks:
      "First envelope crease ghosts second sheet; scissors hurry leaves inaugural feather.",
    quietArrivalVignette:
      "Flat mailer slid under door angle—opened Saturday morning before coffee finished dripping.",
    roomLandingOrdinary:
      "Under laptop corner pinning drafts beside dull blade and curling stamps.",
    settledThingClosing:
      "Pack becomes correspondence drawer weather—not stationery flex.",
  },
  "taoist365-night-teacup": {
    firstWeekInRoom:
      "First steep stains crackle map deeper than marketing promised; handle learns one-finger lift physics night four. Forgotten wet Monday morning—afternoon microwave guilt decline. Radiator nights thicken steam honesty.",
    firstWearMarks:
      "Interior gradient permanent after week one broth experiment; rim cooling rings honest geography.",
    quietArrivalVignette:
      "Bubble wrap whisper opened after shift—cup rinsed impatient before tea bag debate.",
    roomLandingOrdinary:
      "Claims laptop-left turf beside sticky graveyard and warm brick.",
    settledThingClosing:
      "Crackle cup retires introduction—just warmth beside glow.",
  },
  "taoist365-maple-paperweight": {
    firstWeekInRoom:
      "Weight surprises palm day one—slides receipts first evening draft panic. Palm oils maple patch honest before week closes; wind tests window—you tap block twice superstitious. Forgotten until paper rebellion Thursday.",
    firstWearMarks:
      "Corner eases first glass kiss; oil thumb moon evident before second grocery list pinned.",
    quietArrivalVignette:
      "Small heavy box—opened during podcast drone; set atop mail pile until guilt relocated it sill-ward.",
    roomLandingOrdinary:
      "Pins lists beside tape measure and cat fur tumbleweed.",
    settledThingClosing:
      "Gravity stops lecturing—just keeps papers from lying.",
  },
};

export function arrivalPresenceForPiece(piece: { id: string }): ObjectArrivalPresence {
  const a = arrivalPresenceByCatalogId[piece.id];
  if (!a) {
    return {
      firstWeekInRoom:
        "Week one lands messy—opened late, placed wrong twice, first honest mark before Instagram patience.",
      firstWearMarks: "Initial scuff or bend admits reality faster than manual promises.",
      quietArrivalVignette: "Beside door through ordinary weather—opened when fatigue allowed.",
      roomLandingOrdinary: "Hall debris then desk democracy—room absorbs without fanfare.",
      settledThingClosing: "Thing annexes habit until peak novelty dies quietly.",
    };
  }
  return a;
}
