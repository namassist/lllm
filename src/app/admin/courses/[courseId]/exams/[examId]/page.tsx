import * as React from "react";
import Link from "next/link";

//components
import {
  Sparkles,
  Plus,
  MoveRight,
  Repeat2,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddExam from "@/components/forms/add-exam";
import AddQuestion from "@/components/forms/add-question";
import SheetLayout from "@/components/layouts/SheetLayout";
import GenerateQuiz from "@/components/forms/generate-quiz";
import AuthLayout from "@/components/layouts/AuthLayout";

// actions
import { getExamById } from "@/actions/exam";
import QuestionCard from "@/components/cards/question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/date";

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
          <TabsList className="w-full lg:w-2/12 grid grid-cols-2">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exam?.examAttempt?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/namassist.png" />
                          <AvatarFallback>Anam</AvatarFallback>
                        </Avatar>
                        <CardTitle>{data.student.fullname}</CardTitle>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(data.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant="outlinePrimary">review</Badge>
                    </TableCell>
                    <TableCell>{data.score}</TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Lihat Detail
                          </Button>
                        </SheetTrigger>
                        <SheetLayout>
                          <div className="space-y-10 pt-5 pb-10">
                            <div className="flex justify-between">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src="https://github.com/namassist.png" />
                                  <AvatarFallback>Anam</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">
                                  Chairul Anaam Maulidin
                                  <p className="text-sm font-normal">
                                    chairulanmm@gmail.com
                                  </p>
                                </CardTitle>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs border-primary"
                              >
                                Kirim Feedback{" "}
                                <MoveRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-start gap-5">
                              <div className="space-y-4">
                                <CardTitle className="text-xl">
                                  Ringkasan
                                </CardTitle>
                                <p className="text-sm">
                                  Beliau menunjukkan pemahaman yang baik dalam
                                  materi anu dan Lorem ipsum dolor sit amet
                                  consectetur adipisicing elit. Dicta, eaque.
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                <Repeat2 className="h-4 w-4 mr-1" />
                                Generate Ulang
                              </Button>
                            </div>
                            <div className="flex justify-between items-start gap-5">
                              <div className="space-y-4">
                                <CardTitle className="text-xl">
                                  Kelebihan
                                </CardTitle>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Delectus, minus distinctio
                                  numquam alias incidunt dolor repellendus,
                                  nesciunt quos deserunt error vel laborum
                                  aperiam? Obcaecati placeat assumenda hic
                                  tenetur animi.
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-start gap-5">
                              <div className="space-y-4">
                                <CardTitle className="text-xl">
                                  Kekurangan
                                </CardTitle>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Provident reprehenderit,
                                  quis alias asperiores distinctio pariatur
                                  eaque quidem modi explicabo corporis
                                  exercitationem rem voluptate assumenda.
                                  Blanditiis quam ducimus vel neque deserunt
                                  quis quaerat iste ad sequi nobis?
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                              <CardTitle className="text-xl">Results</CardTitle>
                              <div className="flex gap-3">
                                <div className="w-2/12 border py-5 flex justify-center items-center">
                                  <div className="text-center space-y-2">
                                    <p className="text-sm font-medium">Nilai</p>
                                    <h4 className="text-3xl font-bold">60</h4>
                                  </div>
                                </div>
                                <div className="w-2/12 border border-primary py-5 flex justify-center items-center">
                                  <div className="text-center space-y-2">
                                    <p className="text-sm font-medium">Benar</p>
                                    <h4 className="text-3xl font-bold">10</h4>
                                  </div>
                                </div>
                                <div className="w-2/12 border border-destructive py-5 flex justify-center items-center">
                                  <div className="text-center space-y-2">
                                    <p className="text-sm font-medium">Salah</p>
                                    <h4 className="text-3xl font-bold">2</h4>
                                  </div>
                                </div>
                                <div className="w-2/12 border py-5 flex justify-center items-center">
                                  <div className="text-center space-y-2">
                                    <p className="text-sm font-medium">Total</p>
                                    <h4 className="text-3xl font-bold">7</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <CardTitle className="text-xl">
                                Daftar Jawaban
                              </CardTitle>
                              <Card className="w-full">
                                <CardHeader>
                                  <div className="flex justify-between items-center">
                                    <CardTitle>
                                      <Badge
                                        variant="outlinePrimary"
                                        className="font-normal"
                                      >
                                        Benar
                                      </Badge>
                                    </CardTitle>
                                    <div className="flex gap-2">
                                      <Badge variant="secondary">
                                        10 point
                                      </Badge>
                                    </div>
                                  </div>
                                  <CardTitle className="capitalize pt-2">
                                    apa itu cinta?
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                  <Badge
                                    variant={"default"}
                                    className="px-2 text-sm"
                                  >
                                    <CircleCheck className="h-3 w-3 mr-1" />
                                    Cinta adalah buta
                                  </Badge>
                                </CardContent>
                              </Card>
                              <Card className="w-full">
                                <CardHeader>
                                  <div className="flex justify-between items-center">
                                    <CardTitle>
                                      <Badge
                                        variant="outlineDestructive"
                                        className="font-normal"
                                      >
                                        Salah
                                      </Badge>
                                    </CardTitle>
                                    <div className="flex gap-2">
                                      <Badge variant="secondary">0 point</Badge>
                                    </div>
                                  </div>
                                  <CardTitle className="capitalize pt-2">
                                    apa itu cinta?
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                  <Badge
                                    variant="outlineDestructive"
                                    className="px-2 text-sm"
                                  >
                                    <CircleX className="h-3 w-3 mr-1" />
                                    Cinta adalah buta
                                  </Badge>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </SheetLayout>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
}
