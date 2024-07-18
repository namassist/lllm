import * as React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { getAllCourses } from "@/lib/data";
import FilterExplore from "@/components/filters/explore";
import CardCourse from "@/components/courses";
import { Button } from "@/components/ui/button";
import { Computer, Heater, LaptopMinimal, Router, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SearchInput from "@/components/search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const courses = await getAllCourses(query);

  return (
    <AuthLayout>
      <SearchInput />
      <Separator />
      <div className="flex justify-between items-center mb-5 mt-5">
        <h1 className="text-xl font-semibold md:text-2xl">
          Explore all courses
        </h1>
        <FilterExplore />
      </div>
      <div className="flex gap-4 mb-5">
        <Button
          variant={"outline"}
          size="sm"
          className="h-8 gap-1 hover:scale-105 transition-all"
        >
          <Zap className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Teknik Listrik
          </span>
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          className="h-8 gap-1 hover:scale-105 transition-all"
        >
          <Heater className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Teknik Elektronika
          </span>
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          className="h-8 gap-1 hover:scale-105 transition-all"
        >
          <LaptopMinimal className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Teknologi Rekayasa Komputer
          </span>
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          className="h-8 gap-1 hover:scale-105 transition-all"
        >
          <Computer className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Teknik Informatika
          </span>
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          className="h-8 gap-1 hover:scale-105 transition-all"
        >
          <Router className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Teknik Telekomunikasi
          </span>
        </Button>
      </div>
      <div className="w-full flex-col space-y-6">
        {courses.length === 0 && <p>No courses found</p>}
        <CardCourse data={courses} preview={true} />
      </div>
    </AuthLayout>
  );
}
