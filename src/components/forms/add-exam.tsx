"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Timer } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateExam } from "@/actions/exam";
import toast from "react-hot-toast";

interface DataProps {
  data: {
    id: string;
    name: string;
    description: string;
    course_id: string;
    held_at: Date;
    duration: number;
  };
}

export default function AddExam({ data }: DataProps) {
  const [heldAt, setHeldAt] = React.useState(new Date(data.held_at));

  const [input, setInput] = React.useState({
    duration: data?.duration,
    name: data.name,
    course_id: data.course_id,
  });

  const durationOptions = [
    { label: "5m", value: 5 },
    { label: "10m", value: 10 },
    { label: "15m", value: 15 },
    { label: "30m", value: 30 },
    { label: "45m", value: 45 },
    { label: "60m", value: 60 },
    { label: "90m", value: 90 },
    { label: "120m", value: 120 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (value: number) => {
    setInput((prevState) => ({ ...prevState, duration: value }));
  };

  const handleSubmit = async () => {
    const loading = toast.loading("submitting...");
    const updateExamWithId = await updateExam(data.id, {
      ...input,
      held_at: heldAt,
    });

    if (updateExamWithId.message) {
      toast.dismiss(loading);
      toast.success(updateExamWithId.message);
    }
  };

  return (
    <div className="flex justify-between mt-5 items-start">
      <div className="space-y-4">
        <div className="grid gap-3 w-10/12">
          <Label htmlFor="title" className="text-muted-foreground">
            Title
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="w-full border-none focus-visible:ring-0 p-0 text-3xl font-bold"
            placeholder="Title of the exam"
            defaultValue={input.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Timer className="h-4 w-4" />
                {input.duration}m
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
              <div className="flex flex-wrap gap-3">
                {durationOptions.map((item) => (
                  <Button
                    key={item.value}
                    size="sm"
                    variant="outline"
                    className={`h-8 gap-1 ${
                      input.duration === item.value
                        ? "bg-muted-foreground/50"
                        : ""
                    }`}
                    onClick={() => handleDurationChange(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <DateTimePicker
            granularity="second"
            hourCycle={24}
            jsDate={heldAt}
            onJsDateChange={setHeldAt}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          className="disabled:cursor-not-allowed rounded-xl"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
