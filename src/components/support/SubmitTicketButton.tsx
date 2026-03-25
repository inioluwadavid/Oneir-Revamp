"use client";

import { useCallback, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { openAtlassianSupportWidget } from "@/lib/atlassianJsdWidget";

interface SubmitTicketButtonProps {
  children: ReactNode;
  className?: string;
}

export default function SubmitTicketButton({
  children,
  className = "",
}: SubmitTicketButtonProps) {
  const handleClick = useCallback(async () => {
    try {
      await openAtlassianSupportWidget();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      className={`inline-flex items-center justify-center gap-2 ${className}`.trim()}
      onClick={handleClick}
      animated
    >
      {children}
    </Button>
  );
}
