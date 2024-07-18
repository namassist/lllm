import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Calendars from "@/components/calendars";
import AuthLayout from "@/components/layouts/AuthLayout";
import { PiCalendarBold, PiCaretRightBold } from "react-icons/pi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Course from "@/components/cards/course";
import { getSession } from "@/lib/session";
import { getUpcomingExamsInstructor } from "@/actions/exam";
import { formatDateWithTimezone } from "@/lib/date";
import { getInstructorCourses } from "@/lib/data";
import { SquareArrowOutUpRight } from "lucide-react";

export default async function Page() {
  const session = await getSession();

  if (session?.id) {
    const courses = await getInstructorCourses(session?.id, 2);
    const upcomingExam = await getUpcomingExamsInstructor(session?.id);

    return (
      <AuthLayout>
        <section className="w-full flex flex-col lg:flex-row gap-8 pb-4">
          <div className="w-full lg:w-9/12 text-gray-50 space-y-8">
            <div className="w-full h-40 bg-indigo-500 rounded-lg flex flex-col justify-center px-10 space-y-2 relative">
              <h4 className="text-xl font-normal">Welcome Back</h4>
              <h2 className="text-4xl font-bold">{session?.name}</h2>
              <Image
                className="absolute right-0 bottom-0 scale-x-[-1]"
                src="/readinh.svg"
                alt="icon logo"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-end justify-between">
                <h4 className="text-indigo-400 text-xl font-bold">My Course</h4>
                <Link
                  href={"/student/courses"}
                  className="dark:text-indigo-400 p-0 h-auto font-semibold uppercase text-xs text-gray-400 flex items-center gap-1 hover:text-gray-500"
                >
                  See All <PiCaretRightBold />
                </Link>
              </div>
              <div className="w-full flex gap-8">
                {courses?.length === 0 && (
                  <p className="text-foreground/70">Course not found</p>
                )}
                {courses?.map((course: any, index: number) => (
                  <Course
                    key={index}
                    type="instructor"
                    course={course}
                    className="w-full lg:w-6/12 mb-2"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/12 space-y-8">
            <Card className="drop-shadow-sm min-h-[20rem] dark:bg-[#4F506C] dark:border-bgPrimary">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-base text-indigo-400 font-semibold ">
                  <PiCalendarBold className="inline mr-1" />
                  Upcoming Exams
                  <hr className="mt-2 mb-4 w-8/12 mx-auto dark:border-indigo-400" />
                </CardTitle>
                <CardContent className="p-0">
                  {upcomingExam?.map((exam: any) => (
                    <div
                      key={exam?.id}
                      className="text-xs text-gray-600 dark:text-gray-200 leading-relaxed mb-4"
                    >
                      <Link
                        href={`/admin/courses/${exam?.course?.id}/exams/${exam?.id}`}
                        className="overflow-hidden text-ellipsis whitespace-nowrap capitalize underline flex items-center gap-1"
                      >
                        {exam?.name}
                        <SquareArrowOutUpRight className="h-2.5 w-2.5" />
                      </Link>
                      <p>{formatDateWithTimezone(exam?.held_at)}</p>
                      <hr className="mt-1" />
                    </div>
                  ))}
                </CardContent>
              </CardHeader>
            </Card>
            <div className="drop-shadow-sm max-h-[22rem] border-[1px] rounded-md shadow-sm dark:bg-[#4F506C] dark:border-bgPrimary">
              <Calendars />
            </div>
          </div>
        </section>
      </AuthLayout>
    );
  }
}
