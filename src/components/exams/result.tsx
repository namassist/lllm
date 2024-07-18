"use client";

import * as React from "react";
import FeedbackButton from "@/components/buttons/feedbackButton";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CircleCheck } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateScore } from "@/actions/exam";
import toast from "react-hot-toast";

export default function ResultExam({ examAttempt }: { examAttempt: any }) {
  const [editingScores, setEditingScores] = React.useState(
    examAttempt.questionsWithAnswers.map(() => false)
  );

  const [editedScores, setEditedScores] = React.useState(
    examAttempt.questionsWithAnswers.map((q: any) => q.studentScore)
  );

  const handleEditClick = (index: number) => {
    const newEditingScores = [...editingScores];
    newEditingScores[index] = true;
    setEditingScores(newEditingScores);
  };

  const handleSaveClick = async (index: number) => {
    const newEditingScores = [...editingScores];
    newEditingScores[index] = false;
    setEditingScores(newEditingScores);
    const question = examAttempt.questionsWithAnswers[index];

    try {
      const loading = toast.loading("Updating Score...");
      const updatedScore = await updateScore({
        answerId: question.answerId,
        questionType: question.questionType,
        studentScore: editedScores[index],
      });

      if (updatedScore.message) {
        toast.success(updatedScore.message);
        toast.dismiss(loading);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScoreChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEditedScores = [...editedScores];
    const newValue = parseInt(e.target.value, 10);

    // Validasi untuk memastikan nilai tidak melebihi questionScore
    if (newValue <= examAttempt.questionsWithAnswers[index].questionScore) {
      newEditedScores[index] = newValue;
    } else {
      // Jika nilai melebihi questionScore, set nilai ke questionScore
      newEditedScores[index] =
        examAttempt.questionsWithAnswers[index].questionScore;
    }

    setEditedScores(newEditedScores);
  };

  return (
    <div className="space-y-10 pt-5 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/namassist.png" />
            <AvatarFallback>Anam</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">
            {examAttempt.fullname}
            <p className="text-sm font-normal">{examAttempt.email}</p>
          </CardTitle>
        </div>
        {examAttempt.status === "draft" && (
          <FeedbackButton attemptId={examAttempt?.attemptId} />
        )}
      </div>
      <Separator />
      <div className="flex justify-between items-start gap-5">
        <div className="space-y-4">
          <CardTitle className="text-xl">Ringkasan</CardTitle>
          <p className="text-sm leading-relaxed">{examAttempt.feedback}</p>
        </div>
      </div>
      <div className="flex justify-between items-start gap-5">
        <div className="space-y-4">
          <CardTitle className="text-xl">Kelebihan</CardTitle>
          <p className="text-sm leading-relaxed">{examAttempt.advantage}</p>
        </div>
      </div>
      <div className="flex justify-between items-start gap-5">
        <div className="space-y-4">
          <CardTitle className="text-xl">Kekurangan</CardTitle>
          <p className="text-sm leading-relaxed">{examAttempt.disadvantage}</p>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <CardTitle className="text-xl">Results</CardTitle>
        <div className="flex gap-3">
          <div className="w-3/12 border border-destructive py-5 flex justify-center items-center">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Nilai Ujian</p>
              <h4 className="text-3xl font-bold">{examAttempt.score}</h4>
            </div>
          </div>
          <div className="w-3/12 border py-5 flex justify-center items-center">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Jumlah Total Nilai</p>
              <h4 className="text-3xl font-bold">
                {examAttempt.totalPossiblePoints}
              </h4>
            </div>
          </div>
          <div className="w-3/12 border py-5 flex justify-center items-center">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Jumlah Soal dijawab</p>
              <h4 className="text-3xl font-bold">
                {examAttempt.totalQuestionsAnswered}
              </h4>
            </div>
          </div>
          <div className="w-3/12 border py-5 flex justify-center items-center">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Jumlah Total Soal</p>
              <h4 className="text-3xl font-bold">
                {examAttempt.totalQuestionsAnswered}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <CardTitle className="text-xl">Daftar Jawaban</CardTitle>
        {examAttempt?.questionsWithAnswers.map((data: any, index: number) => (
          <Card className="w-full" key={data.questionId}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {data.questionType === "multiple choice" ? (
                    <Badge
                      className={`${
                        data.correctAnswer === data.studentAnswer
                          ? "bg-green-200"
                          : "bg-red-400"
                      }`}
                    >
                      {`${
                        data.correctAnswer === data.studentAnswer
                          ? "benar"
                          : "salah"
                      }`}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-300">
                      review
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex gap-2">
                  {data.questionType === "multiple choice" && (
                    <Badge variant="secondary">{data.studentScore} poin</Badge>
                  )}
                  {data.questionType !== "multiple choice" && (
                    <>
                      {editingScores[index] ? (
                        <>
                          <input
                            type="number"
                            value={editedScores[index]}
                            onChange={(e) => handleScoreChange(index, e)}
                            max={data.questionScore}
                            className="text-sm text-center"
                          />
                          <button
                            onClick={() => handleSaveClick(index)}
                            className="text-sm text-blue-500"
                          >
                            Simpan
                          </button>
                        </>
                      ) : (
                        <>
                          <Badge variant="secondary">
                            {data.studentScore} poin {examAttempt}
                          </Badge>
                          {examAttempt?.status === "draft" && (
                            <button
                              onClick={() => handleEditClick(index)}
                              className="text-sm text-blue-500"
                            >
                              Edit
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <CardTitle className="capitalize pt-2">
                {data.questionText}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="leading-relaxed">
                <p className="font-medium">
                  <AlertCircle className="h-3 w-3 text-yellow-400 inline mr-1" />
                  {data.studentAnswer}
                </p>
              </div>
              <Separator />
              <div className="leading-relaxed">
                <p className="text-foreground/70">
                  <CircleCheck className="h-4 w-4 text-green-400 inline mr-1" />
                  {data.correctAnswer}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
