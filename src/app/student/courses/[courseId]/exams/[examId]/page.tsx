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
import { getExamById, startExam } from "@/actions/exam";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/session";
import StartExam from "@/components/forms/start-exam";
import Exams from "@/components/exams";
import { formatDate } from "@/lib/date";

interface PageProps {
  params: { examId: string; courseId: string };
}

export default async function Page({ params }: PageProps) {
  const exam = await getExamById(params.examId);
  const session = await getSession();

  if (exam && session) {
    const today = new Date();
    const heldAtDate = new Date(exam.held_at);
    const isValidDay =
      isSameDay(today, heldAtDate) || isAfter(today, heldAtDate);

    console.log(exam?.examAttempt);
    if (exam?.examAttempt[exam?.examAttempt.length - 1]?.isActive) {
      return <Exams exam={exam} />;
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
            Terdapat {exam?.question.length} pertanyaan yang harus dikerjakan
            dalam ujian ini. Beberapa ketentuannya sebagai berikut:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="ml-4">
              Waktu Mulai : {formatDate(exam?.held_at)} WIB
            </li>
            <li className="ml-4">Durasi : {exam?.duration} menit</li>
            <li className="ml-4">Syarat nilai kelulusan : 75%</li>
          </ul>
          <p>Selamat Mengerjakan!</p>

          {exam?.examAttempt.filter(
            (attempt) => attempt.student_id === session?.id
          ).length < 3 && (
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
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exam?.examAttempt
                .filter((attempt) => attempt.student_id === session?.id)
                .map((ex) => (
                  <TableRow key={ex.id}>
                    <TableCell className="font-medium">
                      {formatDate(ex.createdAt)}
                    </TableCell>
                    <TableCell>{ex.score}</TableCell>
                    <TableCell>
                      <Badge variant="outlinePrimary">review</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="text-xs">
                        Lihat Detail
                      </Button>
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
