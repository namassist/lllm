import React from "react";
import { getExamAttempt } from "@/actions/exam";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default async function Results({ examId }: { examId: string }) {
  const examGroup = await getExamAttempt(examId);
  console.log(examGroup);
  console.log(examGroup[1].questionsWithAnswers);

  return <DataTable columns={columns} data={examGroup} />;
}
