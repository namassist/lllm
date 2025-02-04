"use client";

import { Course } from "@/types/listCourse";
import { useAppContext } from "@/context/app-context";
import Grid from "./grid";
import List from "./list";

interface CardCourseProps {
  data: Course[];
  isDeleted?: Boolean;
  preview?: Boolean;
  enrollable?: Boolean;
}

const CardCourse: React.FC<CardCourseProps> = ({
  data,
  isDeleted = false,
  preview = false,
  enrollable = false,
}) => {
  const { cardType }: { cardType: string } = useAppContext() as {
    cardType: string;
  };

  if (cardType === "grid") {
    return (
      <Grid
        data={data}
        isDeleted={isDeleted}
        preview={preview}
        enrollable={enrollable}
      />
    );
  }

  if (cardType === "list") {
    return (
      <List
        data={data}
        isDeleted={isDeleted}
        preview={preview}
        enrollable={enrollable}
      />
    );
  }
};

export default CardCourse;
