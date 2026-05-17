"use client";

import { useState } from "react";

type SeekerTab = "Home" | "Upload" | "Orders" | "Messages" | "Me";
type DraftState = {
  title: string;
  price: string;
  region: string;
  condition: string;
  story: string;
  unique: boolean;
};

const tabs: SeekerTab[] = ["Home", "Upload", "Orders", "Messages", "Me"];
const draftDefaults: DraftState = {
  title: "",
  price: "",
  region: "",
  condition: "Good",
  story: "",
  unique: true,
};

function RuntimeLabel({ children }: Readonly<{ children: string }>) {
  return <span className="block text-[1.02rem] font-semibold leading-tight">{children}</span>;
}

export function WindSeekerRuntime() {
  const [activeTab, setActiveTab] = useState<SeekerTab>("Home");
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<DraftState>(draftDefaults);
  const [files, setFiles] = useState<string[]>([]);
  const [aiReady, setAiReady] = useState(false);
  const [log, setLog] = useState("Ready to discover an object.");

  function runAiGeneration() {
    setDraft({
      title: draft.title || "Quiet object found in soft light",
      price: draft.price || "68",
      region: draft.region || "Local region",
      condition: draft.condition || "Good",
      story: draft.story || "Found during an ordinary day, waiting for the right next keeper.",
      unique: draft.unique,
    });
    setAiReady(true);
    setStep(3);
    setLog("AI generated title, description, emotional language, SEO / GEO, tags, and suggested price.");
  }

  function publishDraft() {
    setStep(5);
    setLog("Submitted to AI first review and human approval. Product page, share image, and short video material are reserved.");
  }

  return (
    <main className="min-h-dvh bg-[#F0F2F5] text-[#2C323C]">
      <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-24 pt-5">
        <header className="rounded-[28px] border border-[#D7DCE3] bg-[#E8EBF0] p-5 shadow-[0_18px_50px_rgba(44,50,60,0.08)]">
          <p className="text-sm text-[#646E7A]">Global Object Discovery Network</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.01em] text-[#2C323C]">Wind Seeker</h1>
          <p className="mt-3 text-sm leading-6 text-[#646E7A]">
            Discover, photograph, let AI prepare the listing, then submit for review in about three minutes.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-[#646E7A]">
            {["Photo", "AI", "Review"].map((item, index) => (
              <div key={item} className={`rounded-2xl border px-2 py-3 ${step > index ? "border-[#728278] bg-white text-[#2C323C]" : "border-[#D7DCE3] bg-[#F0F2F5]"}`}>
                <RuntimeLabel>{item}</RuntimeLabel>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-4 rounded-3xl border border-[#D7DCE3] bg-white p-4">
          {activeTab === "Home" ? (
            <div className="grid gap-3">
              <RuntimeTile title="Draft Runtime" text="Continue a quiet object draft." action={() => setActiveTab("Upload")} />
              <RuntimeTile title="Deposit Runtime" text="Deposit hold, release, and refund state." />
              <RuntimeTile title="Settlement Runtime" text="Pending balance and payout status." />
              <RuntimeTile title="Keeper Trust Runtime" text="Trust level, deposit rule, and access state." />
              <RuntimeTile title="AML / KYC Runtime" text="Identity review, risk country, and sanctions precheck." />
              <RuntimeTile title="Risk Runtime" text="Freeze, chargeback, dispute, and counterfeit enforcement." />
              <RuntimeTile title="Moderation Runtime" text="AI first review and human approval queue." />
              <RuntimeTile title="Notification Runtime" text="Review, order, message, and shipping notices." />
              <RuntimeTile title="Global Runtime" text="Language, currency, country limits, region limits, and sanctions rules." />
            </div>
          ) : null}

          {activeTab === "Upload" ? (
            <div className="grid gap-4">
              <label className="rounded-3xl border border-dashed border-[#D7DCE3] bg-[#F0F2F5] p-5 text-center">
                <span className="block text-lg font-semibold text-[#2C323C]">Photo / Video Upload</span>
                <span className="mt-2 block text-sm leading-6 text-[#646E7A]">
                  Multiple images, video, Safe Area, and AI clarity detection are reserved here.
                </span>
                <input
                  className="mt-4 block w-full text-sm text-[#646E7A] file:rounded-xl file:border file:border-[#D7DCE3] file:bg-white file:px-3 file:py-2 file:text-[#2C323C]"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(event) => {
                    const nextFiles = Array.from(event.target.files ?? []).map((file) => file.name);
                    setFiles(nextFiles);
                    setStep(2);
                    setLog(`${nextFiles.length} file(s) added. AI clarity detection ready.`);
                  }}
                />
              </label>

              {files.length > 0 ? (
                <div className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] p-3 text-sm text-[#646E7A]">
                  {files.map((file) => <p key={file}>{file}</p>)}
                </div>
              ) : null}

              <button type="button" onClick={runAiGeneration} className="rounded-2xl bg-[#8A7C6E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9D8F80]">
                <RuntimeLabel>Run AI Generation</RuntimeLabel>
              </button>

              <div className="grid gap-3">
                <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-sm outline-none" placeholder="AI title" />
                <input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-sm outline-none" placeholder="Price" />
                <input value={draft.region} onChange={(event) => setDraft({ ...draft, region: event.target.value })} className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-sm outline-none" placeholder="Region" />
                <select value={draft.condition} onChange={(event) => setDraft({ ...draft, condition: event.target.value })} className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-sm outline-none">
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Used with traces">Used with traces</option>
                </select>
                <textarea value={draft.story} onChange={(event) => setDraft({ ...draft, story: event.target.value })} className="min-h-28 rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-sm outline-none" placeholder="Object story" />
                <label className="flex items-center gap-3 text-sm text-[#646E7A]">
                  <input checked={draft.unique} onChange={(event) => setDraft({ ...draft, unique: event.target.checked })} type="checkbox" />
                  Unique object
                </label>
              </div>

              <button type="button" onClick={publishDraft} className="rounded-2xl bg-[#728278] px-4 py-3 text-sm font-semibold text-white">
                <RuntimeLabel>Submit for Review</RuntimeLabel>
              </button>
            </div>
          ) : null}

          {activeTab === "Orders" ? <SimpleList title="Orders" items={["Awaiting shipment", "Shipping Runtime", "After-Sales Runtime", "Refund Runtime", "Chargeback Runtime"]} /> : null}
          {activeTab === "Messages" ? <SimpleList title="Messages" items={["Review message", "Order question", "Dispute update", "Notification settings"]} /> : null}
          {activeTab === "Me" ? <SimpleList title="Me" items={["Account Runtime", "Keeper Trust", "AML / KYC", "Country restriction", "Settlement account", "Deposit status"]} /> : null}
        </div>

        <p className="mt-4 rounded-2xl border border-[#D7DCE3] bg-[#E8EBF0] p-4 text-sm leading-6 text-[#646E7A]">
          {aiReady ? "AI draft ready. " : ""}{log}
        </p>
      </section>

      <nav className="fixed inset-x-0 bottom-0 mx-auto grid max-w-md grid-cols-5 border-t border-[#D7DCE3] bg-[#F0F2F5]/95 px-2 py-2 backdrop-blur">
        {tabs.map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-2xl px-2 py-3 text-xs ${activeTab === tab ? "bg-[#E8EBF0] text-[#2C323C]" : "text-[#646E7A]"}`}>
            <RuntimeLabel>{tab}</RuntimeLabel>
          </button>
        ))}
      </nav>
    </main>
  );
}

function RuntimeTile({ title, text, action }: Readonly<{ title: string; text: string; action?: () => void }>) {
  return (
    <button type="button" onClick={action} className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] p-4 text-left">
      <RuntimeLabel>{title}</RuntimeLabel>
      <span className="mt-2 block text-sm leading-6 text-[#646E7A]">{text}</span>
    </button>
  );
}

function SimpleList({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#2C323C]">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <button key={item} type="button" className="rounded-2xl border border-[#D7DCE3] bg-[#F0F2F5] px-4 py-3 text-left text-sm text-[#646E7A]">
            <RuntimeLabel>{item}</RuntimeLabel>
          </button>
        ))}
      </div>
    </div>
  );
}
