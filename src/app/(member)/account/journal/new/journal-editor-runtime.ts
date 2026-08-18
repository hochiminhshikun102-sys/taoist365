// @ts-nocheck
const API={save:'/api/account/journals',update:id=>'/api/account/journals/'+id,submit:id=>'/api/account/journals/'+id+'/submit',sources:'/api/account/journal-sources',upload:'/api/account/journal-media'};
const ready={save:false,update:false,submit:false,sources:false,upload:false};
export function bindJournalEditor(root,options={}){
 const mode=options.mode==='edit'?'edit':'new'; const journalId=typeof options.journalId==='string'?options.journalId:null;
 if(!root)return()=>{}; const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
 const toast=m=>{const el=document.querySelector('[data-toast]');if(!el)return;el.textContent=m;el.hidden=false;clearTimeout(el._t);el._t=setTimeout(()=>el.hidden=true,2600)};
 const open=(title,body)=>{const wrap=document.querySelector('[data-overlay]');if(!wrap)return;wrap.querySelector('[data-overlay-title]').textContent=title;wrap.querySelector('[data-overlay-body]').innerHTML=body;wrap.hidden=false};
 document.querySelector('[data-overlay-close]')?.addEventListener('click',()=>document.querySelector('[data-overlay]').hidden=true);
 qa('.type-card').forEach((b,i)=>b.addEventListener('click',()=>{qa('.type-card').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast('Format changed to '+["Text Journal","Video Journal","Live Reflection","Guidance Reflection","WindKeep Story","Object Experience","Subscription Journal"][i])}));
 qa('[data-control-group="visibility"] input').forEach(r=>r.addEventListener('change',()=>{qa('.choice').forEach(x=>x.classList.toggle('selected',x.contains(r)));const value=r.parentElement.querySelector('b').textContent;if(value==='Public')open('Public review required','<p>Public journals enter review before publication. Guidance reflections also require extra confirmation.</p>')}));
 qa('[data-control-group="source-binding"] button').forEach(b=>b.addEventListener('click',()=>open('Choose a source','<p>Source lookup is waiting for the approved account source API. No route or result is fabricated.</p><p><strong>Status:</strong> DISABLED_UNTIL_READY</p>')));
 q('[data-action="save-draft"]')?.addEventListener('click',()=>{
  if(mode==='edit')return toast(ready.update?'Changes saved':'Changes kept locally. Production update API is not ready.');
  toast(ready.save?'Draft saved':'Draft kept locally. Production save API is not ready.');
 });
 q('[data-action="preview"]')?.addEventListener('click',()=>open('Journal Preview','<h3>'+q('#journal-title').value+'</h3><p>Your preview uses the current private draft. No public publication occurs.</p>'));
 q('[data-action="submit-review"]')?.addEventListener('click',()=>{const checks=qa('.policy-panel input[type=checkbox]');if(checks.some(x=>!x.checked))return toast('Confirm both policy items first.');open('Submit for review','<p>The review endpoint is not available. Your draft remains private and has not been submitted.</p>')});
 q('[data-action="journal-policy"]')?.addEventListener('click',()=>open('Journal Policies','<p>The formal Journal Policy Center route is not available yet. The locked policy rules in this package remain enforced.</p>'));
 qa('.help-action').forEach((b,i)=>b.addEventListener('click',()=>open(['Writing Guidance','Privacy & Sharing','Source Bindings','Journal Policies'][i],'<p>This help destination is waiting for its approved route. No placeholder page has been created.</p>')));
 q('[data-action="add-cover"]')?.addEventListener('click',()=>q('[data-control-id="cover-file"]')?.click());
 let coverObjectUrl=''; const cover=q('.cover-preview'); const defaultCover="url('/dh/account/journal/editor/media/journal_cover_default.png')";
 q('[data-control-id="cover-file"]')?.addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;if(!['image/jpeg','image/png'].includes(f.type)||f.size>10*1024*1024){e.target.value='';return toast('Use JPG or PNG up to 10 MB.')}if(coverObjectUrl)URL.revokeObjectURL(coverObjectUrl);coverObjectUrl=URL.createObjectURL(f);if(cover)cover.style.backgroundImage="url('"+coverObjectUrl+"')";toast('Cover selected for this draft.')});
 q('[data-action="remove-cover"]')?.addEventListener('click',()=>{const f=q('[data-control-id="cover-file"]');if(f)f.value='';if(coverObjectUrl){URL.revokeObjectURL(coverObjectUrl);coverObjectUrl=''}if(cover)cover.style.backgroundImage=defaultCover;toast('Cover removed from this draft.')});
 qa('.product-image button').forEach(b=>b.addEventListener('click',()=>toast('Saved Objects API is not ready; no false save was recorded.')));
 let timer; const autosave=()=>{clearTimeout(timer);timer=setTimeout(()=>toast('Local draft updated · production auto-save pending API'),700)};q('#journal-title')?.addEventListener('input',autosave);q('[data-control-id="journal-body"]')?.addEventListener('input',autosave);
 root.dataset.runtimeBound='true'; root.dataset.editorMode=mode; if(journalId)root.dataset.journalId=journalId; return()=>clearTimeout(timer);
}
export const JOURNAL_API_INTENT=API;
