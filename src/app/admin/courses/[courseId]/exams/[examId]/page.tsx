import * as React from "react";
import Link from "next/link";

//components
import { Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddExam from "@/components/forms/add-exam";
import AddQuestion from "@/components/forms/add-question";
import SheetLayout from "@/components/layouts/SheetLayout";
import GenerateQuiz from "@/components/forms/generate-quiz";
import AuthLayout from "@/components/layouts/AuthLayout";
import QuestionCard from "@/components/cards/question";
import Results from "./(tabs)/results";

// actions
import { getExamById } from "@/actions/exam";

interface PageProps {
  params: { examId: string; courseId: string };
  searchParams: {
    tab: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  const exam = await getExamById(params.examId);

  let currentTab = searchParams.tab ?? "question";

  if (currentTab !== "results") {
    currentTab = "question";
  }

  return (
    <AuthLayout>
      <div className="space-y-5">
        <AddExam data={exam} />
        <Tabs defaultValue={currentTab} className="space-y-5">
          <TabsList className="w-full lg:w-3/12 grid grid-cols-2">
            <TabsTrigger value="question" asChild>
              <Link href={{ query: { tab: "question" } }}>Questions</Link>
            </TabsTrigger>
            <TabsTrigger value="results" asChild>
              <Link href={{ query: { tab: "results" } }}>Results</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="question" className="space-y-5">
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
              {exam?.question?.length === 0 && (
                <div>no questions available</div>
              )}
              {exam?.question?.map((data) => (
                <QuestionCard key={data.id} question={data} withAction />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="results" className="space-y-5">
            <Results examId={params?.examId} />
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
}
