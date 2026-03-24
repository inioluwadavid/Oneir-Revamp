"use client";

import { useCallback } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ensureAtlassianJsdEmbedScript } from "@/lib/atlassianJsdWidget";

export interface ContactSupportButtonProps {
  label: string;
  /** When set, renders as a link (e.g. in-page scroll) instead of opening the support widget. */
  href?: string;
}

export default function ContactSupportButton({ label, href }: ContactSupportButtonProps) {
  const handleClick = useCallback(async () => {
    try {
      await ensureAtlassianJsdEmbedScript();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      className="inline-flex items-center justify-center gap-2"
      href={href}
      onClick={href ? undefined : handleClick}
      animated
    >
      <Image src="/images/comment.svg" alt="" width={24} height={19} className="shrink-0" />
      {label}
    </Button>
  );
}
