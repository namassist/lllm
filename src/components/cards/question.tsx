import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SheetLayout from "@/components/layouts/SheetLayout";
import EditQuestion from "@/components/forms/edit-question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Trash2, FileQuestion, CircleX, CircleCheck } from "lucide-react";
import { deleteQuestion } from "@/actions/question";

export default function QuestionCard({ question, withAction = false }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            <Badge variant="outline" className="font-normal">
              <FileQuestion className="h-3 w-3 mr-1" />{" "}
              {question?.options?.length > 1 ? "Pilihan Ganda" : "Esay"}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            {withAction && (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-1 text-xs px-3 cursor-pointer border-2 border-secondary hover:opacity-90"
                    >
                      Edit
                    </Button>
                  </SheetTrigger>
                  <SheetLayout>
                    <EditQuestion questions={question} />
                  </SheetLayout>
                </Sheet>
                <form action={deleteQuestion.bind(null, question?.id)}>
                  <Button
                    variant="outline"
                    size="sm"
                    type="submit"
                    className="cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
            <Badge variant="secondary">{question?.score} point</Badge>
          </div>
        </div>
        <CardTitle className="text-base">{question?.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {question?.choice?.map((option: any) => (
          <Badge
            key={option?.id}
            variant={option?.is_correct ? "default" : "outline"}
            className="px-2 text-sm"
          >
            {option?.is_correct ? (
              <CircleCheck className="h-4 w-4 mr-1" />
            ) : (
              <CircleX className="h-4 w-4 mr-1" />
            )}
            {option?.choice}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
