"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { createdReply } from "@/actions/reply";

export default function AddReply({ discussionId }: { discussionId: string }) {
  const formSchema = z.object({
    reply: z
      .string({
        required_error: "Reply is required",
      })
      .min(1, "Reply is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const loading = toast.loading("submitting...");
      const createdReplys = await createdReply({
        ...values,
        discussion_id: discussionId,
      });

      if (createdReplys.message) {
        toast.dismiss(loading);
        toast.success(createdReplys.message);
        form.reset({ reply: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 pb-4"
      >
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  onValueChange={field.onChange}
                  outputValue="json"
                  className={cn("w-full min-h-40 shadow-sm", {
                    "border-red-500 focus-within:border-red-500":
                      form.formState.errors.reply,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Reply</Button>
        </div>
      </form>
    </Form>
  );
}
