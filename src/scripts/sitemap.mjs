import { writeFile } from "fs/promises";
import { globby } from "globby";

const excludes = ['/about-us/', '/dev/', '/privacy-policy/'];

const createPath = (p) => {
  const parts = p.split("app");
  if (parts.length != 2) {
    return "";
  }
  let result = parts[1].replace('page.tsx', '');
  if (excludes.includes(result)) {
    return "";
  }
  return result;
};

const collectPaths = async () => {
  const paths = await globby("./src/app/**/page.tsx");
  return paths.map(createPath).filter(item => item != "");
};

const createSitemap = async (routes) => {
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN
  const urls = routes.map((route) => `${DOMAIN}${route}`);
  console.log(`Found ${urls.length} urls:`);
  console.log(urls);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          return `
  <url>
    <loc>${url}</loc>
  </url>`;
        })
        .join("")}
</urlset>`;
};

// run: node --env-file=.env src/scripts/sitemap.mjs

(async () => {
  const paths = await collectPaths();
  const sitemap = await createSitemap(paths);
  await writeFile("./public/sitemap.xml", sitemap, { encoding: "utf-8" });
})();

