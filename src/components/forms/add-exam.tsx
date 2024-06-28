"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Timer } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddExam() {
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
    <form className="flex justify-between mt-5 items-start">
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
  );
}
