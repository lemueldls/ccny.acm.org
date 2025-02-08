"use client";

import {
  useRef,
  useEffect,
  useReducer,
  useState,
  useCallback,
  use,
} from "react";

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
  User,
} from "@heroui/react";
// import { useSession } from "next-auth/react";
import { GraphData } from "@unovis/ts/data-models/graph";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";

import Drawer from "react-bottom-drawer";

import { prompts, slides, workshops } from "@/lib/workshops";
import Quicktime from "./quicktime";
import MarkdownRenderer from "@/components/markdown-renderer";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import NumberTicker from "@/components/ui/number-ticker";
import HyperText from "@/components/ui/hyper-text";
import { motion } from "framer-motion";
import { segments } from "../../../../../lib/workshops";
import BoxReveal from "@/components/ui/box-reveal";

import confetti from "canvas-confetti";
import { QuicktimePrompt } from "../../admin/workshops/[slug]/quicktime-card";

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

let debounceTimeout: ReturnType<typeof setTimeout>;

const debounce = (callback: () => void, delay: number) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(callback, delay);
};

export default function WorkshopPage({ params }: WorkshopPageProps) {
  const slug = decodeURIComponent(params.slug);
  const workshop = useQuery(api.workshops.getBySlug, { slug });

  const activeSlideSegments = useQuery(api.activeWorkshops.getSlideSegments, {
    workshopId: workshop?._id,
  });

  // console.log({ slug, workshop });

  const iframe = useRef<HTMLIFrameElement>(null);

  const user = useQuery(api.users.currentUser);

  const createOrGetWebsite = useMutation(api.websites.createOrGetWebsite);
  const updateWebsite = useMutation(api.websites.update);

  const [initial, setInitial] = useState(true);

  const [website, setWebsite] = useState<Doc<"websites">>();

  const [activeQuicktime, setActiveQuicktime] = useState<QuicktimePrompt>();

  const [showDrawer, setShowDrawer] = useState(true);
  const toggleDrawer = useCallback(() => setShowDrawer((s) => !s), []);

  useEffect(() => {
    if (!initial || !user) return;

    createOrGetWebsite({ userId: user._id }).then((website) =>
      setWebsite(website),
    );

    setInitial(false);
  }, [createOrGetWebsite, initial, user]);

  const [graph, setGraph] = useState<GraphData<NodeDatum, LinkDatum>>();

  // useEffect(() => {
  //   // setRoomKind();
  // }, [user]);

  useEffect(() => {
    if (!workshop) return;

    const lastSegment = activeSlideSegments?.[activeSlideSegments.length - 1];
    if (lastSegment?.kind === "quicktime") {
      setActiveQuicktime(lastSegment);
    } else {
      setActiveQuicktime(undefined);
    }
  }, [activeSlideSegments, workshop]);

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
        const { outerHTML } = doc.documentElement;

        doc.open();
        doc.write(outerHTML);
        doc.close();
      }
    }
  }

  const handleOnEnd = () => {
    const end = Date.now() + 10 * 1000; // 3 seconds
    // const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const colors = [
      "#7d55c7",
      "#3db7e4",
      "#7ab800",
      "#f3cf45",
      "#9e3039",
      "#9093CE",
    ];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  if (!workshop) return <div>Workshop not found</div>;
  // if (!activeSlideSegments) return null;

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex h-full w-full gap-4 overflow-hidden">
      <div className="texture flex w-full flex-col gap-4 bg-background/25 sm:w-[30rem]">
        <ScrollShadow className="flex-1 overflow-auto p-4">
          {activeSlideSegments
            // ?.filter(({ kind }) => kind === "markdown")
            ?.map((slideSegment, i) =>
              slideSegment.kind === "markdown" ? (
                <BoxReveal key={i}>
                  <MarkdownRenderer className="mb-4">
                    {(slideSegment as { content: string }).content}
                  </MarkdownRenderer>
                </BoxReveal>
              ) : i === activeSlideSegments.length - 1 ? null : (
                <BoxReveal key={i}>
                  <Quicktime
                    workshopId={workshop._id}
                    prompt={activeQuicktime!}
                    onEnd={console.log}
                    className="text-sm"
                  />
                </BoxReveal>
              ),
            )}
        </ScrollShadow>

        <motion.div
          onClick={() => setShowDrawer(true)}
          style={{ height: showDrawer ? "fit-content" : "2.5rem" }}
          drag="y"
          dragElastic={
            showDrawer ? { top: 0.01, bottom: 0.2 } : { top: 0.2, bottom: 0.2 }
          }
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(event, info) => {
            if (showDrawer && info.offset.y > 80) setShowDrawer(false);
            if (!showDrawer && info.offset.y < -80) setShowDrawer(true);
          }}
          className="formal-invitation bg-default/25 p-4 transition-height"
        >
          {activeQuicktime ? (
            <Quicktime
              workshopId={workshop._id}
              prompt={activeQuicktime}
              onEnd={console.log}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <div className="h-2 w-12 rounded-full bg-foreground/50" />
              </div>

              <div className="flex items-start justify-between gap-4 p-4 font-bold">
                {/* {user.name} */}
                <User
                  onClick={handleOnEnd}
                  avatarProps={{
                    src: user.image,
                    name: user.name,
                    isBordered: true,
                    size: "lg",
                  }}
                  // name={user.name}
                  name={<HyperText text={user.name} animateOnLoad={false} />}
                  description={`@${user.slug}`}
                  classNames={{
                    wrapper: "flex-1",
                    name: "text-2xl h-[1.5em]",
                  }}
                />

                <span className="text-2xl italic">
                  {user.points ? <NumberTicker value={user.points} /> : 0}{" "}
                  points
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="m-4 hidden flex-1 flex-col gap-4 sm:flex lg:flex-row">
        <div className="flex-1">
          <CollaborativeEditor
            workshop={workshop}
            website={website}
            onFileChange={handleOnChange}
          />
        </div>

        <div className="flex flex-1 flex-row gap-4 lg:flex-col">
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
                value={
                  user.slug &&
                  `https://${user.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
                }
                isDisabled
                isClearable
              />

              <Button
                as={Link}
                isDisabled={!user.slug}
                href={
                  user.slug &&
                  `https://${user.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
                }
                size="sm"
                variant="light"
                startContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                isExternal
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
