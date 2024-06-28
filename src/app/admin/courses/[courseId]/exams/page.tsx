"use client";

import * as React from "react";
import { useCompletion } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Plus,
  Trash2,
  FileQuestion,
  CircleX,
  CircleCheck,
} from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import AddQuestion from "@/components/forms/add-question";
import { useAppContext } from "@/context/app-context";
import AddExam from "@/components/forms/add-exam";
import GenerateQuiz from "@/components/forms/generate-quiz";

export default function Page() {
  const {
    sheetOpen,
    setSheetOpen,
  }: {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  } = useAppContext() as {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
    });

  return (
    <AuthLayout>
      <div className="space-y-5">
        <AddExam />
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
              <SheetContent
                side="bottom"
                className="rounded-t-xl h-[100vh] overflow-y-auto dark:bg-slate-950 flex justify-center"
              >
                <div className="h-2 w-40 bg-foreground/10 opacity-40 mx-auto rounded-full mb-5 absolute top-7"></div>
                <div className="absolute bottom-0 left-0 right-0 top-14 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <SheetHeader className="space-y-5 w-full lg:w-[60%] z-20 mt-14">
                  <GenerateQuiz />
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-1 rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                    Question
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="rounded-t-xl h-[80vh] overflow-y-auto"
              >
                <div className="h-2 w-40 bg-foreground/10 opacity-40 mx-auto rounded-full mb-5"></div>
                <SheetHeader className="container px-[250px]">
                  <AddQuestion />
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  <Badge variant="outline" className="font-normal">
                    <FileQuestion className="h-3 w-3 mr-1" /> Pilihan Ganda
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-muted/90 p-1 text-xs px-3 cursor-pointer hover:opacity-90"
                  >
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1 cursor-pointer" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-base">
                Apa yang dimaksud dengan sistem informasi?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-xs">Pilihan Jawaban</p>
              <div className="flex gap-4 flex-wrap">
                <Badge variant="outline" className="px-2 text-sm">
                  <CircleX className="h-4 w-4 mr-1" /> Kumpulan orang yang
                  menggunakan komputer
                </Badge>
                <Badge variant="outline" className="px-2 text-sm">
                  <CircleX className="h-4 w-4 mr-1" /> Sistem yang mengumpulkan,
                  memproses, menyimpan, dan menyajikan informasi
                </Badge>
                <Badge className="px-2 text-sm">
                  <CircleCheck className="h-4 w-4 mr-1" />
                  Sistem yang mengumpulkan, memproses, menyimpan, dan menyajikan
                  informasi
                </Badge>
                <Badge variant="outline" className="px-2 text-sm">
                  <CircleX className="h-4 w-4 mr-1" /> Sekumpulan data yang
                  terorganisir
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  <Badge variant="outline" className="font-normal">
                    <FileQuestion className="h-3 w-3 mr-1" /> Esay
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-muted/90 p-1 text-xs px-3 cursor-pointer hover:opacity-90"
                  >
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1 cursor-pointer" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-base">
                Apa yang dimaksud dengan sistem informasi?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-xs">Jawaban Benar</p>
              <div className="flex gap-4 flex-wrap">
                <Badge className="px-2 text-sm">
                  <CircleCheck className="h-4 w-4 mr-1" />
                  Sistem yang mengumpulkan, memproses, menyimpan, dan menyajikan
                  informasi
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        {isLoading ? <div>loading...</div> : <div>{completion}</div>}
      </div>
    </AuthLayout>
  );
}
