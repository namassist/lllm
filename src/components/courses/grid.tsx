import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardTag,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Course } from "@/types/listCourse";
import DeleteButton from "@/components/buttons";

interface CardCourseProps {
  data: Course[];
  isDeleted: Boolean;
  preview?: Boolean;
}

const Grid: React.FC<CardCourseProps> = ({
  data,
  isDeleted = false,
  preview,
}) => {
  return (
    <div className="w-full flex flex-wrap items-center gap-6">
      {data.map((course) => (
        <Card className="w-full lg:w-[calc(33%_-_1.15rem)]" key={course?.id}>
          <div className="relative">
            <CardImage
              src={course?.image}
              alt={`picture of ${course?.title}`}
              width={300}
              height={150}
            />
            <CardTag>Teknologi Rekayasa Komputer</CardTag>
          </div>
          <CardHeader className="p-4">
            <CardTitle>{course?.title}</CardTitle>
            <CardContent className="p-0">
              <div className="flex gap-1 items-center pt-2">
                <Avatar className="h-6 w-6 border-muted border-2 shadow-sm">
                  <AvatarImage src="https://github.com/vampirepapi.png" />
                  <AvatarFallback>
                    {course?.instructor?.fullname}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground/70 text-sm">
                  {course?.instructor?.fullname}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-0 px-0">
              <Link
                href={`/admin/courses/${course?.id}${
                  preview ? "/preview" : "/"
                }`}
                className="ml-auto"
              >
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 text-foreground mr-1" /> Detail
                </Button>
              </Link>
              {isDeleted && <DeleteButton id={course?.id} />}
            </CardFooter>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Grid;
