"use client";

import { useCallback } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ensureAtlassianJsdEmbedScript } from "@/lib/atlassianJsdWidget";

interface ContactSupportButtonProps {
  label: string;
}

export default function ContactSupportButton({ label }: ContactSupportButtonProps) {
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
      onClick={handleClick}
      animated
    >
      <Image src="/images/comment.svg" alt="" width={24} height={19} className="shrink-0" />
      {label}
    </Button>
  );
}
