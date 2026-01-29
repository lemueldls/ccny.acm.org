"use client";

import { useEffect, useRef } from "react";

export interface WebsiteProps {
  html: string;
  css: string;
  javascript: string;
}

export default function Website({ html, css, javascript }: WebsiteProps) {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (!doc) {
        return;
      }

      doc.open();
      doc.write(html);
      doc.close();

      document.head.title = doc.title;

      if (css) {
        const style = doc.createElement("style");
        style.innerHTML = css;
        doc.head.appendChild(style);
      }

      if (javascript) {
        const script = doc.createElement("script");
        script.type = "module";
        script.innerHTML = javascript;
        doc.head.appendChild(script);
      }
    }
  }, [html, css, javascript]);

  // oxlint-disable-next-line jsx_a11y/iframe-has-title
  return <iframe ref={iframe} className="h-screen w-full" />;
}
