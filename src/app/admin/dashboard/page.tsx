"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { useState } from "react";
import { generate } from "@/actions/ai";
import { readStreamableValue } from "ai/rsc";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Page() {
  const [generation, setGeneration] = useState<string>("");

  return (
    <AuthLayout>
      <button
        onClick={async () => {
          const { object } = await generate("Messages during finals week.");

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(
                JSON.stringify(partialObject.notifications, null, 2)
              );
            }
          }
        }}
      >
        Ask
      </button>

      <pre>{generation}</pre>
    </AuthLayout>
  );
}
