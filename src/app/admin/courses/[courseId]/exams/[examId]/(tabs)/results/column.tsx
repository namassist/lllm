"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import SheetLayout from "@/components/layouts/SheetLayout";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ResultExam from "@/components/exams/result";

export type QuestionDetail = {
  questionId: string;
  questionText: string;
  questionScore: number;
  questionType: string;
  correctAnswer: string;
  studentAnswer: string;
  studentScore: number;
};

export type ExamAttempt = {
  attemptId: string;
  fullname: string;
  email: string;
  status: "draft" | "publish";
  feedback: string;
  advantage: string;
  disadvantage: string;
  examName: string;
  score: number;
  createdAt: Date;
  totalPossiblePoints: number;
  totalQuestionsAnswered: number;
  questionsWithAnswers: QuestionDetail[];
};

export const columns: ColumnDef<ExamAttempt>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "fullname",
    header: "Student",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/namassist.png" />
            <AvatarFallback>{row.original.fullname}</AvatarFallback>
          </Avatar>
          <CardTitle>{row.original.fullname}</CardTitle>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatDate(row.original.createdAt);
      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={`${
            status === "publish" ? "bg-green-400" : "bg-yellow-400"
          }`}
        >
          {status === "publish" ? "Reviewed" : "On Review"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    id: "actions",
    header: "Detail",
    cell: ({ row }) => {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="text-xs">
              Lihat Detail
            </Button>
          </SheetTrigger>
          <SheetLayout>
            <ResultExam examAttempt={row.original} />
          </SheetLayout>
        </Sheet>
      );
    },
  },
];
