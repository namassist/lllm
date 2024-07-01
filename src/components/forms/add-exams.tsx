"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { createExam } from "@/actions/exam";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddExams({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const created = await createExam(courseId);
      router.push(`/admin/courses/${courseId}/exams/${created?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full flex justify-start gap-1 rounded-xl cursor-pointer"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="animate-spin h-4 w-4" />
      ) : (
        <>
          <Plus className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-semibold">
            Exams
          </span>
        </>
      )}
    </Button>
  );
}
