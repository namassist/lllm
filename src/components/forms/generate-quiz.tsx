"use client";

import React, { useState } from "react";
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
import { LoaderCircle, MoveRight } from "lucide-react";

interface Option {
  option: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

export default function GenerateQuiz() {
  const [prompt, setPrompt] = useState<string>("");
  const [totalQuestion, setTotalQuestion] = useState<string>("5");
  const [withOptions, setWithOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Question[] | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

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

  return (
    <>
      <h1 className="font-bold text-4xl tracking-wide text-foreground/70 text-center">
        Generate Question
      </h1>
      <form
        className="relative w-[80%] mx-auto p-0 m-0"
        onSubmit={handleSubmit}
      >
        <Textarea
          placeholder="Pelajaran Basis Data mengenai normalisasi data"
          className="min-h-[250px] text-base placeholder:text-foreground/50 rounded-lg border-2 resize-none relative"
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
      {quizData && (
        <div className="mt-8 w-[80%] mx-auto">
          <h2 className="text-xl font-bold mb-4">Generated Quiz</h2>
          <ul className="space-y-4">
            {quizData.map((question) => (
              <li key={question.id} className="border p-4 rounded-lg">
                <p className="font-semibold">{question.question}</p>
                <ul className="mt-2 space-y-2">
                  {question.options.map((option, index) => (
                    <li
                      key={index}
                      className={`p-2 rounded ${
                        option.isCorrect ? "text-green-200" : ""
                      }`}
                    >
                      {option.option}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
