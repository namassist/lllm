"use client";

import { deleteEnrollment } from "@/actions/enrollment";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

export type UserDetail = {
  id: string;
  username: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StudentDetail = {
  id: string;
  fullname: string;
  address: number;
  phone: string;
  gender: string;
  user: UserDetail;
  createdAt: Date;
  updatedAt: Date;
};

export type Students = {
  id: string;
  course_id: string;
  student_id: string;
  student: StudentDetail;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Students>[] = [
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/namassist.png" />
            <AvatarFallback>{row.original.student.fullname}</AvatarFallback>
          </Avatar>
          <CardTitle>{row.original.student.fullname}</CardTitle>
        </div>
      );
    },
  },
  {
    accessorKey: "NIM",
    header: "NIM",
    cell: ({ row }) => {
      return row.original.student.user.username;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return row.original.student.gender;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.student.user.email;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DeleteButton id={row.original.id} />;
    },
  },
];

function DeleteButton({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <form action={deleteEnrollment.bind(null, id)}>
            <Button variant="ghost" className="p-0 h-auto">
              Delete
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
