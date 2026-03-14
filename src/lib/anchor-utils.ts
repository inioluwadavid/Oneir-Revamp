export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const MEDIA_SECTION_ANCHORS = {
  techAdvisor: "tech-advisor",
  oneirMinute: "oneir-minute",
} as const;

export function createProductManualItemAnchor(sectionId: string, title: string): string {
  return `${sectionId}-${slugify(title)}`;
}

export function createMediaArticleAnchor(sectionAnchor: string, title: string): string {
  return `${sectionAnchor}-${slugify(title)}`;
}
