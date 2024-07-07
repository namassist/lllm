import React from "react";
import { getExamAttempt } from "@/actions/exam";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default async function Results() {
  const examGroup = await getExamAttempt();

  return <DataTable columns={columns} data={examGroup} />;
}
