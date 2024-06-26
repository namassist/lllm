"use client";

import * as React from "react";
import { ListFilter, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/app-context";

export default function FilterExplore() {
  const [position, setPosition] = React.useState("latest");
  const {
    cardType,
    setCardType,
  }: {
    cardType: string;
    setCardType: React.Dispatch<React.SetStateAction<string>>;
  } = useAppContext() as {
    cardType: string;
    setCardType: React.Dispatch<React.SetStateAction<string>>;
  };

  return (
    <div className=" flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ListFilter className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Sort
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant={cardType === "grid" ? "secondary" : "outline"}
        size="sm"
        className="h-8 gap-1"
        onClick={() => setCardType("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={cardType === "list" ? "secondary" : "outline"}
        size="sm"
        className="h-8 gap-1"
        onClick={() => setCardType("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
