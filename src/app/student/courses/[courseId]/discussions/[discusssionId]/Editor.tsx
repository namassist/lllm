"use client";

import React from "react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { cn } from "@/lib/utils";

export const Editor = ({ desc }: { desc: string }) => {
  return (
    <MinimalTiptapEditor
      disabled
      value={JSON.parse(desc)}
      className={cn("w-full min-h-10 shadow-none border-none")}
    />
  );
};
