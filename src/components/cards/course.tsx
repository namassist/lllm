import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";

export default function Course({
  course,
  className,
  type = "student",
}: {
  course: any;
  className: string;
  type?: "student" | "instructor";
}) {
  return (
    <Link
      href={
        type === "instructor"
          ? `/admin/courses/${course?.id}`
          : `/student/courses/${course?.id}`
      }
      className={`${className} relative border border-transparent border-dashed cursor-pointer group`}
    >
      <div className="absolute w-full h-full border border-dashed rounded-lg inset-0 z-20 duration-300 ease-out border-indigo-500 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
      <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-lg border-indigo-500 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"></div>
      <Card className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 border-dashed border border-transparent border-indigo-500 h-full">
        <CardContent className="p-4 space-y-2">
          <p className="uppercase text-xs text-gray-400/95 overflow-hidden text-ellipsis whitespace-nowrap">
            {course?.categories?.name}
          </p>
          <p className="text-sm font-bold text-gray-600/90 overflow-hidden text-ellipsis whitespace-nowrap">
            {course?.title}
          </p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            {course?.description}
          </p>
          <p className="uppercase text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            {course?.instructor?.fullname}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
