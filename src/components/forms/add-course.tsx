"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCourse } from "@/actions/course";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";

const initialState = {
  message: "",
};

export default function AddCourse({ instructor_id, categories }: any) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(saveCourse, initialState);
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleSelectChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value);
  };

  React.useEffect(() => {
    if (state?.message) {
      toast({
        description: state?.message,
      });
    }
  }, [state?.message, toast]);

  return (
    <form action={formAction} className="flex gap-4 lg:gap-8">
      <Card className="md:w-full lg:w-8/12">
        <CardHeader>
          <CardTitle className="text-xl">Course Detail</CardTitle>
          <CardDescription>
            What would you like to name your course?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                name="title"
                type="text"
                className="w-full"
                defaultValue="Course Name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                className="min-h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="md:w-full lg:w-4/12">
        <CardHeader>
          <CardTitle className="text-xl">Course Category</CardTitle>
          <CardDescription>select the category of your course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="category_id">Category</Label>
              <Select onValueChange={handleSelectCategory}>
                <SelectTrigger id="category_id" aria-label="Select category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="category_id"
                value={selectedCategory}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isPublished">Status</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger
                  id="isPublished"
                  name="isPublished"
                  aria-label="Select status"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Draft</SelectItem>
                  <SelectItem value="true">Published</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="isPublished" value={selectedStatus} />
              <input type="hidden" name="instructor_id" value={instructor_id} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="key">Key Enrollment</Label>
              <Input
                id="key"
                name="key"
                type="text"
                className="w-full"
                defaultValue="INTRO4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
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
      className="disabled:cursor-not-allowed"
    >
      Save
    </Button>
  );
}
