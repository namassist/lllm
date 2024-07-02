"use client";

import Lottie from "lottie-react";
import toast from "react-hot-toast";
import React, { useState } from "react";
import AnimateLoading from "@/styles/loading.json";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoveRight, Save } from "lucide-react";
import QuestionCard from "../cards/question";
import { createBulkQuestion } from "@/actions/question";

interface Option {
  option: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  score: number;
  options: Option[];
}

export default function GenerateQuiz({ examId }: { examId: string }) {
  const [prompt, setPrompt] = useState<string>("");
  const [totalQuestion, setTotalQuestion] = useState<string>("5");
  const [withOptions, setWithOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Question[] | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setQuizData(null);

    const response = await fetch("/api/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        totalQuestion,
        withOptions,
      }),
    });

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      setQuizData(data.questions);
    } else {
      const error = await response.json();
      console.error("Error generating quiz:", error);
    }
  };

  const handleSaveQuestion = async () => {
    try {
      const loading = toast.loading("submitting...");
      const createdBulkQuestion = await createBulkQuestion(quizData, examId);

      if (createdBulkQuestion?.message) {
        toast.dismiss(loading);
        toast.success(createdBulkQuestion?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-[80%] mx-auto space-y-5">
      <h1 className="font-bold text-4xl tracking-wide text-foreground/70 text-center">
        Generate Question
      </h1>
      <form className="relative p-0 m-0" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Pelajaran Basis Data mengenai normalisasi data"
          className="min-h-[250px] text-lg placeholder:text-foreground/50 rounded-lg border-2 resize-none relative"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <div className="absolute bottom-5 left-5 flex justify-between items-center w-[95%]">
          <div className="flex gap-2 items-center">
            <Select
              onValueChange={(value) => setTotalQuestion(value)}
              disabled={loading}
            >
              <SelectTrigger id="value" className="w-14">
                <SelectValue placeholder={totalQuestion} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch
                id="with-options"
                checked={withOptions}
                onCheckedChange={(checked) => setWithOptions(checked)}
                disabled={loading}
              />
              <Label htmlFor="airplane-mode">With Option</Label>
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            className="gap-1 rounded-lg h-8"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <MoveRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
      {loading && (
        <div className="w-40 h-40 mx-auto">
          <Lottie animationData={AnimateLoading} loop={true} />
        </div>
      )}
      {quizData && (
        <>
          {quizData.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
          <div className="flex justify-end pb-5">
            <Button
              className="rounded-lg"
              size="sm"
              onClick={handleSaveQuestion}
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
