import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare, Plus } from "lucide-react";
import SheetLayout from "@/components/layouts/SheetLayout";
import AddDiscussion from "@/components/forms/add-discussion";
import { formatDate } from "@/lib/date";
import React, { useMemo } from "react";

export default async function Discussions({
  courseId,
  discussion,
}: {
  courseId: string;
  discussion: any;
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="gap-1 hover:scale-105 transition-all mb-5">
            <Plus className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
              New Discussion
            </span>
          </Button>
        </SheetTrigger>
        <SheetLayout>
          <AddDiscussion courseId={courseId} />
        </SheetLayout>
      </Sheet>
      {discussion.map((diss: any) => (
        <Link
          href={`/admin/courses/${courseId}/discussions/${diss.id}`}
          key={diss.id}
        >
          <Card className="text-foreground/80 hover:bg-foreground/5 duration-150 transition-all mb-5">
            <CardHeader className="space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex items-center gap-2 font-medium">
                  <Avatar className="h-10 w-10 border-muted border-2 shadow-sm">
                    <AvatarImage src="https://github.com/vampirepapi.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <p className="capitalize">John Doe</p>
                  <p className="w-1 h-1 bg-foreground/80 rounded-full"></p>
                  <p className="capitalize text-foreground/70">
                    {formatDate(diss?.createdAt)}
                  </p>
                </div>
                {!diss?.is_open && <Badge className="bg-green-400">Done</Badge>}
              </div>
              <CardTitle className="text-xl">{diss?.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge
                className="inline-flex items-center gap-2 py-2 text-sm font-medium"
                variant="outline"
              >
                <MessagesSquare className="h-6 w-6" /> {diss?.reply.length}{" "}
                Pembahasan
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
