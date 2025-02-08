import { Divider, Link, Snippet } from "@heroui/react";
import Markdown, { Options } from "react-markdown";

export interface MarkdownRendererProps extends Options {}

export default function MarkdownRenderer(props: MarkdownRendererProps) {
  return (
    <Markdown
      components={{
        h1: (props) => (
          <h1 className="mb-[1em] text-[2em] font-extrabold" {...props} />
        ),
        h2: (props) => (
          <h2 className="mb-[1em] text-[1.75em] font-bold" {...props} />
        ),
        h3: (props) => (
          <h3 className="mb-[1em] text-[1.5em] font-semibold" {...props} />
        ),
        p: (props) => (
          <p
            className="text-pretty text-[1em] [line-height:1.25em]"
            {...props}
          />
        ),
        code: (props) => (
          <code
            className="rounded bg-default/25 px-[0.25em] pb-[0.125em] pt-[0.25em] font-mono text-[0.9em] font-semibold"
            {...props}
          />
        ),
        pre: (props) => (
          <Snippet hideSymbol className={props.className}>
            {props.children}
          </Snippet>
        ),
        hr: (props) => <Divider className="my-4" />,
        ul: (props) => (
          <ul
            className="mt-[1em] list-inside list-disc [line-height:1.25em]"
            {...props}
          >
            {props.children}
          </ul>
        ),
        li: (props) => <li className="text-[0.9em]">{props.children}</li>,
        a: (props) => (
          <Link
            className="text-[1em] underline"
            href={props.href}
            target="_blank"
            // rel="noopener noreferrer"
          >
            {props.children}
          </Link>
        ),
      }}
      {...props}
    />
  );
}
