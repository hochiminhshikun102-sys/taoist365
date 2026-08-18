"use client";

import { useEffect } from "react";
import { windkeepDocumentHtml } from "./windkeep-document";

const bodyMarkup = windkeepDocumentHtml
  .replace(/^[\s\S]*<body>/i, "")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<\/body>[\s\S]*$/i, "")
  .replace(/(src|href)="(assets|icons|fonts)\//g, '$1="/$2/');

export default function WindKeepOverview() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("main button:not([disabled])").forEach((control) => {
      control.dataset.disabledRoute = "true";
    });
    document.querySelectorAll<HTMLElement>("[data-disabled-route]").forEach((control) => {
      control.setAttribute("aria-disabled", "true");
      control.addEventListener("click", preventDisabled);
    });
    return () =>
      document.querySelectorAll<HTMLElement>("[data-disabled-route]").forEach((control) => {
        control.removeEventListener("click", preventDisabled);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />;
}

function preventDisabled(event: Event) {
  event.preventDefault();
}
