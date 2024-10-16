import { Divider, Snippet } from "@nextui-org/react";
import Markdown, { Options } from "react-markdown";

export interface MarkdownRendererProps extends Options {}

export default function MarkdownRenderer(props: MarkdownRendererProps) {
  return (
    <Markdown
      components={{
        h1: (props) => (
          <h1 className="mb-2 text-[2em] font-extrabold" {...props} />
        ),
        h2: (props) => (
          <h2 className="mb-2 text-[1.75em] font-bold" {...props} />
        ),
        h3: (props) => (
          <h3 className="mb-2 text-[1.5em] font-semibold" {...props} />
        ),
        p: (props) => <p className="text-[1em]" {...props} />,
        code: (props) => (
          <code
            className="rounded bg-default/25 px-1 pb-0.5 pt-1 font-mono text-[0.9em] font-semibold"
            {...props}
          />
        ),
        pre: (props) => (
          <Snippet hideSymbol className={props.className}>
            {props.children}
          </Snippet>
        ),
        hr: (props) => <Divider className="my-4" />,
      }}
      {...props}
    />
  );
}
