import * as React from "react";

//components
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isSameDay, isAfter } from "date-fns";

// actions
import { getExamAttempt, getExamById, startExam } from "@/actions/exam";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/session";
import StartExam from "@/components/forms/start-exam";
import Exams from "@/components/exams";
import { formatDate } from "@/lib/date";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SheetLayout from "@/components/layouts/SheetLayout";
import ResultExam from "@/components/exams/result";

interface PageProps {
  params: { examId: string; courseId: string };
}

export default async function Page({ params }: PageProps) {
  const session = await getSession();
  const exam = await getExamById(params.examId);
  const examAttempt = await getExamAttempt(params.examId);

  if (exam && session) {
    const today = new Date();
    const heldAtDate = new Date(exam.held_at);
    const isValidDay =
      isSameDay(today, heldAtDate) || isAfter(today, heldAtDate);

    if (examAttempt[examAttempt.length - 1]?.isActive) {
      return (
        <Exams
          exam={exam}
          attemptId={examAttempt[examAttempt.length - 1].attemptId}
        />
      );
    }

    return (
      <AuthLayout isStudent>
        <div className="mt-8 space-y-6 text-foreground/70 w-full lg:w-8/12">
          <h2 className="text-xl font-semibold">Aturan Ujian</h2>
          <p>
            Ujian ini bertujuan untuk menguji pengetahuan Anda tentang mata
            kuliah {exam?.course?.title}.
          </p>
          <p>
            Terdapat beberapa pertanyaan yang harus dikerjakan dalam ujian ini.
            Beberapa ketentuannya sebagai berikut:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="ml-4">
              Waktu Mulai : {formatDate(exam?.held_at)} WIB
            </li>
            <li className="ml-4">Durasi : {exam?.duration} menit</li>
            <li className="ml-4">Syarat nilai kelulusan : 75%</li>
          </ul>
          <p>Selamat Mengerjakan!</p>

          {examAttempt.filter((attempt) => attempt.studentId === session?.id)
            .length < 3 && (
            <StartExam
              courseId={params.courseId}
              studentId={session?.id}
              examId={exam?.id}
              isValidDay={isValidDay}
            />
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examAttempt
                .filter((attempt) => attempt.studentId === session?.id)
                .map((ex) => (
                  <TableRow key={ex.attemptId}>
                    <TableCell className="font-medium">
                      {formatDate(ex.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          ex?.status === "draft"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                      >
                        {ex?.status === "draft" ? "On Review" : "Reviewed"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ex?.status === "draft" ? "??" : ex.score}
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            disabled={ex?.status === "draft" ? true : false}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Lihat Detail
                          </Button>
                        </SheetTrigger>
                        <SheetLayout>
                          <ResultExam examAttempt={ex} />
                        </SheetLayout>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </AuthLayout>
    );
  }
}
