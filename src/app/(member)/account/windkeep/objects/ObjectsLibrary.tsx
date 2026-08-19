"use client";

import { useMemo, useState } from "react";
import { windKeepCapability, windKeepObjects, windKeepPolicyBindings, windKeepReadiness, windKeepRoutes, type WindKeepObjectStatus } from "./fixtures";

const statuses: Array<"All" | WindKeepObjectStatus> = ["All", "Draft", "Under Review", "Published", "In Transfer", "Archived"];
const sources = ["All Sources", "DOHARA Curated", "User Submitted"] as const;

export default function ObjectsLibrary() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [source, setSource] = useState<(typeof sources)[number]>("All Sources");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => windKeepObjects.filter((object) =>
    (status === "All" || object.status === status) &&
    (source === "All Sources" || object.source === source) &&
    object.title.toLowerCase().includes(query.trim().toLowerCase())), [query, source, status]);

  return <div className="wk-library">
    <header className="wk-lib-head"><div className="wk-desktop-brand"><img src="/assets/header_dohara_wordmark_only.png" alt="Dohara"/></div><nav className="wk-desktop-tools" aria-label="Account tools"><span><img src="/icons/notification.png" alt=""/>Notifications</span><span><img src="/icons/support.png" alt=""/>Support</span><span><img className="wk-avatar" src="/assets/header_avatar_lena.png" alt=""/>Hi, Lena</span></nav><div className="wk-mobile-tools"><img src="/icons/menu.png" alt="Menu"/><img className="wk-mobile-brand" src="/assets/header_dohara_wordmark_only.png" alt="Dohara"/><span><img src="/icons/notification.png" alt="Notifications"/><img src="/icons/support.png" alt="Support"/><img className="wk-avatar" src="/assets/header_avatar_lena.png" alt=""/></span></div></header>
    <section className="wk-lib-hero"><a className="wk-back" href={windKeepRoutes.overview}>← My WindKeep</a><small>MY WINDKEEP · OBJECT LIBRARY</small><h1>My Objects</h1><p>Objects you own, submitted, saved, received, or currently protect through WindKeep—never the full public curated catalogue.</p></section>
    <main className="wk-lib-main">
      <section className="wk-notice"><strong>Protected within your country</strong><p>Eligibility uses <code>user_country</code>. The United States shown below is fixture data until the account API is available.</p></section>
      <section className="wk-controls" aria-label="Object filters">
        <div className="wk-tabs">{statuses.map(item=><button key={item} aria-pressed={status===item} onClick={()=>setStatus(item)}>{item}</button>)}</div>
        <div className="wk-filters">{sources.map(item=><button key={item} aria-pressed={source===item} onClick={()=>setSource(item)}>{item}</button>)}</div>
        <div className="wk-search"><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search your WindKeep objects" aria-label="Search objects"/><button onClick={()=>{setStatus("All");setSource("All Sources");setQuery("")}}>Clear filters</button></div>
      </section>
      <div className="wk-toolbar"><div><h2>{visible.length} objects</h2><p>Review status, visibility, country, story and the next safe action.</p></div><button className="wk-primary" disabled={!windKeepReadiness.objectNew} title="Object submission route is not available yet">Submit an Object</button></div>
      {visible.length ? <section className="wk-grid">{visible.map(object=><article className="wk-card" key={object.id}>
        <img src={object.image} alt=""/><div className="wk-card-body"><div className="wk-card-top"><span className="wk-pill">{object.source}</span><span className={`wk-pill ${object.status==="Published"?"live":"review"}`}>{object.status}</span></div><h3>{object.title}</h3><small>{object.relation} · {object.path}</small><dl><div><dt>Story</dt><dd>{object.story}</dd></div><div><dt>Visibility</dt><dd>{object.visibility}</dd></div><div><dt>Country</dt><dd>{object.country}</dd></div><div><dt>Review</dt><dd>{object.review}</dd></div><div><dt>Journal</dt><dd>{object.journalNotes} notes</dd></div></dl><footer><div><small>NEXT</small><strong>{object.nextAction}</strong></div><button disabled title="Object detail route is not available yet">Manage</button></footer></div>
      </article>)}</section>:<div className="wk-empty"><h3>No objects match these filters</h3><p>Clear one or more filters to return to your library.</p></div>}
      <section className="wk-contract"><strong>Service readiness</strong><code>Object list API: {windKeepCapability.objectListApi} · OA review: {windKeepCapability.oaReviewWorkspace} · Policy: {windKeepPolicyBindings.objectSubmission.policyKey} / {windKeepPolicyBindings.objectSubmission.policyVersion}</code></section>
    </main><footer className="wk-footer">© 2026 DOHARA · WindKeep objects require review before publication.</footer>
  </div>;
}
