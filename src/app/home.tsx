"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";

interface Question {
  question: string;
  options: string[];
  answer?: number;
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const parseQuestions = (message: string): Question[] => {
      const lines = message.split("\n");
      const parsedQuestions: Question[] = [];
      let currentQuestion: Question | null = null;

      lines.forEach((line) => {
        if (line.startsWith("(q)")) {
          if (currentQuestion) {
            parsedQuestions.push(currentQuestion);
          }
          currentQuestion = { question: line.slice(4).trim(), options: [] };
        } else if (/^[abcd]\./.test(line)) {
          if (currentQuestion) {
            currentQuestion.options.push(line.slice(3).trim());
          }
        } else if (line.startsWith("(r)")) {
          if (currentQuestion) {
            currentQuestion.answer = currentQuestion.options.length - 1;
          }
        }
      });

      if (currentQuestion) {
        parsedQuestions.push(currentQuestion);
      }

      return parsedQuestions;
    };

    const assistantMessage = messages.find((m) => m.role === "assistant");
    if (assistantMessage) {
      const parsedQuestions = parseQuestions(assistantMessage.content);
      setQuestions(parsedQuestions);
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded shadow-xl text-gray-900"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>

      <div className="mt-4">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-semibold">{q.question}</p>
            {q.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={i}
                  id={`question-${idx}-option-${i}`}
                  className="mr-2"
                />
                <label htmlFor={`question-${idx}-option-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
