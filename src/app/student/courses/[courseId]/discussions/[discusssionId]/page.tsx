import { AlertCircle, MessagesSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import AddReply from "@/components/forms/add-reply";
import { getDiscussionById } from "@/actions/discussion";
import { formatDate } from "@/lib/date";
import { getSession } from "@/lib/session";
import { Editor } from "./Editor";
import Done from "./done";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page({ params }: { params: any }) {
  const session = await getSession();
  const discussions = await getDiscussionById(params?.discusssionId);

  if (discussions) {
    return (
      <AuthLayout isStudent>
        <Card className="text-foreground/80 border-none shadow-none bg-transparent mt-5">
          <CardHeader className="space-y-4">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <Avatar className="h-10 w-10 border-muted border-2 shadow-sm">
                  <AvatarImage src="https://github.com/namassist.png" />
                  <AvatarFallback>JDoe</AvatarFallback>
                </Avatar>
                <p className="capitalize">
                  {discussions?.users?.students?.fullname ||
                    discussions?.users?.instructors?.fullname}
                </p>
                <p className="w-1 h-1 bg-foreground/80 rounded-full"></p>
                <p className="capitalize text-foreground/70">
                  {formatDate(discussions?.createdAt)}
                </p>
              </div>
              {discussions?.is_open &&
                discussions?.user_id === session?.user_id && (
                  <Done discussionId={discussions?.id} />
                )}
              {!discussions?.is_open && (
                <Badge className="bg-red-400">Closed</Badge>
              )}
            </div>
            <CardTitle className="text-xl">{discussions?.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            <Editor desc={discussions?.description} />
            <Badge
              className="inline-flex items-center gap-2 py-2 text-sm font-medium"
              variant="outline"
            >
              <MessagesSquare className="h-6 w-6" /> {discussions?.reply.length}{" "}
              Pembahasan
            </Badge>
          </CardContent>
        </Card>
        {discussions?.is_open && (
          <>
            <Separator className="mt-5 mb-5" />
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-medium">
                <Avatar className="h-10 w-10 border-muted border-2 shadow-sm rounded-full">
                  <AvatarImage src="https://github.com/namassist.png" />
                  <AvatarFallback>{session?.name}</AvatarFallback>
                </Avatar>
                <p className="capitalize">{session?.name}</p>
              </div>
              <AddReply discussionId={discussions?.id} />
            </div>
          </>
        )}
        <Separator className="mt-5 mb-5" />
        {!discussions?.is_open && (
          <Card className="text-foreground/80 bg-green-200 mt-5">
            <CardHeader className="space-y-4">
              <CardTitle className="text-xl flex gap-2 items-center">
                <AlertCircle />
                Poin Utama Diskusi
              </CardTitle>
              <CardDescription>{discussions?.kesimpulan}</CardDescription>
            </CardHeader>
          </Card>
        )}
        {discussions?.reply.map((reply: any) => (
          <Card
            key={reply.id}
            className="text-foreground/80 bg-transparent mt-5"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-2 font-medium">
                <Avatar className="h-10 w-10 border-muted border-2 shadow-sm">
                  <AvatarImage src="https://github.com/vampirepapi.png" />
                  <AvatarFallback>JDoe</AvatarFallback>
                </Avatar>
                <p className="capitalize">
                  {reply?.users?.students?.fullname ||
                    reply?.users?.instructors?.fullname}
                </p>
                <p className="w-1 h-1 bg-foreground/80 rounded-full"></p>
                <p className="capitalize text-foreground/70">
                  {formatDate(reply.createdAt)}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Editor desc={reply.reply} />
            </CardContent>
          </Card>
        ))}
      </AuthLayout>
    );
  }
}
