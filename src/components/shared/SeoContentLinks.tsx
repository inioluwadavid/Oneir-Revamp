import Link from "next/link";
import type { Locale } from "@/lib/translations";

interface SeoContentLinksProps {
  locale: Locale;
  currentPath: string;
}

const LINKS = [
  { path: "", en: "Home", fr: "Accueil" },
  { path: "about-us", en: "About Us", fr: "A propos" },
  { path: "support", en: "Support", fr: "Support" },
  { path: "product-manuals", en: "Product Manuals", fr: "Manuels produit" },
  { path: "media-and-articles", en: "Media and Articles", fr: "Medias et articles" },
  { path: "common-questions", en: "Common Questions", fr: "Questions courantes" },
  { path: "success-stories", en: "Success Stories", fr: "Histoires de succes" },
] as const;

export default function SeoContentLinks({ locale, currentPath }: SeoContentLinksProps) {
  const normalized = currentPath.replace(/^\/+/, "");
  const visibleLinks = LINKS.filter((item) => item.path !== normalized).slice(0, 5);

  return (
    <section className="mt-10 rounded-2xl border border-[#D8D9DE] bg-white p-6 sm:p-8">
      <h2
        className="text-2xl font-semibold text-[#070714] sm:text-3xl"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {locale === "en" ? "Explore Related Resources" : "Explorer les ressources connexes"}
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {visibleLinks.map((item) => (
          <Link
            key={item.path || "home"}
            href={`/${locale}${item.path ? `/${item.path}` : ""}`}
            className="rounded-full border border-[#C6C7CA] px-4 py-2 text-sm text-[#434349] transition-colors hover:border-[#070714] hover:text-[#070714]"
          >
            {locale === "en" ? item.en : item.fr}
          </Link>
        ))}
      </div>
    </section>
  );
}
