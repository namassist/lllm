import * as React from "react";
import CardCourse from "@/components/courses";
import AuthLayout from "@/components/layouts/AuthLayout";
import FilterExplore from "@/components/filters/explore";
import { getSession } from "@/lib/session";
import { getStudentCourses } from "@/actions/course";

export default async function Page() {
  const session = await getSession();

  if (session?.id) {
    const courses = await getStudentCourses(session?.id);

    return (
      <AuthLayout isStudent>
        <div className="flex justify-between items-center mb-5 mt-5">
          <h1 className="text-xl font-semibold md:text-2xl">My courses</h1>
          <div className="flex gap-2">
            <FilterExplore />
          </div>
        </div>
        <CardCourse data={courses} enrollable />
      </AuthLayout>
    );
  }
}
