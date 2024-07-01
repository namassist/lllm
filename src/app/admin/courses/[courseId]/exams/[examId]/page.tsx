import * as React from "react";

//components
import { Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import AddExam from "@/components/forms/add-exam";
import AddQuestion from "@/components/forms/add-question";
import SheetLayout from "@/components/layouts/SheetLayout";
import QuestionList from "@/components/lists/question-list";
import GenerateQuiz from "@/components/forms/generate-quiz";
import AuthLayout from "@/components/layouts/AuthLayout";

// actions
import { getExamById } from "@/actions/exam";
import QuestionCard from "@/components/cards/question";

interface PageProps {
  params: { examId: string; courseId: string };
}

export default async function Page({ params }: PageProps) {
  const exam = await getExamById(params.examId);

  return (
    <AuthLayout>
      <div className="space-y-5">
        <AddExam data={exam} />
        <div className="flex gap-2 justify-between">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[400px] rounded-lg focus-visible:ring-0"
          />
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-lg">
                  <Sparkles className="h-4 w-4 mr-1" /> Generate with AI
                </Button>
              </SheetTrigger>
              <SheetLayout>
                <GenerateQuiz examId={params?.examId as string} />
              </SheetLayout>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-1 rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                    Question
                  </span>
                </Button>
              </SheetTrigger>
              <SheetLayout>
                <AddQuestion
                  examId={exam?.id as string}
                  courseId={params?.courseId as string}
                />
              </SheetLayout>
            </Sheet>
          </div>
        </div>
        <div className="space-y-5">
          {exam?.question?.length === 0 && <div>no questions available</div>}
          {exam?.question?.map((data) => (
            <QuestionCard key={data.id} question={data} withAction />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
