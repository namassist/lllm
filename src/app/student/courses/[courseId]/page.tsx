import Link from "next/link";
import { getCoursesById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, NotebookText, BookUser, Book } from "lucide-react";
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
import { redirect } from "next/navigation";

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

  if (data?.enrollmentCourse.length === 0) {
    redirect("/student/courses");
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
    <AuthLayout isStudent>
      <div className="flex gap-4">
        <div className="w-full lg:w-8/12 space-y-5">
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
            <TabsList className="w-full lg:w-8/12 grid grid-cols-5">
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
                          href={`/student/courses/${params.courseId}/topics/${topic.id}`}
                          className="hover:opacity-50 cursor-pointer"
                        >
                          <p>{topic.title}</p>
                        </Link>
                      </CardContent>
                    </Card>
                  </CardContent>
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
                          href={`/student/courses/${params.courseId}/exams/${exam.id}`}
                          className="flex gap-3 items-center hover:opacity-50 cursor-pointer"
                        >
                          <BookUser className="h-7 w-7" />
                          <p>{exam.name}</p>
                        </Link>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="discussions">
              <p>Tab Discussions</p>
            </TabsContent>
            <TabsContent value="grades">
              <p>Tab Grades</p>
            </TabsContent>
            <TabsContent value="students">
              <p>Tab Participants</p>
            </TabsContent>
            <TabsContent value="settings">
              <p>Tab Settings</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:w-4/12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Materials Course</CardTitle>
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
