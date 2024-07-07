"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { shuffleArray } from "@/lib/shuffle";
import { submittedAnswer } from "@/actions/exam";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Exams({ exam, attemptId }: any) {
  const router = useRouter();
  const [time, setTime] = useState(100 * exam?.duration);
  const [fontSize, setFontSize] = useState([16]);
  const [shuffledExam, setShuffledExam] = useState(null);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState({});
  const [essayAnswers, setEssayAnswers] = useState({});

  useEffect(() => {
    if (exam) {
      const shuffledQuestions = shuffleArray([...exam.question]);
      shuffledQuestions.forEach((question: any) => {
        question.choice = shuffleArray([...question.choice]);
      });
      setShuffledExam({ ...exam, question: shuffledQuestions });
    }
  }, [exam]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [time]);

  useEffect(() => {
    const questionElement = document.getElementById("question");
    if (questionElement) {
      questionElement.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  const handleMultipleChoiceChange = (questionId: string, choiceId: string) => {
    setMultipleChoiceAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }));
  };

  const handleEssayChange = (questionId: string, answer: string) => {
    setEssayAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = async () => {
    const answers = {
      multipleChoice: Object.keys(multipleChoiceAnswers).map((questionId) => ({
        attemptId: attemptId,
        questionId,
        choiceId: multipleChoiceAnswers[questionId],
      })),
      essay: Object.keys(essayAnswers).map((questionId) => ({
        attemptId: attemptId,
        questionId,
        answer: essayAnswers[questionId],
      })),
      attemptId: attemptId,
    };

    try {
      const loading = toast.loading("Submitting...");
      const submitted = await submittedAnswer(answers);

      if (submitted?.message) {
        toast.dismiss(loading);
        toast.success(submitted?.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isQuestionAnswered = (questionId: string) => {
    return (
      multipleChoiceAnswers.hasOwnProperty(questionId) ||
      essayAnswers.hasOwnProperty(questionId)
    );
  };

  return (
    <main className="py-5">
      <div className="container flex gap-6 relative">
        <div className="w-2/12 space-y-4 fixed right-10">
          <Card className="space-y-4">
            <div className="px-6 pt-6">
              <div className="bg-foreground text-background rounded-md flex items-center p-2 px-4 w-full">
                <Timer className="h-5 w-5 mr-2" />
                <p className="text-lg">{formatTime(time)}</p>
              </div>
            </div>
            <Separator />
            <CardContent className="space-y-4">
              <div className="flex flex-row gap-6 items-center">
                <span className="text-sm">FontSize</span>
                <Slider
                  min={14}
                  max={20}
                  step={1}
                  onValueChange={(i) => setFontSize(i)}
                  defaultValue={fontSize}
                />
              </div>
              <div className="flex flex-row gap-6 items-center">
                <span className="text-sm">FontSize</span>
                <Slider
                  min={14}
                  max={20}
                  step={1}
                  onValueChange={(i) => setFontSize(i)}
                  defaultValue={fontSize}
                />
              </div>
              <div className="flex flex-row gap-6 items-center">
                <span className="text-sm">FontSize</span>
                <Slider
                  min={14}
                  max={20}
                  step={1}
                  onValueChange={(i) => setFontSize(i)}
                  defaultValue={fontSize}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="space-y-4 py-6">
            <CardHeader className="py-0">
              <CardTitle className="text-center">Shortcut</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pb-0">
              <div className="flex flex-wrap gap-0">
                {shuffledExam?.question?.map((question: any, index: number) => (
                  <Link
                    key={question?.id}
                    href={`#question${index + 1}`}
                    className="w-[25%]"
                  >
                    <Button
                      variant="outline"
                      className={`rounded-none w-full ${
                        isQuestionAnswered(question.id)
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {index + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
            <Separator />
            <CardContent className="pb-0">
              <Button className="w-full" onClick={handleSubmit}>
                Tandai Selesai
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="w-10/12 space-y-6" id="question">
          {shuffledExam?.question.map((question: any, index: number) => (
            <Card
              key={question?.id}
              className="w-full rounded-tl-none"
              id={`question${index + 1}`}
            >
              <Badge className="rounded-none">No {index + 1}</Badge>
              <CardHeader>
                <CardTitle>{question?.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue=""
                  onValueChange={(choiceId) =>
                    handleMultipleChoiceChange(question.id, choiceId)
                  }
                  className="space-y-3"
                >
                  {question?.choice?.length === 1 ? (
                    <Textarea
                      placeholder="Jawaban"
                      className="h-20 w-8/12"
                      onChange={(e) =>
                        handleEssayChange(question.id, e.target.value)
                      }
                    />
                  ) : (
                    question?.choice?.map((option: any, index: number) => (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id}>{option.choice}</Label>
                      </div>
                    ))
                  )}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
