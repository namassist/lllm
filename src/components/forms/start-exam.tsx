"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { startExam } from "@/actions/exam";

export default function StartExam({ studentId, examId, isValidDay }: any) {
  const handleStartExam = () => {
    const startedExam = startExam({
      examId: examId,
      studentId: studentId,
    });
  };
  return (
    <div>
      <Button
        size="sm"
        className="px-8 rounded-sm bg-primary/80 mb-5"
        disabled={!isValidDay}
        onClick={handleStartExam}
      >
        Mulai
      </Button>
    </div>
  );
}
