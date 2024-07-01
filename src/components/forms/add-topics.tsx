"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus, useFormState } from "react-dom";
import { saveTopic } from "@/actions/topic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialState = {
  message: "",
  course_id: "",
};

export default function AddTopics({ course_id }: { course_id: string }) {
  const router = useRouter();
  const [state, formAction] = useFormState(saveTopic, initialState);
  const [desc, setDesc] = React.useState<string>("");

  React.useEffect(() => {
    const savedValue = window.localStorage.getItem("novel-content") as string;
    setDesc(savedValue);

    if (state?.message) {
      window.localStorage.setItem("novel-content", "");
      toast.success(state?.message);
      router.push(`/admin/courses/${course_id}`);
    }
  }, [course_id, desc, router, setDesc, state?.message]);

  return (
    <form action={formAction} className="flex justify-between">
      <div className="grid gap-3">
        <Label htmlFor="title" className="text-muted-foreground">
          type of topic
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          className="w-auto border-none focus-visible:ring-0 p-0 text-3xl font-bold"
          placeholder="Title of the topic"
          required
        />
        <input type="hidden" name="description" value={desc} required />
        <input type="hidden" name="course_id" value={course_id} required />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      loading={pending}
      className="disabled:cursor-not-allowed rounded-lg"
    >
      Publish
    </Button>
  );
}
