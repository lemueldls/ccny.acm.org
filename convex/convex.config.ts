import prosemirrorSync from "@convex-dev/prosemirror-sync/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(prosemirrorSync);

export default app;
