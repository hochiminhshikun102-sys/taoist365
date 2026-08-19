import type { Metadata } from "next";
import "./objects.css";
import ObjectsLibrary from "./ObjectsLibrary";

export const metadata: Metadata = {title:"My Objects | DOHARA",description:"Manage objects connected to your WindKeep account.",robots:{index:false,follow:false}};
export default function MyObjectsPage(){return <ObjectsLibrary/>}
