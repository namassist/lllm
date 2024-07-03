"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enrollmentCourse } from "@/actions/course";
import toast from "react-hot-toast";

export default function EnrollmentCourse({
  courseId,
  studentId,
}: {
  courseId: string;
  studentId: string;
}) {
  const [key, setKey] = useState<string>("");

  const handleEnroll = async () => {
    const loading = toast.loading("enrolling...");

    try {
      const enrollment = await enrollmentCourse({
        course_id: courseId,
        student_id: studentId,
        key: key,
      });

      if (enrollment.message) {
        toast.dismiss(loading);
        toast.success(enrollment.message);
      }

      if (enrollment.error) {
        toast.dismiss(loading);
        toast.error(enrollment.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4">
      <Input
        className="w-full"
        placeholder="Enter enrollment key"
        onChange={(e) => setKey(e.target.value)}
        value={key}
        required
      />
      <Button size="sm" className="cursor-pointer" onClick={handleEnroll}>
        Enroll
      </Button>
    </div>
  );
}
