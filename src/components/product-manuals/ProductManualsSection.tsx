import ManualCard from "./ManualCard";
import FadeInSection from "@/components/motion/FadeInSection";
import { createProductManualItemAnchor } from "@/lib/anchor-utils";

export interface ManualItem {
  title: string;
  description: string;
  href: string;
  /** Overrides default CTA for this item */
  linkText?: string;
  /** When `"viewHere"`, CTA uses `viewHereLink` from locale ("View here" / "Voir ici"). */
  linkTextKey?: string;
}

interface ProductManualsSectionProps {
  id: string;
  title: string;
  items: ManualItem[];
  linkText: string;
  viewHereLink: string;
  /** "single" = full-width single column (e.g. Terms and Conditions) */
  layout?: "grid" | "single";
}

function resolveItemLinkText(item: ManualItem, defaultLinkText: string, viewHereLink: string) {
  if (item.linkTextKey === "viewHere") return viewHereLink;
  return item.linkText ?? defaultLinkText;
}

export default function ProductManualsSection({
  id,
  title,
  items,
  linkText,
  viewHereLink,
  layout = "grid",
}: ProductManualsSectionProps) {
  const content = (
    <>
      <h2
        className="mb-8 text-2xl font-semibold text-[#070714] sm:mb-10 sm:text-3xl lg:mb-12 lg:text-[48px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h2>
      {layout === "single" ? (
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3
                id={createProductManualItemAnchor(id, item.title)}
                className="text-xl font-semibold text-[#070714] sm:text-2xl lg:text-[32px]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {item.title}
              </h3>
              <p className="text-base leading-6 text-[#070714]">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-normal text-[#942c56] underline decoration-[#942c56] underline-offset-2 transition-colors hover:text-[#7a2446]"
              >
                {resolveItemLinkText(item, linkText, viewHereLink)}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, index) => {
            const itemAnchor = createProductManualItemAnchor(id, item.title);
            const resolvedHref = item.href === "#" ? `#${itemAnchor}` : item.href;
            return (
              <ManualCard
                key={index}
                id={itemAnchor}
                title={item.title}
                description={item.description}
                linkText={resolveItemLinkText(item, linkText, viewHereLink)}
                href={resolvedHref}
              />
            );
          })}
        </div>
      )}
    </>
  );

  return (
    <FadeInSection className="mb-16 scroll-mt-24 sm:mb-20 lg:mb-[80px]">
      <section id={id}>
        <div className="rounded-[32px] bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:p-8 lg:p-12 lg:py-16 lg:px-24">
          {content}
        </div>
      </section>
    </FadeInSection>
  );
}
