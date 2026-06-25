export type WindkeepPassingStatus = "resting" | "ready to pass" | "being considered" | "recently received";

export type WindkeepPassingObject = {
  id: string;
  title: string;
  objectType: string;
  city: string;
  emotionalResidue: string;
  passingStatus: WindkeepPassingStatus;
  storyFragment: string;
  timeMark: string;
  previousHolderNote?: string;
  image: {
    src: string;
    alt: string;
  };
};

export type QuietReceivingObject = WindkeepPassingObject & {
  releaseReason: string;
  emotionalContext?: string;
  receivingNote: string;
  acceptanceFlow: readonly string[];
};

type PassingSeed = {
  title: string;
  objectType: string;
  city: string;
  residue: string;
  fragment: string;
  previous?: string;
};

const objectImageNames = [
  "1",
  "1.1",
  "10",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108-1",
  "108-2",
  "109",
  "11",
  "12",
  "120",
  "121-1",
  "122",
  "124",
  "125",
  "127",
  "128",
  "129",
  "129-1",
  "129b-1",
  "129b-2",
  "13",
  "130",
  "131",
  "131-2",
  "132",
  "133",
  "134-1",
  "134-2",
  "135-1",
  "135-2",
  "136-1",
  "137",
  "138",
  "139",
  "14",
  "140",
  "142",
  "143",
  "145",
  "15",
  "150-1",
  "150-2",
  "16",
  "161",
  "162",
  "163",
  "165",
  "166",
  "167",
  "168",
  "17",
  "18",
  "19",
  "2",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "3",
  "30",
  "31",
] as const;

const basePassingSeeds: readonly PassingSeed[] = [
  { title: "Blue cup by the sink", objectType: "ceramic cup", city: "Portland", residue: "morning water and a quiet counter", fragment: "It stayed beside a small sink through a winter of early departures.", previous: "Left by someone who stopped drinking coffee at home." },
  { title: "Folded linen square", objectType: "linen cloth", city: "Lisbon", residue: "fold lines and tea warmth", fragment: "It moved between a table drawer and a writing desk without becoming special." },
  { title: "Narrow oak tray", objectType: "wood tray", city: "Chicago", residue: "keys, receipts, and hallway dust", fragment: "It caught ordinary arrivals near a door that opened too often." },
  { title: "Small stone dish", objectType: "stone dish", city: "Melbourne", residue: "cool stone after open windows", fragment: "It sat on a ledge where someone kept small things from scattering." },
  { title: "Notebook with soft corners", objectType: "notebook", city: "Toronto", residue: "lamp shadow and pressed pages", fragment: "Half the pages stayed blank, which felt right for that year.", previous: "Released before another move." },
  { title: "Cotton letter sheets", objectType: "paper set", city: "Kyoto", residue: "drawer stillness and half folds", fragment: "A few sheets were used for letters that took weeks to send." },
  { title: "Brass bookmark", objectType: "bookmark", city: "Brooklyn", residue: "paper edge and bedside light", fragment: "It remained in the same book long after the book was finished." },
  { title: "Window plant saucer", objectType: "plant saucer", city: "Seattle", residue: "water rings and pale sill dust", fragment: "It held a pot that grew slowly toward the glass." },
  { title: "White enamel spoon", objectType: "kitchen spoon", city: "Copenhagen", residue: "porridge steam and quiet breakfasts", fragment: "It was used on mornings when nothing needed to be decided." },
  { title: "Pale blue scarf", objectType: "cotton scarf", city: "Oslo", residue: "coat sleeve warmth", fragment: "It lived on a hook through two cold seasons." },
  { title: "Round paperweight", objectType: "glass weight", city: "San Francisco", residue: "papers held in afternoon light", fragment: "It kept receipts flat on a desk near the window." },
  { title: "Plain incense tin", objectType: "tin box", city: "Vancouver", residue: "faint smoke and metal lid sound", fragment: "The last sticks were used slowly, always with the window cracked." },
  { title: "Soft-edged photo frame", objectType: "photo frame", city: "Berlin", residue: "sun fade behind glass", fragment: "The photograph was removed, but the frame kept the place of a face." },
  { title: "Thin cotton pouch", objectType: "cloth pouch", city: "Taipei", residue: "travel dust and drawer cotton", fragment: "It carried small cables, then nothing, then a few buttons." },
  { title: "Warm gray bowl", objectType: "ceramic bowl", city: "Austin", residue: "rice steam and quiet washing", fragment: "It was the bowl someone reached for when eating alone felt easier." },
  { title: "Worn book sleeve", objectType: "book sleeve", city: "Dublin", residue: "commute paper and rain air", fragment: "It protected one paperback across a season of train rides." },
  { title: "Small cedar block", objectType: "cedar block", city: "Stockholm", residue: "closet wood and folded wool", fragment: "It stayed among sweaters and made the drawer feel cared for." },
  { title: "Clear tea jar", objectType: "glass jar", city: "Auckland", residue: "loose leaves and kitchen light", fragment: "The label came off, but the smell of tea remained faintly." },
  { title: "Porcelain rest", objectType: "chopstick rest", city: "Seoul", residue: "table pause and rinsed porcelain", fragment: "It appeared only when dinner was unhurried." },
  { title: "Desk bell without a clapper", objectType: "small bell", city: "Prague", residue: "silent brass and shelf light", fragment: "It no longer rang, which made it easier to keep." },
  { title: "Washed cotton towel", objectType: "hand towel", city: "Bath", residue: "sun-dried cotton", fragment: "It hung near a basin where guests washed their hands." },
  { title: "Small green vase", objectType: "bud vase", city: "Amsterdam", residue: "single stems and canal light", fragment: "It held short flowers from a market stall on quiet Fridays." },
  { title: "Bamboo letter opener", objectType: "letter opener", city: "Nara", residue: "opened envelopes and desk dust", fragment: "It was used rarely, then kept because rare mail still mattered." },
  { title: "Oval soap dish", objectType: "soap dish", city: "Helsinki", residue: "clean water and pale ceramic", fragment: "It made the sink feel settled after a long renovation." },
  { title: "Linen apron tie", objectType: "apron", city: "Bristol", residue: "flour and weekend lunch", fragment: "It softened after many washes and stopped looking new." },
  { title: "Blue striped bowl", objectType: "rice bowl", city: "Honolulu", residue: "salt air and cupboard shadow", fragment: "It stayed on the lowest shelf because it was used most." },
  { title: "Tin of spare buttons", objectType: "button tin", city: "Montreal", residue: "thread ends and patient repairs", fragment: "The buttons did not match, but they kept being useful." },
  { title: "Small wall hook", objectType: "brass hook", city: "Edinburgh", residue: "coat weight and entry light", fragment: "It came from a hallway where one coat always stayed ready." },
  { title: "Flat woven mat", objectType: "table mat", city: "Milan", residue: "bread crumbs and woven grass", fragment: "It marked one place at a table without making a ceremony." },
  { title: "Plain white pitcher", objectType: "water pitcher", city: "Madrid", residue: "cold water and lunch light", fragment: "It stood on a table through summers when windows stayed open." },
  { title: "Small travel mirror", objectType: "pocket mirror", city: "Paris", residue: "bag lining and quick checks", fragment: "Its hinge loosened, but it still closed with a soft sound." },
  { title: "Unmarked recipe card", objectType: "recipe card", city: "Minneapolis", residue: "butter marks and pencil", fragment: "The measurements were ordinary; the handwriting made them stay." },
  { title: "Stone-colored candle cup", objectType: "candle cup", city: "Reykjavik", residue: "wax rim and long evening", fragment: "It was lit on nights when the room needed less brightness." },
  { title: "Soft brush for crumbs", objectType: "table brush", city: "Brussels", residue: "linen crumbs and wooden handle", fragment: "It cleared the table after slow meals." },
  { title: "Folded market bag", objectType: "cotton bag", city: "New York", residue: "apples, books, and rain", fragment: "It carried more library books than groceries." },
  { title: "Quiet green mug", objectType: "stoneware mug", city: "Wellington", residue: "late tea and window rain", fragment: "It stayed warm between two hands during a difficult month." },
  { title: "Small ceramic lid", objectType: "loose lid", city: "Zurich", residue: "missing jar and cupboard quiet", fragment: "The jar was gone, but the lid kept being used as a tiny plate." },
  { title: "Soft cotton napkin pair", objectType: "napkin pair", city: "Boston", residue: "two place settings", fragment: "They were washed together and folded into the same drawer." },
  { title: "Wooden salt spoon", objectType: "salt spoon", city: "Charleston", residue: "kitchen salt and warm wood", fragment: "It belonged to a jar that sat near the stove." },
  { title: "Small bedside carafe", objectType: "glass carafe", city: "Vienna", residue: "night water and morning glass", fragment: "It made waking at night feel less abrupt." },
  { title: "Thin wool coaster", objectType: "coaster", city: "Boulder", residue: "cup circles and desk quiet", fragment: "It lived under the same mug through a year of home work." },
  { title: "Paper lamp pull", objectType: "lamp pull", city: "London", residue: "bedside reach and paper shade", fragment: "It ended many evenings without needing a switch." },
  { title: "Small ceramic bird", objectType: "shelf object", city: "Porto", residue: "shelf dust and morning glance", fragment: "It was not displayed; it simply stayed where the eye passed." },
  { title: "Woven basket liner", objectType: "cloth liner", city: "Santa Fe", residue: "market herbs and sun cloth", fragment: "It lined a basket that went out every Saturday." },
  { title: "Gray pencil cup", objectType: "desk cup", city: "Denver", residue: "pencil dust and bills", fragment: "It held pens that mostly worked and one pair of small scissors." },
  { title: "White cotton curtain tie", objectType: "curtain tie", city: "Athens", residue: "window air and morning fabric", fragment: "It kept a curtain open during a season of bright mornings." },
  { title: "Tin measuring cup", objectType: "measuring cup", city: "Nashville", residue: "flour cloud and cabinet sound", fragment: "Its numbers softened, but the hand still knew the amount." },
  { title: "Flat stone from a desk", objectType: "desk stone", city: "Lyon", residue: "paper weight and hand rest", fragment: "It was picked up during phone calls and put back without thought." },
  { title: "Old cotton pillowcase", objectType: "pillowcase", city: "Savannah", residue: "laundry sun and guest room", fragment: "It belonged to a guest bed that was used only sometimes." },
  { title: "Small brass saucer", objectType: "brass saucer", city: "Mexico City", residue: "rings of light and low shelf", fragment: "It held earrings, coins, and one key that was never used." },
  { title: "Blue enamel pin tray", objectType: "pin tray", city: "Warsaw", residue: "sewing pins and quiet repair", fragment: "It stayed near a chair where hems were fixed by hand." },
  { title: "Half-used sketch pad", objectType: "sketch pad", city: "Oakland", residue: "soft graphite and pauses", fragment: "The drawings stopped halfway through the pad, but the paper remained good." },
  { title: "Linen-wrapped soap", objectType: "wrapped soap", city: "Florence", residue: "clean drawer and folded linen", fragment: "It scented a drawer more than it was ever used." },
  { title: "Small wood frame", objectType: "wood frame", city: "Quebec City", residue: "blank wall and nail mark", fragment: "It waited for a picture and ended up holding a pressed leaf." },
  { title: "Plain ceramic spoon rest", objectType: "spoon rest", city: "Kansas City", residue: "soup steam and stove light", fragment: "It made weeknight cooking feel slightly less hurried." },
  { title: "Washed blue handkerchief", objectType: "handkerchief", city: "Glasgow", residue: "coat pocket and rain", fragment: "It was folded into quarters and carried more than used." },
  { title: "Small cork board pin", objectType: "brass pin", city: "Belfast", residue: "notes held and removed", fragment: "It held a calendar page long after the month passed." },
  { title: "White stoneware plate", objectType: "small plate", city: "Rome", residue: "toast crumbs and sink light", fragment: "It was the plate used when breakfast stayed simple." },
  { title: "Soft gray throw edge", objectType: "small throw", city: "Halifax", residue: "sofa evenings and folded wool", fragment: "It stayed at the arm of a chair through a quiet winter." },
  { title: "Bamboo tea scoop", objectType: "tea scoop", city: "Fukuoka", residue: "tea dust and careful hands", fragment: "It measured leaves for one person at a small table." },
  { title: "Small ceramic tile", objectType: "loose tile", city: "Valencia", residue: "window sill and blue glaze", fragment: "It became a place for a ring beside the sink." },
  { title: "Tin pencil sharpener", objectType: "sharpener", city: "Manchester", residue: "wood shavings and desk edge", fragment: "It was kept because it made one clean sound." },
  { title: "Cream cotton runner", objectType: "table runner", city: "Marseille", residue: "long table and daylight", fragment: "It crossed a table that was used for meals and paperwork." },
  { title: "Small clay bowl", objectType: "clay bowl", city: "Tucson", residue: "dry air and bedside coins", fragment: "It held loose change until the coins became less important." },
  { title: "Pocket notebook band", objectType: "elastic band", city: "Philadelphia", residue: "paper pressure and bag dust", fragment: "It kept a notebook closed through a year of errands." },
  { title: "White glass bud cup", objectType: "bud cup", city: "Christchurch", residue: "one stem and cloudy glass", fragment: "It held short flowers that would not fit anywhere else." },
  { title: "Small towel ring", objectType: "metal ring", city: "Antwerp", residue: "bathroom steam and chrome", fragment: "It came from a room being changed slowly." },
  { title: "Woven tea coaster", objectType: "tea coaster", city: "Shanghai", residue: "warm cup and bamboo weave", fragment: "It stayed under evening tea beside a laptop that was finally closed." },
  { title: "Plain storage label", objectType: "paper label", city: "Cleveland", residue: "box dust and neat handwriting", fragment: "It marked a box of things that were eventually sorted." },
  { title: "Small clay incense foot", objectType: "incense foot", city: "Singapore", residue: "ash touch and balcony air", fragment: "It was used on a balcony when the day needed to slow down." },
  { title: "Washed cotton book cloth", objectType: "book cloth", city: "Utrecht", residue: "shelf shade and soft cover", fragment: "It wrapped a book during travel, then stayed on the shelf." },
  { title: "Clear glass salt cellar", objectType: "salt cellar", city: "Cape Town", residue: "table salt and late lunch", fragment: "It sat between two chairs at a table near the back door." },
] as const;

const expandedObjectTypes = [
  "folded paper",
  "worn tea bowl",
  "cotton scarf",
  "ceramic cup",
  "old notebook",
  "unfinished letter",
  "linen cloth",
  "shelf object",
  "wooden tray",
  "small glass",
  "desk stone",
  "paper sleeve",
] as const;

const expandedCities = [
  "Portland",
  "Lisbon",
  "Kyoto",
  "Toronto",
  "Chicago",
  "Vancouver",
  "Copenhagen",
  "Melbourne",
  "Brooklyn",
  "Seattle",
  "Bath",
  "Berlin",
  "Dublin",
  "Seoul",
  "Helsinki",
  "Prague",
  "Amsterdam",
  "Austin",
  "New York",
  "Madrid",
] as const;

const expandedResidues = [
  "window light and small dust",
  "tea warmth and a slow table",
  "fold lines from a quiet drawer",
  "rain air near the door",
  "paper shade and evening lamp",
  "washed cotton and ordinary use",
  "cool ceramic after breakfast",
  "shelf shadow and hand marks",
  "soft wood near a doorway",
  "desk light after a long day",
  "linen edge and kitchen air",
  "a little dust from staying put",
] as const;

const expandedFragments = [
  "It stayed where someone could reach it without thinking.",
  "It moved once, then settled into another room.",
  "It was kept because it remained useful in a small way.",
  "It waited near a window through an ordinary season.",
  "It held a place on the table after the room changed.",
  "It crossed one home quietly and did not ask for attention.",
  "It was wrapped, used, and put back without display.",
  "It stayed close to daily life, which was enough.",
  "It passed from one shelf to another with a plain note.",
  "It remained after a move because no one wanted to throw it away.",
  "It carried a little room air and nothing more dramatic.",
  "It was released before it became too important.",
] as const;

const expandedPreviousNotes = [
  "Released during a small room clearing.",
  "Left by someone who kept only what still fit.",
  "Passed on after a quiet move.",
  "Kept for a season, then folded away.",
  "Released because another room could use it.",
  "Sent along with no announcement.",
] as const;

function buildAdditionalPassingSeeds(count: number): PassingSeed[] {
  return Array.from({ length: count }, (_, index) => {
    const type = expandedObjectTypes[index % expandedObjectTypes.length];
    const city = expandedCities[(index * 3) % expandedCities.length];
    const residue = expandedResidues[(index * 5) % expandedResidues.length];
    const fragment = expandedFragments[(index * 7) % expandedFragments.length];
    const titleWord = ["pale", "quiet", "small", "worn", "folded", "plain", "soft", "old"][(index * 2) % 8];

    return {
      title: `${titleWord} ${type} ${String(index + 1).padStart(3, "0")}`,
      objectType: type,
      city,
      residue,
      fragment,
      previous: index % 3 === 0 ? expandedPreviousNotes[index % expandedPreviousNotes.length] : undefined,
    };
  });
}

const passingSeeds: readonly PassingSeed[] = [...basePassingSeeds, ...buildAdditionalPassingSeeds(360)];

const passingStatuses: readonly WindkeepPassingStatus[] = ["resting", "ready to pass", "being considered", "recently received"];
const timeMarks = ["kept through winter", "two quiet rooms", "one long spring", "since last summer", "after a small move", "a few ordinary years"] as const;

export const windkeepPassingObjects: readonly WindkeepPassingObject[] = passingSeeds.map((seed, index) => ({
  id: `passing-${String(index + 1).padStart(2, "0")}`,
  title: seed.title,
  objectType: seed.objectType,
  city: seed.city,
  emotionalResidue: seed.residue,
  passingStatus: passingStatuses[index % passingStatuses.length],
  storyFragment: seed.fragment,
  timeMark: timeMarks[index % timeMarks.length],
  previousHolderNote: seed.previous,
  image: {
    src: `/objects-derived/${objectImageNames[index % objectImageNames.length]}-placement.webp`,
    alt: `${seed.title}, ${seed.objectType}`,
  },
}));

const releaseReasons = [
  "The shelf became smaller after a move.",
  "Someone kept the memory and let the object go.",
  "It was useful for a season, then ready for another room.",
  "The room changed, but the object still felt gentle.",
  "It had done its quiet work in one home.",
  "The previous holder wanted it to keep being used.",
] as const;

const receivingNotes = [
  "Receive only if it can stay ordinary near you.",
  "A short note is enough; no performance is needed.",
  "Let it arrive without turning it into a prize.",
  "It belongs best where it can be used slowly.",
  "If it fits your room, write plainly.",
  "The object can wait until the right person appears.",
] as const;

export const quietReceivingObjects: readonly QuietReceivingObject[] = windkeepPassingObjects.slice(0, 144).map((object, index) => ({
  ...object,
  passingStatus: index % 3 === 0 ? "ready to pass" : object.passingStatus,
  releaseReason: releaseReasons[index % releaseReasons.length],
  emotionalContext: index % 4 === 0 ? "The previous room was tended carefully, then gently cleared." : undefined,
  receivingNote: receivingNotes[index % receivingNotes.length],
  acceptanceFlow: ["Notice the object", "Write one plain reason", "Wait for a human reply"],
}));

export const windkeepObjects = windkeepPassingObjects.map((object) => ({
  object: {
    id: object.id,
    title: object.title,
    media: {
      placement: object.image.src,
      alt: object.image.alt,
    },
  },
  memory: {
    passingTime: object.timeMark,
    cities: [object.city],
    shortStory: object.storyFragment,
  },
}));

export const windkeepArrivalLines = [
  "Things rest here before moving on.",
  "Passing is slow, human, and unannounced.",
  "The object remains ordinary enough to belong.",
] as const;
