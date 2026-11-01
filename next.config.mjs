/** @type {import('next').NextConfig} */
const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);
const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS && !isVercel);
const isGitHubPages = Boolean(process.env.GITHUB_PAGES === "true" || isGitHubActions);

// Use sub-path only for GitHub Pages; Vercel and local dev always use root /
const basePath = isGitHubPages ? "/RukshanAmodya" : (process.env.NEXT_PUBLIC_BASE_PATH || "");

const nextConfig = {
  ...(isGitHubPages ? { output: "export" } : {}),
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
