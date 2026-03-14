import Link from "next/link";

interface ManualCardProps {
  id?: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

export default function ManualCard({
  id,
  title,
  description,
  linkText,
  href,
}: ManualCardProps) {
  return (
    <article id={id} className="scroll-mt-28 flex flex-col gap-4 rounded-[24px] p-6 sm:p-8">
      <h3
        className="text-lg font-semibold text-[#070714] sm:text-xl lg:text-[32px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-[#434349] sm:text-base">
        {description}
      </p>
      <Link
        href={href}
        className="mt-auto inline-flex items-center text-sm font-medium text-[#942c56] underline decoration-[#942c56] underline-offset-2 transition-colors hover:text-[#7a2446] sm:text-[14px]"
      >
        {linkText}
      </Link>
    </article>
  );
}
