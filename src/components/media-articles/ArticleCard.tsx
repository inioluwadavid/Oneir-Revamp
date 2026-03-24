"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";
import GoogleDriveVideoModal from "@/components/media-articles/GoogleDriveVideoModal";
import { googleDriveFileIdFromUrl, googleDriveVideoEmbedUrl } from "@/components/media-articles/googleDriveVideo";

const linkClassName =
  "inline-flex w-fit text-sm font-medium text-[#942c56] underline decoration-[#942c56] underline-offset-2 transition-colors hover:text-[#7a2446] sm:text-[14px]";

interface ArticleCardProps {
  id?: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  /** When true and `href` is a Google Drive file link, opens the video in a modal instead of navigating away. */
  embedDriveVideo?: boolean;
}

export default function ArticleCard({
  id,
  title,
  description,
  linkText,
  href,
  embedDriveVideo = false,
}: ArticleCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const driveFileId = googleDriveFileIdFromUrl(href);
  const driveEmbedUrl = driveFileId ? googleDriveVideoEmbedUrl(driveFileId) : null;
  const openInVideoModal = Boolean(embedDriveVideo && driveEmbedUrl);

  return (
    <motion.article
      id={id}
      className="scroll-mt-28 flex flex-col gap-4 rounded-[24px] p-6 sm:p-8"
      whileHover={{
        y: -4,
        boxShadow: "0px 12px 28px 0px rgba(57, 57, 101, 0.1)",
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      }}
    >
      <h3
        className="text-lg font-semibold text-[#070714] sm:text-xl lg:text-[32px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#434349] sm:text-base">{description}</p>
      {openInVideoModal && driveEmbedUrl ? (
        <>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className={`${linkClassName} cursor-pointer border-0 bg-transparent p-0 text-left`}
          >
            {linkText}
          </button>
          <GoogleDriveVideoModal
            isOpen={videoOpen}
            onClose={() => setVideoOpen(false)}
            embedUrl={driveEmbedUrl}
            title={title}
          />
        </>
      ) : (
        <Link
          href={href}
          className={linkClassName}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkText}
        </Link>
      )}
    </motion.article>
  );
}
