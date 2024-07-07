import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { getStudentExamGradeByCourse } from "@/actions/course";

export default async function Grades({ courseId }: { courseId: string }) {
  const grades = await getStudentExamGradeByCourse(courseId);
  console.log(grades);
  return <div>{/* <DataTable columns={columns} data={students} /> */}</div>;
}
