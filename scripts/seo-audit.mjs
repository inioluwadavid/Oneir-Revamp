import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const ROUTE_CHECKS = [
  { route: "home", file: "src/app/[locale]/page.tsx", expectAlternates: true },
  { route: "about-us", file: "src/app/[locale]/about-us/page.tsx", expectAlternates: true },
  { route: "support", file: "src/app/[locale]/support/page.tsx", expectAlternates: true },
  { route: "product-manuals", file: "src/app/[locale]/product-manuals/page.tsx", expectAlternates: true },
  { route: "media-and-articles", file: "src/app/[locale]/media-and-articles/page.tsx", expectAlternates: true },
  { route: "common-questions", file: "src/app/[locale]/common-questions/page.tsx", expectAlternates: true },
  { route: "success-stories", file: "src/app/[locale]/success-stories/page.tsx", expectAlternates: true },
  { route: "decorators-choice", file: "src/app/[locale]/success-stories/decorators-choice/page.tsx", expectAlternates: true },
  { route: "amity-insulation", file: "src/app/[locale]/success-stories/amity-insulation/page.tsx", expectAlternates: true },
  { route: "apparel-retailer", file: "src/app/[locale]/success-stories/apparel-retailer/page.tsx", expectAlternates: true },
  { route: "dwight-lumber", file: "src/app/[locale]/success-stories/dwight-lumber/page.tsx", expectAlternates: true },
  { route: "fuel-distribution-cardlock", file: "src/app/[locale]/success-stories/fuel-distribution-cardlock/page.tsx", expectAlternates: true },
  { route: "multi-company", file: "src/app/[locale]/success-stories/multi-company/page.tsx", expectAlternates: true },
  { route: "pet-supply-wholesaler", file: "src/app/[locale]/success-stories/pet-supply-wholesaler/page.tsx", expectAlternates: true },
  { route: "structural-lumber-building-systems", file: "src/app/[locale]/success-stories/structural-lumber-building-systems/page.tsx", expectAlternates: true },
  { route: "search", file: "src/app/[locale]/search/page.tsx", expectAlternates: true, expectNoIndex: true },
  { route: "signin", file: "src/app/[locale]/signin/page.tsx", expectAlternates: true, expectNoIndex: true },
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function hasAll(content, fragments) {
  return fragments.every((fragment) => content.includes(fragment));
}

function extractMetadataValues(content, field) {
  const pattern = new RegExp(`${field}\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`, "g");
  const values = [];
  let match = pattern.exec(content);
  while (match) {
    values.push(match[2].trim());
    match = pattern.exec(content);
  }
  return values;
}

const failures = [];
const titleUsage = new Map();
const descriptionUsage = new Map();

for (const check of ROUTE_CHECKS) {
  const content = read(check.file);

  if (check.expectAlternates && !content.includes("alternates:")) {
    failures.push(`[canonical] ${check.route} missing alternates metadata (${check.file})`);
  }

  if (check.expectNoIndex) {
    const hasNoIndex = hasAll(content, ["robots:", "index: false"]);
    if (!hasNoIndex) {
      failures.push(`[indexing] ${check.route} missing noindex directive (${check.file})`);
    }
  }

  for (const title of extractMetadataValues(content, "title")) {
    const source = `${check.route} (${check.file})`;
    titleUsage.set(title, [...(titleUsage.get(title) ?? []), source]);
  }

  for (const description of extractMetadataValues(content, "description")) {
    const source = `${check.route} (${check.file})`;
    descriptionUsage.set(description, [...(descriptionUsage.get(description) ?? []), source]);
  }
}

for (const [title, sources] of titleUsage) {
  if (title.includes("${")) continue;
  if (sources.length > 2) {
    failures.push(`[metadata] title appears repeatedly: "${title}" in ${sources.length} locations`);
  }
}

for (const [description, sources] of descriptionUsage) {
  if (description.includes("${")) continue;
  if (sources.length > 2) {
    failures.push(`[metadata] description appears repeatedly: "${description}" in ${sources.length} locations`);
  }
}

if (failures.length > 0) {
  console.error("SEO audit failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("SEO audit passed.");
console.log(`Checked ${ROUTE_CHECKS.length} locale routes for canonical/indexing/metadata coverage.`);
