import { cn, Divider, Link, Snippet } from "@heroui/react";
import Markdown, { Options } from "react-markdown";

export interface MarkdownRendererProps extends Options {}

export default function MarkdownRenderer(props: MarkdownRendererProps) {
  return (
    <div className="flex flex-col gap-[0.5em]">
      <Markdown
        components={{
          h1: (props) => (
            <h1
              className={cn("text-[2em] font-extrabold", props.className)}
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className={cn("text-[1.75em] font-bold", props.className)}
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className={cn("text-[1.5em] font-semibold", props.className)}
              {...props}
            />
          ),
          p: (props) => (
            <p
              className={cn(
                "text-[1em] [line-height:1.25em] text-pretty",
                props.className,
              )}
              {...props}
            />
          ),
          code: (props) => (
            <code
              className={cn(
                "bg-default/25 rounded px-[0.25em] pt-[0.25em] pb-[0.125em] font-mono text-[0.9em] font-semibold",
                props.className,
              )}
              {...props}
            />
          ),
          pre: (props) => (
            <Snippet hideSymbol className={props.className}>
              {props.children}
            </Snippet>
          ),
          hr: (props) => (
            <Divider className={cn("my-4", props.className)} {...props} />
          ),
          ul: (props) => (
            <ul className="list-inside list-disc" {...props}>
              {props.children}
            </ul>
          ),
          li: (props) => <li {...props}>{props.children}</li>,
          a: (props) => (
            <Link
              className={cn("underline", props.className)}
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
    </div>
  );
}
