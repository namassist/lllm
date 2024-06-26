import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardCourse from "@/components/courses";
import AddCourse from "@/components/forms/add-course";
import AuthLayout from "@/components/layouts/AuthLayout";
import FilterExplore from "@/components/filters/explore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getInstructorCourses } from "@/lib/data";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    const courses = await getInstructorCourses(session.user.id);

    return (
      <AuthLayout>
        <div className="flex justify-between items-center mb-5 mt-5">
          <h1 className="text-xl font-semibold md:text-2xl">My courses</h1>
          <div className="flex gap-2">
            <FilterExplore />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 gap-1 hover:bg-foreground/80 hover:scale-105 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                    New Course
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-xl h-[95vh]">
                <div className="h-2 w-40 bg-foreground/10 opacity-40 mx-auto rounded-full mb-5"></div>
                <SheetHeader className="container">
                  <AddCourse instructor_id={session?.user?.id} />
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <CardCourse data={courses} isDeleted={true} />
      </AuthLayout>
    );
  }
}
