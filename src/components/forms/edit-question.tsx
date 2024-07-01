"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Check, Trash, Plus } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { createQuestion } from "@/actions/question";

interface Option {
  choice: string;
  isCorrect: boolean;
  image?: string;
}

export default function EditQuestion({ questions }: { questions: any }) {
  console.log(questions);
  const [question, setQuestion] = useState(questions?.question);
  const [score, setScore] = useState<number>(questions?.score);
  const [options, setOptions] = useState<Option[]>(questions?.choice);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    questions.choice.findIndex((option: any) => option.is_correct)
  );

  const addOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { choice: "", isCorrect: false },
    ]);
  };

  const handleInput = (index: number, value: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, choice: value } : option
      )
    );
  };

  const handleCheck = (index: number) => {
    setSelectedOptionIndex(index);
    setOptions((prevOptions) =>
      prevOptions.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }))
    );
  };

  const handleDelete = (index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    if (selectedOptionIndex === index) {
      setSelectedOptionIndex(null);
    } else if (selectedOptionIndex !== null && selectedOptionIndex > index) {
      setSelectedOptionIndex((prevIndex) =>
        prevIndex !== null ? prevIndex - 1 : null
      );
    }
  };

  const handleSubmit = async () => {
    if (!options.some((option) => option.isCorrect)) {
      return toast.error("At least one option must be correct");
    }

    try {
      const createdQuestion = await createQuestion({
        question,
        score,
        choice: options,
      });

      if (createdQuestion?.message) {
        toast.success(createdQuestion?.message);
        setQuestion("");
        setScore(0);
        setOptions([]);
        setSelectedOptionIndex(null);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-[80%] mx-auto space-y-5">
      <Textarea
        placeholder="Type your question here..."
        className="min-h-[200px] text-lg placeholder:text-foreground/50 rounded-lg border-2 resize-none relative"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(parseInt(e.target.value))}
        placeholder="Score"
      />
      <p className="text-muted-foreground text-xs">Pilihan Jawaban</p>

      {/* Options */}
      {options?.map((option, index) => (
        <div className="relative" key={index}>
          <div
            contentEditable
            data-placeholder="Type option here..."
            className={`p-4 min-h-[100px] max-h-[400px] border rounded-lg text-sm text-foreground/60 focus:ring-0 ${
              selectedOptionIndex === index
                ? "border-purple-500"
                : "border-muted"
            }`}
            onBlur={(e) =>
              handleInput(index, e.currentTarget.textContent || "")
            }
            suppressContentEditableWarning={true}
          >
            {option.choice}
          </div>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              type="button"
              onClick={() => handleCheck(index)}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="cursor-pointer"
              onClick={() => handleDelete(index)}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        className="rounded-lg"
        variant="outline"
        size="sm"
        type="button"
        onClick={addOption}
      >
        <Plus className="h-4 w-4 mr-1" /> Add option
      </Button>
      <div className="flex justify-end pb-5">
        <Button onClick={handleSubmit} className="rounded-lg" size="sm">
          <Save className="h-4 w-4 mr-1" /> Save
        </Button>
      </div>
    </div>
  );
}
