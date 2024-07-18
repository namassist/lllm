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
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createdDiscuss } from "@/actions/discussion";
import toast from "react-hot-toast";

export default function AddDiscussion({ courseId }: { courseId: string }) {
  const formSchema = z.object({
    title: z
      .string({
        required_error: "title is required",
      })
      .min(6, "title is required"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(6, "Description is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loading = toast.loading("submitting...");
    const createdDiscussion = await createdDiscuss({
      ...values,
      course_id: courseId,
    });

    if (createdDiscussion.message) {
      toast.dismiss(loading);
      toast.success(createdDiscussion.message);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="border-primary border h-10"
                  placeholder="What is your title"
                  {...field}
                />
              </FormControl>
              <FormDescription>Give your discussion a title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  onValueChange={field.onChange}
                  outputValue="json"
                  className={cn("w-full min-h-60 shadow-sm", {
                    "border-red-500 focus-within:border-red-500":
                      form.formState.errors.description,
                  })}
                />
              </FormControl>
              <FormDescription>
                Give your discussion a description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
