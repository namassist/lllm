"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateStatusExamAttempt } from '@/actions/exam';

export default function FeedbackButton({attemptId}:{attemptId:string}) {
    const sendFeedback = async () => {
        const loading = toast.loading("submitting...");
        const sendingFeedback = await updateStatusExamAttempt(attemptId);

        if (sendingFeedback.message) {
            toast.dismiss(loading);
            toast.success(sendingFeedback.message);
        }
    }

  return (
    <Button
        size="sm"
        variant="outline"
        className="text-xs border-primary"
        onClick={sendFeedback}>
        Kirim Feedback{" "}
        <MoveRight className="h-4 w-4 ml-2" />
    </Button>
  )
}
