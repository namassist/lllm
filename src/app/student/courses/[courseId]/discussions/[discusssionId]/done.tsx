"use client";

import { updateStatusDiscussion } from "@/actions/discussion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Done({ discussionId }: { discussionId: string }) {
  const handleUpdate = async () => {
    try {
      const loading = toast.loading("Tandai Selesai...");
      const updateStatus = await updateStatusDiscussion(discussionId);

      if (updateStatus.message) {
        toast.dismiss(loading);
        toast.success(updateStatus.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button size={"sm"} onClick={handleUpdate}>
      <CheckCircle className="h-4 w-4 mr-2" /> Tandai Selesai
    </Button>
  );
}
