import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightCircle, BookUser, NotebookText, Users } from "lucide-react";
import { getCoursesById } from "@/actions/course";
import { redirect } from "next/navigation";
import EnrollmentCourse from "@/components/forms/enrollment-course";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getSession();
  const course = await getCoursesById(params.courseId);

  if (!course) {
    redirect("/student/explores");
  }

  if (course) {
    return (
      <AuthLayout isStudent>
        <div className="w-full flex gap-8 mt-10">
          <div className="w-full lg:w-8/12 space-y-5">
            <Image
              src={course?.image as string}
              width={1000}
              height={1000}
              className="w-full h-[300px] object-cover rounded-md"
              alt="image"
            />
            <Card>
              <CardHeader className="pb-4 space-y-0">
                <CardTitle className="text-xl">{course?.title}</CardTitle>
                <CardDescription>
                  Created by {course?.instructor?.fullname}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-4">
                <p>{course?.description}</p>
                <div className=" flex gap-2">
                  <Badge className="bg-destructive/90 p-1 px-2 flex items-center">
                    <NotebookText className="h-4 w-4 mr-1" />{" "}
                    {course?.topics?.length === 0
                      ? "??"
                      : course?.topics?.length}{" "}
                    Topics
                  </Badge>
                  <Badge className="bg-destructive/90 p-1 px-2 flex items-center">
                    <BookUser className="h-4 w-4 mr-1" />{" "}
                    {course?.exam?.length === 0 ? "??" : course?.exam?.length}{" "}
                    Exam
                  </Badge>
                  <Badge className="bg-destructive/90 p-1 px-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />{" "}
                    {course?.enrollmentCourse?.length === 0
                      ? "??"
                      : course?.enrollmentCourse?.length}{" "}
                    Student
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-4/12 h-[200px] border rounded-md p-6 text-foreground/90 flex items-center">
            <div className="space-y-6">
              <h4 className="font-semibold text-xl">
                Ready to Elevate Your Skills?
              </h4>
              <p className="text-sm text-foreground/70">
                Discover a world with our comprehensive courses and take your
                learning to the next level!
              </p>
              {course?.enrollmentCourse?.length === 0 ? (
                <EnrollmentCourse
                  courseId={course.id as string}
                  studentId={session?.id as string}
                />
              ) : (
                <Link
                  href={`/student/courses/${course.id}`}
                  className="inline-block w-full"
                >
                  <Button size="sm" className="w-full">
                    <ArrowRightCircle className="h-4 w-4 mr-1" /> Go to course
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}
