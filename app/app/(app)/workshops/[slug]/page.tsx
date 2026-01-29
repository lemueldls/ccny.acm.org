"use client";

import { ArrowPathIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
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
import { VisGraph, VisSingleContainer } from "@unovis/react";
// import { useSession } from "next-auth/react";
import { GraphData } from "@unovis/ts/data-models/graph";
import confetti from "canvas-confetti";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { use, useCallback, useEffect, useReducer, useRef, useState } from "react";
import Markdown from "react-markdown";
import { useGlitch } from "react-powerglitch";

import { CollaborativeEditor, Language, RoomType } from "@/components/collaborative-editor/editor";
import MarkdownRenderer from "@/components/markdown-renderer";
import BoxReveal from "@/components/ui/box-reveal";
import HyperText from "@/components/ui/hyper-text";
import NumberTicker from "@/components/ui/number-ticker";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import { QuicktimePrompt } from "../../admin/workshops/[slug]/quicktime-card";
import Quicktime from "./quicktime";

export interface WorkshopPageProps {
  params: Promise<{ slug: string }>;
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
//   Fetch("/api/workshops", {
//     Method: "POST",
//     Headers: {
//       "Content-Type": "application/json",
//     },
//     Body: JSON.stringify({
//       Slug: "introduction-web",
//     }),
//   });
// };

let debounceTimeout: ReturnType<typeof setTimeout>;

const debounce = (callback: () => void, delay: number) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(callback, delay);
};

export default function WorkshopPage(props: WorkshopPageProps) {
  const params = use(props.params);
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
    if (!initial || !user) {
      return;
    }

    createOrGetWebsite({ userId: user._id }).then((website) => setWebsite(website));

    setInitial(false);
  }, [createOrGetWebsite, initial, user]);

  const [graph, setGraph] = useState<GraphData<NodeDatum, LinkDatum>>();

  // useEffect(() => {
  //   // setRoomKind();
  // }, [user]);

  useEffect(() => {
    if (!workshop) {
      return;
    }

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
        children,
        class: node.className,
        id: node.id,
        tag: node.tagName.toLowerCase(),
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
    setGraph({ links, nodes });

    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (!doc) {
        return;
      }

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
    if (!website) {
      throw new Error("Website not found");
    }

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
  //     If (!workshop) throw new Error("Workshop not found");
  //     If (!user) throw new Error("User not found");

  //     If (roomType === "host") {
  //       Return `workshop:${workshop.id}:host`;
  //     } else {
  //       Return `workshop:${workshop.id}:personal:${user._id}`;
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
    const colors = ["#7d55c7", "#3db7e4", "#7ab800", "#f3cf45", "#9e3039", "#9093CE"];

    const frame = () => {
      if (Date.now() > end) {
        return;
      }

      confetti({
        angle: 60,
        colors: colors,
        origin: { x: 0, y: 0.5 },
        particleCount: 2,
        spread: 55,
        startVelocity: 60,
      });
      confetti({
        angle: 120,
        colors: colors,
        origin: { x: 1, y: 0.5 },
        particleCount: 2,
        spread: 55,
        startVelocity: 60,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  if (!workshop) {
    return <div>Workshop not found</div>;
  }
  // if (!activeSlideSegments) return null;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex h-full w-full gap-4 overflow-hidden">
      <div className="texture bg-background/25 flex w-full flex-col gap-4 sm:w-120">
        <ScrollShadow className="flex-1 overflow-auto p-4">
          {activeSlideSegments
            // ?.filter(({ kind }) => kind === "markdown")
            ?.map((slideSegment, i) =>
              slideSegment.kind === "markdown" ? (
                <BoxReveal key={i}>
                  <div className="mb-4">
                    <MarkdownRenderer>
                      {(slideSegment as { content: string }).content}
                    </MarkdownRenderer>
                  </div>
                </BoxReveal>
              ) : i === activeSlideSegments.length - 1 ? null : (
                <BoxReveal key={i}>
                  <Quicktime
                    workshopId={workshop._id}
                    prompt={activeQuicktime}
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
          dragElastic={showDrawer ? { bottom: 0.2, top: 0.01 } : { bottom: 0.2, top: 0.2 }}
          dragConstraints={{ bottom: 0, top: 0 }}
          onDragEnd={(event, info) => {
            if (showDrawer && info.offset.y > 80) {
              setShowDrawer(false);
            }
            if (!showDrawer && info.offset.y < -80) {
              setShowDrawer(true);
            }
          }}
          className="signal bg-default/25 transition-height p-4"
        >
          {activeQuicktime ? (
            <Quicktime workshopId={workshop._id} prompt={activeQuicktime} onEnd={console.log} />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <div className="bg-foreground/50 h-2 w-12 rounded-full" />
              </div>

              <div className="flex items-start justify-between gap-4 p-4 font-bold">
                {/* {user.name} */}
                <User
                  onClick={handleOnEnd}
                  avatarProps={{
                    isBordered: true,
                    name: user.name,
                    size: "lg",
                    src: user.image,
                  }}
                  // name={user.name}
                  name={<HyperText text={user.name} animateOnLoad={false} />}
                  description={`@${user.slug}`}
                  classNames={{
                    name: "text-2xl h-[1.5em]",
                    wrapper: "flex-1",
                  }}
                />

                <span className="text-2xl italic">
                  {user.points ? <NumberTicker value={user.points} /> : 0} points
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
            <div className="bg-default-50 flex gap-2 p-2">
              <Button
                size="sm"
                variant="light"
                startContent={<ArrowPathIcon className="h-4 w-4" />}
                isIconOnly
                onPress={reloadIframe}
              />

              <Input
                size="sm"
                type="url"
                value={user.slug && `https://${user.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                isDisabled
                isClearable
              />

              <Button
                as={Link}
                isDisabled={!user.slug}
                href={user.slug && `https://${user.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                size="sm"
                variant="light"
                startContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                isExternal
                isIconOnly
              />
            </div>

            <iframe title="Website" className="flex-1 bg-white" ref={iframe} />
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
