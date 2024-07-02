"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { saveTopic } from "@/actions/topic";
import { useRouter } from "next/navigation";

export default function AddTopics({ course_id }: { course_id: string }) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [title, setTitle] = React.useState("");

  const handleSave = async () => {
    const loading = toast.loading("submitting...");

    const createdTopic = await saveTopic({
      title,
      description: window.localStorage.getItem("novel-content"),
      course_id,
    });

    if (createdTopic.message) {
      toast.dismiss(loading);
      toast.success(createdTopic.message);
      window.localStorage.setItem("novel-content", "");
      router.push(`/admin/courses/${course_id}`);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="grid gap-3">
        <Label htmlFor="title" className="text-muted-foreground">
          type of topic
        </Label>
        <Input
          type="text"
          className="w-auto border-none focus-visible:ring-0 p-0 text-3xl font-bold"
          placeholder="Title of the topic"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={pending}
        loading={pending}
        className="disabled:cursor-not-allowed rounded-lg"
      >
        Publish
      </Button>
    </div>
  );
}
