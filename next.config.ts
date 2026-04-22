import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: projectRoot,
  },
};

export default withMDX(nextConfig);
