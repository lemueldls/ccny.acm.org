import { Divider, Link, Snippet } from "@heroui/react";
import Markdown, { Options } from "react-markdown";

export interface MarkdownRendererProps extends Options { }

export default function MarkdownRenderer(props: MarkdownRendererProps) {
  return (
    <Markdown
      className="flex flex-col gap-[0.5em]"
      components={{
        h1: (props) => (
          <h1 className="text-[2em] font-extrabold" {...props} />
        ),
        h2: (props) => (
          <h2 className="text-[1.75em] font-bold" {...props} />
        ),
        h3: (props) => (
          <h3 className="text-[1.5em] font-semibold" {...props} />
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
            className="list-inside list-disc"
            {...props}
          >
            {props.children}
          </ul>
        ),
        li: (props) => <li>{props.children}</li>,
        a: (props) => (
          <Link
            className="underline"
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
