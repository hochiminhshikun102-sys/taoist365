"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type RuntimeStep = "Discover" | "Capture" | "Air" | "Story" | "Preview" | "Listing" | "Windkeep";

type FoundObject = {
  name: string;
  place: string;
  material: string;
  story: string;
};

const steps: RuntimeStep[] = ["Discover", "Capture", "Air", "Story", "Preview", "Listing", "Windkeep"];

const discoveryFragments = [
  {
    place: "Lisbon, morning market",
    object: "A small linen tray",
    line: "The edge is a little uneven, like someone used it without thinking.",
  },
  {
    place: "Copenhagen, side street",
    object: "Blue-grey ceramic cup",
    line: "Quiet weight, not decorative. It would rather stay near a window.",
  },
  {
    place: "Kyoto, second shelf",
    object: "Paper lamp shade",
    line: "Thin light passes through it softly. Nothing asks to be announced.",
  },
];

const atmosphericPreview = [
  "On a pale table after breakfast.",
  "Beside an open browser, while the room is still bright.",
  "Near folded linen, with a little air around it.",
];

const defaultObject: FoundObject = {
  name: "Quiet object found in soft light",
  place: "Local morning market",
  material: "Linen, ceramic, or wood",
  story: "It looked useful before it looked special. Maybe that is why it stayed in mind.",
};

function currentStepIndex(step: RuntimeStep) {
  return steps.indexOf(step);
}

export function WindSeekerRuntime() {
  const [activeStep, setActiveStep] = useState<RuntimeStep>("Discover");
  const [files, setFiles] = useState<string[]>([]);
  const [object, setObject] = useState<FoundObject>(defaultObject);
  const [airReady, setAirReady] = useState(false);

  const activeIndex = currentStepIndex(activeStep);

  const livingLog = useMemo(() => {
    if (activeStep === "Discover") return "Walk slowly. Notice the object before deciding what it is.";
    if (activeStep === "Capture") return files.length ? `${files.length} file(s) resting in the capture room.` : "Photos can enter here without becoming a product yet.";
    if (activeStep === "Air") return airReady ? "Air processing softened the language and kept the useful facts." : "AI waits for the object to arrive first.";
    if (activeStep === "Story") return "The story should sound like something left on a table, not a campaign.";
    if (activeStep === "Preview") return "Preview the object inside lived light before it enters circulation.";
    if (activeStep === "Listing") return "A light listing can exist without pushing the room into commerce.";
    return "Windkeep can hold the object after use, with memory still attached.";
  }, [activeStep, airReady, files.length]);

  function runAirProcessing() {
    setObject({
      name: object.name || defaultObject.name,
      place: object.place || defaultObject.place,
      material: object.material || defaultObject.material,
      story: object.story || defaultObject.story,
    });
    setAirReady(true);
    setActiveStep("Story");
  }

  return (
    <main className="ri-global-buyer-room min-h-dvh overflow-hidden text-[#24313a]">
      <div className="ri-runtime-depth pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="ri-runtime-depth__far" />
        <span className="ri-runtime-depth__mid" />
        <span className="ri-runtime-depth__front" />
      </div>

      <section className="relative mx-auto grid min-h-dvh w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-12">
        <aside className="relative z-10 flex flex-col justify-between gap-8">
          <div>
            <p className="text-sm text-[#6f7f88]">Global Buyer Living Runtime</p>
            <h1 className="mt-5 max-w-md text-5xl leading-[0.98] text-[#1f3444] sm:text-6xl">
              Discovering world objects without turning the room loud.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-8 text-[#61727d]">
              A browser space for finding, photographing, preparing, previewing, and gently routing good objects into Dohara.
            </p>
          </div>

          <div className="grid gap-2">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(step)}
                className={`quiet-air-touch grid grid-cols-[2rem_1fr] items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm ${
                  activeStep === step
                    ? "border-[#a9c9d8] bg-white/78 text-[#203848] shadow-[0_18px_54px_rgba(50,83,101,0.08)]"
                    : "border-white/64 bg-white/38 text-[#6a7b85] hover:bg-white/62"
                }`}
              >
                <span className="font-[var(--font-display-serif)] text-xl text-[#527487]">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="relative z-10 grid content-start gap-5">
          <section className="ri-air-worktable relative overflow-hidden rounded-[1.4rem] border border-white/72 bg-white/56 p-5 shadow-[0_28px_90px_rgba(47,75,90,0.11)] sm:p-7">
            <div className="relative z-10 grid gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[#71818a]">Living discovery path</p>
                <p className="text-sm text-[#61727d]">{activeIndex + 1} / {steps.length}</p>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-[#dcecf2]">
                <div className="h-full rounded-full bg-[#8bb5c8] transition-all duration-700" style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }} />
              </div>

              {activeStep === "Discover" ? <DiscoverRoom onSelect={(place, name, story) => setObject({ ...object, place, name, story })} /> : null}
              {activeStep === "Capture" ? <CaptureRoom files={files} setFiles={setFiles} /> : null}
              {activeStep === "Air" ? <AirProcessingRoom onRun={runAirProcessing} airReady={airReady} /> : null}
              {activeStep === "Story" ? <StoryRoom object={object} setObject={setObject} /> : null}
              {activeStep === "Preview" ? <PreviewRoom object={object} /> : null}
              {activeStep === "Listing" ? <ListingRoom object={object} /> : null}
              {activeStep === "Windkeep" ? <WindkeepRoutingRoom object={object} /> : null}
            </div>
          </section>

          <p className="rounded-lg border border-white/70 bg-white/42 px-5 py-4 text-sm leading-7 text-[#61727d] shadow-[0_16px_52px_rgba(47,75,90,0.06)]">
            {livingLog}
          </p>
        </div>
      </section>
    </main>
  );
}

function DiscoverRoom({ onSelect }: Readonly<{ onSelect: (place: string, name: string, story: string) => void }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Discover</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        Start from atmosphere, place, and usefulness. The object is allowed to stay ordinary.
      </p>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {discoveryFragments.map((fragment) => (
          <button
            key={fragment.object}
            type="button"
            onClick={() => onSelect(fragment.place, fragment.object, fragment.line)}
            className="quiet-air-touch min-h-48 rounded-lg border border-[#d7e7ee]/70 bg-white/58 p-4 text-left hover:bg-white/78"
          >
            <p className="text-xs text-[#7a8990]">{fragment.place}</p>
            <h3 className="mt-4 text-2xl leading-tight text-[#203848]">{fragment.object}</h3>
            <p className="mt-5 text-sm leading-7 text-[#61727d]">{fragment.line}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function CaptureRoom({ files, setFiles }: Readonly<{ files: string[]; setFiles: (files: string[]) => void }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Capture</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        Upload photographs as room evidence: light, scale, surface, use, and the small traces that help a person understand it.
      </p>
      <label className="mt-7 grid min-h-64 place-items-center rounded-[1.2rem] border border-dashed border-[#a9c9d8] bg-[#f8fbfb]/72 p-6 text-center">
        <span className="text-2xl font-[var(--font-display-serif)] text-[#203848]">Let the object enter softly.</span>
        <span className="mt-3 max-w-md text-sm leading-7 text-[#61727d]">Photos and short videos can rest here before any listing language is made.</span>
        <input
          className="mt-6 block w-full max-w-sm text-sm text-[#61727d] file:rounded-lg file:border file:border-[#c8dce4] file:bg-white/82 file:px-4 file:py-2 file:text-[#203848]"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []).map((file) => file.name))}
        />
      </label>
      {files.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {files.map((file) => (
            <span key={file} className="rounded-full border border-[#d7e7ee] bg-white/60 px-3 py-2 text-xs text-[#61727d]">{file}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AirProcessingRoom({ onRun, airReady }: Readonly<{ onRun: () => void; airReady: boolean }>) {
  const checks = ["Surface clarity", "Room light", "Useful facts", "Human wording", "Object memory"];

  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">AI Air Processing</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        AI prepares language without making the object louder than the room. Facts stay clear. Mood stays light.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-5">
        {checks.map((check) => (
          <div key={check} className="rounded-lg border border-[#d7e7ee]/72 bg-white/54 p-4">
            <p className="text-sm leading-6 text-[#61727d]">{check}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={onRun} className="quiet-air-touch mt-7 rounded-lg bg-[#54788b] px-5 py-3 text-sm text-white hover:bg-[#466b7d]">
        {airReady ? "Run again gently" : "Prepare the object"}
      </button>
    </div>
  );
}

function StoryRoom({ object, setObject }: Readonly<{ object: FoundObject; setObject: (object: FoundObject) => void }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Object Story</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        Keep it plain. A good object story sounds close to life, not like persuasion.
      </p>
      <div className="mt-7 grid gap-4">
        <input value={object.name} onChange={(event) => setObject({ ...object, name: event.target.value })} className="rounded-lg border border-[#c8dce4] bg-white/64 px-4 py-3 text-sm outline-none" placeholder="Object name" />
        <input value={object.place} onChange={(event) => setObject({ ...object, place: event.target.value })} className="rounded-lg border border-[#c8dce4] bg-white/64 px-4 py-3 text-sm outline-none" placeholder="Where it was found" />
        <input value={object.material} onChange={(event) => setObject({ ...object, material: event.target.value })} className="rounded-lg border border-[#c8dce4] bg-white/64 px-4 py-3 text-sm outline-none" placeholder="Material / surface" />
        <textarea value={object.story} onChange={(event) => setObject({ ...object, story: event.target.value })} className="min-h-32 rounded-lg border border-[#c8dce4] bg-white/64 px-4 py-3 text-sm leading-7 outline-none" placeholder="Small object story" />
      </div>
    </div>
  );
}

function PreviewRoom({ object }: Readonly<{ object: FoundObject }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Atmosphere Preview</h2>
      <div className="mt-7 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="relative min-h-80 overflow-hidden rounded-[1.2rem] border border-white/72 bg-[#f8fbfb]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_14%,rgba(255,255,255,0.98),transparent_52%),linear-gradient(135deg,rgba(221,235,242,0.58),rgba(255,253,249,0.9)_54%,rgba(238,231,219,0.58))]" />
          <div className="absolute bottom-10 left-10 h-24 w-44 rounded-[50%] bg-[#d9c8ad]/36 blur-2xl" />
          <div className="absolute left-[23%] top-[31%] h-28 w-28 rounded-full border border-[#cfdee6] bg-white/72 shadow-[0_28px_70px_rgba(47,75,90,0.13)]" />
          <div className="absolute left-[39%] top-[42%] h-2 w-44 rounded-full bg-[#8bb5c8]/35" />
        </div>
        <div className="grid content-center gap-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[#71818a]">{object.place}</p>
          <h3 className="text-3xl leading-tight text-[#203848]">{object.name}</h3>
          <p className="text-sm leading-8 text-[#61727d]">{object.story}</p>
          {atmosphericPreview.map((line) => (
            <p key={line} className="border-t border-[#d7e7ee] pt-3 text-sm leading-7 text-[#61727d]">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListingRoom({ object }: Readonly<{ object: FoundObject }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Listing</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        A light listing gives enough information, leaves enough space, and avoids urgency.
      </p>
      <div className="mt-7 rounded-[1.2rem] border border-[#d7e7ee]/72 bg-white/58 p-5">
        <p className="text-xs text-[#71818a]">Ready for quiet review</p>
        <h3 className="mt-3 text-3xl leading-tight text-[#203848]">{object.name}</h3>
        <p className="mt-4 text-sm leading-7 text-[#61727d]">{object.material}</p>
        <p className="mt-4 max-w-xl text-sm leading-8 text-[#61727d]">{object.story}</p>
      </div>
    </div>
  );
}

function WindkeepRoutingRoom({ object }: Readonly<{ object: FoundObject }>) {
  return (
    <div>
      <h2 className="text-3xl leading-tight text-[#203848]">Windkeep Routing</h2>
      <p className="mt-3 max-w-2xl text-sm leading-8 text-[#61727d]">
        After use, the object can keep its memory and move through Windkeep without becoming a hard sell.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Link href="/windkeep" className="quiet-air-touch rounded-lg border border-[#d7e7ee]/72 bg-white/58 p-5 hover:bg-white/78">
          <p className="text-xs text-[#71818a]">Windkeep</p>
          <h3 className="mt-3 text-2xl leading-tight text-[#203848]">Let it continue later.</h3>
          <p className="mt-4 text-sm leading-7 text-[#61727d]">{object.name} can keep its object memory.</p>
        </Link>
        <Link href="/quiet-receiving" className="quiet-air-touch rounded-lg border border-[#d7e7ee]/72 bg-white/58 p-5 hover:bg-white/78">
          <p className="text-xs text-[#71818a]">Quiet Receiving</p>
          <h3 className="mt-3 text-2xl leading-tight text-[#203848]">A smaller handoff room.</h3>
          <p className="mt-4 text-sm leading-7 text-[#61727d]">For objects that should wait near someone, not chase attention.</p>
        </Link>
      </div>
    </div>
  );
}
