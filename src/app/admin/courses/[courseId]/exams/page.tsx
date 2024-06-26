"use client";

import * as React from "react";
import { useCompletion } from "ai/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Sparkles,
  Timer,
  Plus,
  Trash2,
  FileQuestion,
  List,
  CircleX,
  CircleCheck,
} from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
    });
  const [timer, setTimer] = React.useState(5);

  const duration = [
    {
      label: "5m",
      value: 5,
    },
    {
      label: "10m",
      value: 10,
    },
    {
      label: "15m",
      value: 15,
    },
    {
      label: "30m",
      value: 30,
    },
    {
      label: "45m",
      value: 45,
    },
    {
      label: "60m",
      value: 60,
    },
    {
      label: "90m",
      value: 90,
    },
    {
      label: "120m",
      value: 120,
    },
  ];

  return (
    <AuthLayout>
      <div className="space-y-5">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between mt-5 items-start"
        >
          <div className="space-y-4">
            <div className="grid gap-3 w-10/12">
              <Label htmlFor="title" className="text-muted-foreground">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                className="w-full border-none focus-visible:ring-0 p-0 text-3xl font-bold"
                placeholder="Title of the exam"
                required
              />
            </div>
            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Timer className="h-4 w-4" />
                    {timer}m
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px]">
                  <div className="flex flex-wrap gap-3">
                    {duration?.map((item) => (
                      <Button
                        key={item.value}
                        size="sm"
                        variant="outline"
                        className={`h-8 gap-1 ${
                          timer === item.value ? "bg-muted-foreground/50" : ""
                        }`}
                        onClick={() => setTimer(item.value)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <DateTimePicker granularity="second" hourCycle={24} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="disabled:cursor-not-allowed rounded-xl"
            >
              Publish
            </Button>
          </div>
        </form>
        {/* <input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            id="input"
            /> */}
        <div className="flex gap-2 justify-between">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[400px] rounded-lg focus-visible:ring-0"
          />
          <div className="flex gap-2">
            <Button className="rounded-lg">
              <Sparkles className="h-4 w-4 mr-1" /> Generate with AI
            </Button>
            <Button variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
                Question
              </span>
            </Button>
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
