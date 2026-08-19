import { windKeepCapability, windKeepPolicyBindings, windKeepReadiness, windKeepRoutes, type WindKeepObject } from "../_shared/contracts";
export { windKeepCapability, windKeepPolicyBindings, windKeepReadiness, windKeepRoutes };
export type { WindKeepObjectStatus } from "../_shared/contracts";

export const windKeepObjects: WindKeepObject[] = [
  {id:"WK-OBJ-001",title:"Blue Porcelain Deer Vase",image:"/assets/product_01.png",source:"DOHARA Curated",relation:"Submitter",status:"Under Review",path:"Swap Objects",story:"Draft",visibility:"Private",country:"United States only",review:"Pending",journalNotes:1,nextAction:"Complete Story"},
  {id:"WK-OBJ-002",title:"Linen Reflection Journal",image:"/assets/product_04.png",source:"User Submitted",relation:"Owner",status:"Published",path:"Open Offers",story:"Complete",visibility:"Public",country:"United States only",review:"Approved",journalNotes:2,nextAction:"Review Interest"},
  {id:"WK-OBJ-003",title:"Silver Wind Chime",image:"/assets/product_05.png",source:"DOHARA Curated",relation:"Receiver",status:"In Transfer",path:"Swap Objects",story:"Complete",visibility:"Private",country:"United States only",review:"Approved",journalNotes:1,nextAction:"Upload Evidence"},
  {id:"WK-OBJ-004",title:"Porcelain Memory Box",image:"/assets/product_01.png",source:"User Submitted",relation:"Owner",status:"Draft",path:"Auction Intent",story:"Draft",visibility:"Private",country:"United States only",review:"Not Submitted",journalNotes:0,nextAction:"Continue Draft"},
  {id:"WK-OBJ-005",title:"French Blue Keepsake Tray",image:"/assets/product_04.png",source:"DOHARA Curated",relation:"Saved",status:"Published",path:"Open Offers",story:"Complete",visibility:"Public",country:"United States only",review:"Approved",journalNotes:0,nextAction:"View Status"},
  {id:"WK-OBJ-006",title:"Courtyard Glass Bell",image:"/assets/product_05.png",source:"User Submitted",relation:"Participant",status:"Archived",path:"Swap Objects",story:"Complete",visibility:"Private",country:"United States only",review:"Changes Requested",journalNotes:3,nextAction:"Review Archive"},
];
