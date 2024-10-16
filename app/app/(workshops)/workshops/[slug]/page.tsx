"use client";

import { useRef, useEffect, useReducer, useState, useCallback } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
  useEventListener,
  useRoom,
} from "@liveblocks/react/suspense";

import { useGlitch } from "react-powerglitch";

import { VisSingleContainer, VisGraph } from "@unovis/react";
import {
  CollaborativeEditor,
  Language,
  RoomType,
} from "@/components/collaborative-editor/editor";
import Markdown from "react-markdown";
import {
  Button,
  CircularProgress,
  Divider,
  Input,
  Link,
  ScrollShadow,
  Snippet,
} from "@nextui-org/react";
// import { useSession } from "next-auth/react";
import { User } from "@/auth";
import { GraphData } from "@unovis/ts/data-models/graph";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";

import { prompts, workshops } from "@/lib/workshops";
import Quicktime from "./quicktime";
import MarkdownRenderer from "@/components/markdown-renderer";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export interface WorkshopPageProps {
  params: { slug: string };
}

interface TreeNode {
  tag: string;
  id: string;
  class: string;
  children: TreeNode[];
}

type NodeDatum = {
  id?: string;
  node?: TreeNode;
};

type LinkDatum = {
  id?: string;
  source: number | string | NodeDatum;
  target: number | string | NodeDatum;
};

// window.onload = () => {
//   fetch("/api/workshops", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       slug: "introduction-web",
//     }),
//   });
// };

const slides = `
# Introduction to Web Development

---

## What is Web Development?

Web development is the process of creating websites and web applications. It involves writing code that runs on a web browser, such as Chrome or Firefox, to display and interact with web pages.

---

## Why Web Development?

Web development offers several benefits:

- **Accessibility**: Web pages are accessible to people with disabilities, such as visual impairments, hearing impairments, and motor disabilities.
- **Cost-effectiveness**: Web development can be more cost-effective than traditional software development, as it eliminates the need for expensive hardware and software licenses.
- **Flexibility**: Web development allows for greater flexibility in terms of design, functionality, and user experience.
- **Scalability**: Web development enables the creation of large-scale web applications that can handle a large number of users and data.

---

## What is HTML?

HTML (Hypertext Markup Language) is the standard markup language for creating web pages. It provides the structure and content of a web page, including headings, paragraphs, images, links, and more.

HTML uses tags to define the structure of a web page. Tags are enclosed in angle brackets (<>) and come in pairs: an opening tag and a closing tag. The content between the opening and closing tags is the content of the tag.

For example, the following code defines a heading with the text "Hello, World!":

\`\`\`html
<h1>Hello, World!</h1>
\`\`\`
`;

let debounceTimeout: ReturnType<typeof setTimeout>;

const debounce = (callback: () => void, delay: number) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(callback, delay);
};

export default function WorkshopPage({ params }: WorkshopPageProps) {
  const id = decodeURIComponent(params.slug);
  const workshop = workshops.find((workshop) => workshop.id === id);

  const iframe = useRef<HTMLIFrameElement>(null);

  const user = useQuery(api.users.currentUser);

  const createOrGetWebsite = useMutation(api.websites.createOrGetWebsite);
  const updateWebsite = useMutation(api.websites.update);

  const [initial, setInitial] = useState(true);

  const [website, setWebsite] = useState<Doc<"websites">>();

  useEffect(() => {
    if (!initial || !user) return;

    createOrGetWebsite({ userId: user._id }).then((website) =>
      setWebsite(website),
    );

    setInitial(false);
  }, [createOrGetWebsite, initial, user]);

  const [graph, setGraph] = useState<GraphData<NodeDatum, LinkDatum>>();

  useEffect(() => {
    // setRoomKind();
  }, [user]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(website?.html || "", "text/html");

    function buildTree(node: Element): TreeNode {
      const children = Array.from(node.children).map(buildTree);
      return {
        tag: node.tagName.toLowerCase(),
        id: node.id,
        class: node.className,
        children,
      };
    }

    const tree = buildTree(doc.body);

    const nodes: NodeDatum[] = [];
    const links: LinkDatum[] = [];
    function buildGraph(node: TreeNode, parentId: string) {
      nodes.push({ id: parentId, node });
      node.children.forEach((child, i) => {
        const id = `${parentId}:${i}`;
        // nodes.push({ id, node: child });
        links.push({ id, source: id, target: parentId });
        buildGraph(child, id);
      });
    }

    buildGraph(tree, "0");

    // console.log({ tree, nodes, links });
    setGraph({ nodes, links });

    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (!doc) return;

      doc.open();
      doc.write(website?.html || "");
      doc.close();

      if (website?.css) {
        const style = doc.createElement("style");
        style.innerHTML = website.css;
        doc.head.appendChild(style);
      }

      if (website?.javascript) {
        const script = doc.createElement("script");
        script.type = "module";
        script.innerHTML = website.javascript;
        doc.head.appendChild(script);
      }
    }
  }, [website]);

  // if (status === "loading") return null;
  // const user = session?.user;
  // if (!user) return null;

  async function handleOnChange(file: { language: Language; value: string }) {
    if (!website) throw new Error("Website not found");

    setWebsite({ ...website, [file.language]: file.value });

    debounce(() => {
      void updateWebsite({
        id: website._id,
        [file.language]: file.value,
      });
    }, 1000);
  }

  // const roomTypeToId = useCallback(
  //   (roomType: RoomType) => {
  //     if (!workshop) throw new Error("Workshop not found");
  //     if (!user) throw new Error("User not found");

  //     if (roomType === "host") {
  //       return `workshop:${workshop.id}:host`;
  //     } else {
  //       return `workshop:${workshop.id}:personal:${user._id}`;
  //     }
  //   },
  //   [workshop, user],
  // );

  function reloadIframe() {
    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (doc) {
        doc.open();
        doc.write(doc.documentElement.outerHTML);
        doc.close();
      }
    }
  }

  if (!workshop) return <div>Workshop not found</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex h-full w-full gap-4">
      <div className="texture flex w-[30rem] flex-col gap-4 bg-background/25">
        <ScrollShadow className="flex-1 overflow-auto p-4">
          <MarkdownRenderer>{slides}</MarkdownRenderer>
        </ScrollShadow>

        <div className="formal-invitation h-[20rem] bg-default/25 p-4">
          {/* <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={`workshop:${workshop.id}:quicktime`}>
              <ClientSideSuspense fallback={<div>Loading…</div>}> */}
          <Quicktime prompt={prompts[0]} onEnd={console.log} />
          {/* </ClientSideSuspense>
            </RoomProvider>
          </LiveblocksProvider> */}
        </div>
      </div>

      <div className="flex flex-1 gap-4">
        <div className="flex-1">
          {/* <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={roomTypeToId(roomType)}>
              <ClientSideSuspense fallback={<div>Loading…</div>}> */}
          <CollaborativeEditor
            workshop={workshop}
            website={website}
            onFileChange={handleOnChange}
          />
          {/* </ClientSideSuspense>
            </RoomProvider>
          </LiveblocksProvider> */}
        </div>

        <div className="m-4 flex flex-1 flex-col gap-4">
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg">
            <div className="flex gap-2 bg-default-50 p-2">
              <Button
                size="sm"
                variant="light"
                startContent={<ArrowPathIcon className="h-4 w-4" />}
                isIconOnly
                onClick={reloadIframe}
              />

              <Input
                size="sm"
                type="url"
                defaultValue="me"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">
                      https://
                    </span>
                  </div>
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">
                      .beaverscode.club
                    </span>
                  </div>
                }
              />

              <Button
                as={Link}
                isDisabled
                size="sm"
                variant="light"
                startContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                isIconOnly
              />
            </div>

            <iframe className="flex-1" ref={iframe} />
          </div>

          <VisSingleContainer className="flex-1" data={graph}>
            <VisGraph<NodeDatum, LinkDatum>
              nodeLabel={({ node }) =>
                node &&
                `${node.tag}${node.id ? `#${node.id}` : ""}${node.class ? `.${node.class}` : ""}`
              }
              layoutType="dagre"
              dagreLayoutSettings={{}}
            />
          </VisSingleContainer>
        </div>
      </div>
    </div>
  );
}
