import Link from "next/link";
import { getCoursesById } from "@/lib/data";
import { getServerSession } from "next-auth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  NotebookText,
  BookUser,
  Plus,
  ChevronUp,
  Book,
  MoreHorizontal,
} from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardImage,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteExam } from "@/actions/exam";
import { deleteTopic } from "@/actions/topic";
import AddExams from "@/components/forms/add-exams";
import Participants from "./(tabs)/participants";
import Grades from "./(tabs)/grades";
import Discussions from "./(tabs)/discussions";

interface TabProps {
  tab: string;
  searchParams: {
    tab: string;
  };
}

interface PageProps {
  searchParams: TabProps;
  params: { courseId: string };
}

export default async function Page({ searchParams, params }: PageProps) {
  const data = await getCoursesById(params.courseId);
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== data?.instructor_id) {
    redirect("/admin/courses");
  }

  let currentTab = searchParams.tab ?? "courses";

  if (
    currentTab !== "discussions" &&
    currentTab !== "grades" &&
    currentTab !== "students" &&
    currentTab !== "settings"
  ) {
    currentTab = "courses";
  }

  return (
    <AuthLayout>
      <div className="flex gap-4">
        <div className="w-full lg:w-10/12 space-y-5">
          <Card>
            <div className="relative text-gray-100 font-semibold">
              <CardImage
                src={data?.image as string}
                alt={`picture of ${data?.title}`}
                width={1000}
                height={1000}
                className="h-60"
              />
              <div className="absolute inset-0 bg-slate-800/70 opacity-40 rounded-t-xl"></div>
              <div>
                <Badge className="absolute bottom-20 left-5">
                  {data?.categories?.name}
                </Badge>
              </div>
              <h1 className="absolute bottom-11 left-5 font-bold text-2xl tracking-wide">
                {data?.title}
              </h1>
              <div className="absolute bottom-2 left-5 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 border-muted border-2 shadow-sm">
                    <AvatarImage src="https://github.com/vampirepapi.png" />
                    <AvatarFallback>
                      {data?.instructor?.fullname}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm capitalize font-semibold">
                    {data?.instructor?.fullname}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <Users strokeWidth={2} className="h-4 w-4" />
                    <span className="text-sm">
                      {data?.enrollmentCourse?.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookUser strokeWidth={2} className="h-4 w-4" />
                    <span className="text-sm">{data?.topics?.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <NotebookText strokeWidth={2} className="h-4 w-4" />
                    <span className="text-sm">{data?.exam?.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Tabs defaultValue={currentTab} className="space-y-5">
            <TabsList className="w-full lg:w-10/12 grid grid-cols-5">
              <TabsTrigger value="courses" asChild>
                <Link href={{ query: { tab: "courses" } }}>Courses</Link>
              </TabsTrigger>
              <TabsTrigger value="discussions" asChild>
                <Link href={{ query: { tab: "discussions" } }}>
                  Discussions
                </Link>
              </TabsTrigger>
              <TabsTrigger value="grades" asChild>
                <Link href={{ query: { tab: "grades" } }}>Grades</Link>
              </TabsTrigger>
              <TabsTrigger value="students" asChild>
                <Link href={{ query: { tab: "students" } }}>Participants</Link>
              </TabsTrigger>
              <TabsTrigger value="settings" asChild>
                <Link href={{ query: { tab: "settings" } }}>Settings</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-5">
              {data?.topics?.map((topic, index) => (
                <Card key={topic.id} id={topic.id} className="w-full relative">
                  <CardHeader>
                    <CardTitle>Chapter {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Card>
                      <CardContent className="p-4 flex gap-3 items-center">
                        <Book className="h-7 w-7" />
                        <Link
                          href={`/admin/courses/${params.courseId}/topics/${topic.id}`}
                          className="hover:opacity-50 cursor-pointer"
                        >
                          <p>{topic.title}</p>
                        </Link>
                      </CardContent>
                    </Card>
                  </CardContent>
                  <div className="absolute top-5 right-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                          <form action={deleteTopic.bind(null, topic.id)}>
                            <Button variant="ghost" className="p-0 h-auto">
                              Delete
                            </Button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
              {data?.exam?.map((exam) => (
                <Card key={exam.id} className="w-full relative">
                  <CardHeader>
                    <CardTitle>{exam.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Card>
                      <CardContent className="p-4">
                        <Link
                          href={`/admin/courses/${params.courseId}/exams/${exam.id}`}
                          className="flex gap-3 items-center hover:opacity-50 cursor-pointer"
                        >
                          <BookUser className="h-7 w-7" />
                          <p>{exam.name}</p>
                        </Link>
                      </CardContent>
                    </Card>
                  </CardContent>
                  <div className="absolute top-5 right-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/courses/${params.courseId}/exams/${exam.id}`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <form action={deleteExam.bind(null, exam.id)}>
                            <Button variant="ghost" className="p-0 h-auto">
                              Delete
                            </Button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
              <div className="flex fixed bottom-10 right-10">
                <Button
                  className="gap-1 rounded-l-2xl rounded-r-none border-r-[1px]"
                  asChild
                >
                  <Link
                    href={`/admin/courses/${params.courseId}/topics`}
                    className="cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                      Topics
                    </span>
                  </Link>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="rounded-r-2xl rounded-l-none"
                      size="icon"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-32 border-none -ml-24 mt-1">
                    <AddExams courseId={params.courseId} />
                  </PopoverContent>
                </Popover>
              </div>{" "}
              <div className="flex fixed bottom-10 right-10">
                <Button
                  className="gap-1 rounded-l-2xl rounded-r-none border-r-[1px]"
                  asChild
                >
                  <Link
                    href={`/admin/courses/${params.courseId}/topics`}
                    className="cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                      Topics
                    </span>
                  </Link>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="rounded-r-2xl rounded-l-none"
                      size="icon"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-32 border-none -ml-24 mt-1">
                    <AddExams courseId={params.courseId} />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
            <TabsContent value="discussions">
              <Discussions
                discussion={data?.discussion}
                courseId={params?.courseId}
              />
            </TabsContent>
            <TabsContent value="grades">
              <Grades courseId={params?.courseId} />
            </TabsContent>
            <TabsContent value="students">
              <Participants students={data?.enrollmentCourse} />
            </TabsContent>
            <TabsContent value="settings">
              <p>Tab Settings</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Materials Course</CardTitle>
            </CardHeader>
            <CardContent>
              <NavigationMenu>
                <NavigationMenuList>
                  {data?.topics?.map((topic) => (
                    <NavigationMenuItem key={topic.id}>
                      <Link
                        href={`#${topic.id}`}
                        legacyBehavior
                        passHref
                        className="w-full "
                      >
                        <NavigationMenuLink className="hover:opacity-60 text-sm">
                          {topic?.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
