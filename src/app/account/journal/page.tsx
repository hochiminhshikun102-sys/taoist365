import "./journal.css";

const A = "/dh/account/journal/assets/";

const products = [
  ["Member Pick","Blue Garden Porcelain Vase","$128.00"], ["Bestseller","Quiet Ember Scented Candle","$48.00"],
  ["New","Dohara Blue Tea Service","$156.00"], ["New","Linen Reflection Journal","$32.00"],
  ["Quiet Living","Clear Wind Incense Holder","$42.00"], ["Member Pick","Mist Blue Ceramic Bowl","$58.00"],
  ["Bestseller","Silk Rest Eye Mask","$36.00"], ["New","Soft Light Table Lamp","$118.00"],
  ["Bestseller","Botanical Air Diffuser","$54.00"], ["Quiet Living","Hand-thrown Morning Mug","$38.00"],
  ["Member Pick","Petal Jewelry Dish","$46.00"], ["New","Woven Calm Storage Basket","$72.00"],
  ["Member Pick","Wind Blue Table Clock","$86.00"], ["Bestseller","Blue Garden Porcelain Tray","$68.00"],
  ["Quiet Living","Cloud Weave Throw","$96.00"], ["New","Sculptural Bloom Vessel","$108.00"]
];

const Icon = ({name, alt=""}:{name:string;alt?:string}) => <img src={`${A}optical/${name}.png`} alt={alt}/>;
const Chevron = ({white=false}:{white?:boolean}) => <img className="chev" src={`${A}${white?"chevron-white":"chevron"}.png`} alt=""/>;

export default function JournalOverview() {
  return <main className="page" id="top" data-page-id="journal_overview">
    <header className="site-header" data-layer="header">
      <button className="mobile-menu" aria-label="Open account menu" data-control-id="header_menu"><img src={`${A}header-menu.png`} alt=""/></button>
      <img className="brand" src={`${A}header-logo.png`} alt="Dohara"/>
      <div className="header-tools">
        <button aria-label="Notifications" data-control-id="header_notifications"><img src={`${A}header-notification.png`} alt=""/><span>Notifications</span></button>
        <button aria-label="Support" data-control-id="header_support"><img src={`${A}header-support.png`} alt=""/><span>Support</span></button>
        <button className="profile" aria-label="Lena account menu" data-control-id="header_profile"><img src={`${A}header-avatar.png`} alt="Lena"/><span>Lena</span><i/></button>
      </div>
    </header>

    <section className="hero" data-layer="hero">
      <picture><source media="(max-width:600px)" srcSet={`${A}journal-hero-mobile.png`}/><img src={`${A}journal-hero-pc.png`} alt=""/></picture>
      <div className="hero-copy"><h1>My Journal</h1><b/><p>A quiet place to record, reflect, and keep<br className="pc-only"/> the moments that shape your journey.</p></div>
    </section>

    <section className="content" data-layer="content">
      <div className="summary-grid">
        {[
          ["blue","icon-draft","6","Drafts","Waiting for you"], ["lilac","icon-private","18","Private","Only visible to you"],
          ["gold","icon-review","2","Pending Review","Publication review"], ["green","icon-published","12","Published","Shared with care"]
        ].map((x,i)=><button key={x[3]} className={`summary ${i===0?"active":""}`} disabled aria-disabled="true" title="Journal Library is not ready" data-control-id={`summary_${i+1}`}>
          <span className={`icon-well ${x[0]}`}><Icon name={x[1]}/></span><div><strong>{x[2]}</strong><h3>{x[3]}</h3><p>{x[4]}</p></div><Chevron/>
        </button>)}
      </div>

      <section className="section continue-section">
        <div className="section-head"><div><small>RETURN TO YOUR THOUGHTS</small><h2>Continue Writing</h2></div><button className="secondary" disabled aria-disabled="true" title="Journal Editor is not ready"><Icon name="icon-write"/> Start a New Journal</button></div>
        <article className="draft-card">
          <div className="draft-scene"><img src={`${A}journal_draft_open_book.png`} alt="Open journal by blue flowers"/></div>
          <div className="draft-copy"><div className="eyebrows"><span>Text Journal</span><span className="private">Private</span></div><h3>Where the Morning Became Quiet</h3><p>I began with the sound of rain against the window, and the small blue cup waiting beside my journal...</p><div className="meta"><span><Icon name="icon-draft"/> Draft</span><span>Updated 18 minutes ago</span><span>No linked source</span></div></div>
          <button className="primary" disabled aria-disabled="true" title="Journal Editor is not ready">Continue Writing <Chevron white/></button>
        </article>
      </section>

      <section className="section recent-section">
        <div className="section-head"><div><small>YOUR RECENT MOMENTS</small><h2>Recent Journals</h2></div><button className="view-all" disabled aria-disabled="true">View All <Chevron/></button></div>
        <div className="journal-grid">
          <JournalCard image="journal_guidance_reflection.png" alt="A quiet linen journal" mark="icon-guidance" type="Guidance Reflection" title="A Question I Can Hold Gently" body="A private reflection linked to your recent Guidance session." tag="Private by default" source="Linked Guidance" date="May 22, 2025"/>
          <JournalCard image="journal_windkeep_story.png" alt="A blue ceramic bowl carrying an object memory" brand type="WindKeep Story" title="The Bowl That Continued On" body="A memory connected to an object and the story it carries forward." tag="Private" source="Linked Object" date="May 20, 2025"/>
          <JournalCard image="journal_video_reflection.png" alt="A luminous white deer scene from a saved video" mark="icon-video" type="Video Journal" title="Light Through the Blue Curtains" body="Your reflection on a short video saved from Creator Studio." tag="Published" source="Creator Media" date="May 18, 2025" state="published"/>
          <JournalCard image="journal_subscription_reflection.png" alt="A folded blue throw from a subscription reflection" mark="icon-locked" type="Subscription Journal" title="Seven Days of Quiet Practice" body="Your own notes remain safe. The linked source currently requires access." tag="Source Locked" source="Access required" date="May 14, 2025" state="locked" mobileHide/>
        </div>
      </section>

      <section className="section notes-section"><div className="section-head"><div><small>CAPTURE OR KEEP</small><h2>Notes &amp; Saved</h2></div></div><div className="wide-pair">
        <WideCard icon="icon-notes" title="Quick Notes" body="Small thoughts, excerpts and ideas that have not yet become a full journal." stat="9 notes · 2 updated today" action="Open My Notes"/>
        <WideCard icon="icon-saved" title="Saved Library" body="Prompts, inspiration and content you have permission to keep for later." stat="24 saved items · 3 new" action="View Saved Library"/>
      </div></section>

      <section className="section connected-section"><div className="section-head"><div><small>CONNECTED TO YOUR JOURNEY</small><h2>Connected Journey</h2><p>Reflections linked from your DOHARA experiences. Original actions stay in their own spaces.</p></div></div><div className="connected-grid">
        <Connected icon="icon-guidance" title="Guidance Reflections" stat="5 linked records" note="Private by default"/>
        <Connected brand title="WindKeep Stories" stat="3 linked records" note="Stories and object memories"/>
        <Connected icon="icon-video" title="Creator Media" stat="7 linked records" note="Videos and live reflections"/>
        <Connected icon="icon-subscription" title="Subscription Reflections" stat="4 linked records" note="Access check required"/>
      </div></section>

      <section className="section archive-section"><article className="archive-card"><span><Icon name="icon-archive"/></span><div><small>YOUR QUIET ARCHIVE</small><h2>Archived Journals</h2><p>Past journals remain yours to revisit or restore whenever you are ready.</p></div><div className="archive-count"><strong>14</strong><small>Last archived May 4, 2025</small></div><button disabled aria-disabled="true">View Archive <Chevron/></button></article></section>

      <section className="compact-help"><div className="help-title"><span/><div><small>NEED ASSISTANCE?</small><h2>Journal Help</h2></div><span/></div><div className="help-grid">
        <Help icon="icon-private" title="Journal Privacy" body="Understand who can see your writing."/>
        <Help icon="icon-review" title="Publishing & Review" body="Learn how public journals are reviewed."/>
        <Help icon="icon-link" title="Source & Permissions" body="See how linked content and access work."/>
        <Help support title="Help & Support" body="Get help with your journal or account."/>
      </div></section>
    </section>

    <section data-layer="end">
    <section className="recommendations"><header><small>SELECTED FOR YOUR JOURNEY</small><h2>Recommended for You</h2><p>Quiet objects chosen to accompany moments of writing, reflection and rest.</p><a href="/objects">Explore All Products <Chevron/></a></header><div className="product-grid">
      {products.map((p,i)=><article className="product-card" key={p[1]}><div className="product-image"><img src={`${A}products/product_${String(i+1).padStart(2,"0")}.png`} alt={p[1]}/><span>{p[0]}</span><button disabled aria-label={`Save ${p[1]}`} title="Saved Objects action is not ready">♡</button></div><div className="product-copy"><h3>{p[1]}</h3><b>{p[2]}</b><small>Free delivery on eligible orders</small></div></article>)}
    </div><div className="more-products"><a href="/objects">View More Products <Chevron/></a><small>More recommendations are available in Objects.</small></div></section>

    <footer className="footer"><nav><span>Help & Support</span><span>Shipping & Returns</span><span>Privacy & Security</span><span>Policies & Guidelines</span></nav><div><span>Terms</span><i/><span>Privacy</span><i/><span>Accessibility</span><i/><span>Sitemap</span><small>© 2026 DOHARA. All rights reserved.</small><a href="#top">Back to top</a></div></footer>
    </section>
  </main>;
}

function JournalCard(p:{image:string;alt:string;mark?:string;brand?:boolean;type:string;title:string;body:string;tag:string;source:string;date:string;state?:string;mobileHide?:boolean}) {
  return <article className={`journal-card ${p.mobileHide?"mobile-hide":""}`}><div className="journal-art"><img src={`${A}${p.image}`} alt={p.alt}/><span className={`type-mark ${p.brand?"brand-mark":""}`}>{p.brand?<img src={`${A}optical/brand-windkeep.png`} alt="WindKeep"/>:<Icon name={p.mark!}/>}</span></div><div className="card-copy"><span className="type">{p.type}</span><h3>{p.title}</h3><p>{p.body}</p><div className="tags"><b className={p.state}>{p.tag}</b><em>{p.source}</em></div><small>Updated {p.date}</small></div></article>;
}
function WideCard(p:{icon:string;title:string;body:string;stat:string;action:string}) { return <article className="wide-card"><span className="large-icon"><Icon name={p.icon}/></span><div><h3>{p.title}</h3><p>{p.body}</p><b>{p.stat}</b></div><button disabled aria-disabled="true">{p.action} <Chevron/></button></article>; }
function Connected(p:{icon?:string;brand?:boolean;title:string;stat:string;note:string}) { return <article><span>{p.brand?<img src={`${A}optical/brand-windkeep.png`} alt="WindKeep"/>:<Icon name={p.icon!}/>}</span><h3>{p.title}</h3><strong>{p.stat}</strong><p>{p.note}</p><button disabled aria-disabled="true">View Source <Chevron/></button></article>; }
function Help(p:{icon?:string;support?:boolean;title:string;body:string}) { return <article>{p.support?<img src={`${A}header-support.png`} alt=""/>:<Icon name={p.icon!}/>}<div><h3>{p.title}</h3><p>{p.body}</p></div><Chevron/></article>; }
