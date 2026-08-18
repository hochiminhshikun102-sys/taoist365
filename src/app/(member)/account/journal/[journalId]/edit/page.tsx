import '../../new/journal-editor.css';
import JournalEditorClient from '../../new/JournalEditorClient';

export const dynamicParams=false;
const EDIT_ROUTE_FIXTURE_ID='JRN-20260814-0001';
export function generateStaticParams(){return[{journalId:EDIT_ROUTE_FIXTURE_ID}]}
export const metadata={title:'Edit Journal | DOHARA',robots:{index:false,follow:false}};

export default async function Page({params}:{params:Promise<{journalId:string}>}){
 const {journalId}=await params;
 return <JournalEditorClient mode="edit" journalId={journalId}/>;
}
