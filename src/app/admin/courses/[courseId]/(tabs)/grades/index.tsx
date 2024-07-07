import React from "react";
import { DataTable } from "./data-table";
import { getStudentExamGradeByCourse } from "@/actions/course";

export default async function Grades({ courseId }: { courseId: string }) {
  const grades = await getStudentExamGradeByCourse(courseId);
  return <DataTable newColumns={grades?.columns} data={grades?.data} />;
}
