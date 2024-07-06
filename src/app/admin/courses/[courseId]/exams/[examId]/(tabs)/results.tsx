import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    CircleCheck,
    AlertCircle,
  } from "lucide-react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/date";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SheetLayout from "@/components/layouts/SheetLayout";
import { Button } from '@/components/ui/button';
import { getExamAttempt } from '@/actions/exam';
import FeedbackButton from '@/components/buttons/feedbackButton';

export default async function Results() {
  const examGroup = await getExamAttempt();

  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Student</TableHead>
        <TableHead>Tanggal</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Score</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {examGroup?.map((data:any) => (
        <TableRow key={data.id}>
          <TableCell className="font-medium">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/namassist.png" />
                <AvatarFallback>{data.fullname}</AvatarFallback>
              </Avatar>
              <CardTitle>{data.fullname}</CardTitle>
            </div>
          </TableCell>
          <TableCell>{formatDate(data.createdAt)}</TableCell>
          <TableCell>
            <Badge variant="outlinePrimary">review</Badge>
          </TableCell>
          <TableCell>{data.score}</TableCell>
          <TableCell>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Lihat Detail
                </Button>
              </SheetTrigger>
              <SheetLayout>
                <div className="space-y-10 pt-5 pb-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/namassist.png" />
                        <AvatarFallback>Anam</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">
                        {data.fullname}
                        <p className="text-sm font-normal">
                        {data.email}
                        </p>
                      </CardTitle>
                    </div>
                    {data.status === "draft" && 
                      <FeedbackButton attemptId={data.attemptId} />
                    }
                  </div>
                  <Separator />
                  <div className="flex justify-between items-start gap-5">
                    <div className="space-y-4">
                      <CardTitle className="text-xl">
                        Ringkasan
                      </CardTitle>
                      <p className="text-sm leading-relaxed">
                        {data.feedback}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <div className="space-y-4">
                      <CardTitle className="text-xl">
                        Kelebihan
                      </CardTitle>
                      <p className="text-sm leading-relaxed">
                      {data.advantage}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <div className="space-y-4">
                      <CardTitle className="text-xl">
                        Kekurangan
                      </CardTitle>
                      <p className="text-sm leading-relaxed">
                        {data.disadvantage}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <CardTitle className="text-xl">Results</CardTitle>
                    <div className="flex gap-3">
                      <div className="w-3/12 border border-destructive py-5 flex justify-center items-center">
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium">Nilai Ujian</p>
                          <h4 className="text-3xl font-bold">{data.score}</h4>
                        </div>
                      </div>
                      <div className="w-3/12 border py-5 flex justify-center items-center">
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium">Jumlah Total Nilai</p>
                          <h4 className="text-3xl font-bold">{data.totalPossiblePoints}</h4>
                        </div>
                      </div>
                      <div className="w-3/12 border py-5 flex justify-center items-center">
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium">Jumlah Soal dijawab</p>
                          <h4 className="text-3xl font-bold">{data.totalQuestionsAnswered}</h4>
                        </div>
                      </div>
                      <div className="w-3/12 border py-5 flex justify-center items-center">
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium">Jumlah Total Soal</p>
                          <h4 className="text-3xl font-bold">{data.totalQuestionsAnswered}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <CardTitle className="text-xl">
                      Daftar Jawaban
                    </CardTitle>
                    {data?.questionsWithAnswers.map((data:any)=>(
                    <Card className="w-full" key={data.questionId}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>
                          {data.questionType === "multiple choice" ? 
                            <Badge
                            className={`${data.correctAnswer === data.studentAnswer ? "bg-green-200" : "bg-red-400"}`}
                            >
                              {`${data.correctAnswer === data.studentAnswer ? "benar" : "salah"}`}
                            </Badge>
                              : 
                            <Badge
                            variant="outline"
                            className="bg-yellow-300"
                            >
                              review
                            </Badge>
                              }
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              {data.studentScore} poin
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="capitalize pt-2">
                          {data.questionText}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div className="leading-relaxed">
                          <p>
                            <AlertCircle className='h-4 w-4 text-yellow-400 inline'/> Jawaban User:
                          </p>
                          <p className='font-medium'>{data.studentAnswer}</p>
                        </div>
                        <Separator />
                        <div className="leading-relaxed">
                          <p>
                            <CircleCheck className='h-4 w-4 text-green-400 inline'/> Jawaban Benar:
                          </p>
                          <p className='text-foreground/70'>{data.correctAnswer}</p>
                        </div>
                      </CardContent>
                    </Card>
                    ))}
                  </div>
                </div>
              </SheetLayout>
            </Sheet>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}
