import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="relative pb-3">
      <div className="flex items-center h-full ml-[20px] md:ml-[30px]">
        <Input
          type="search"
          placeholder="Search for a course"
          className="md:w-[100px] lg:w-[400px] rounded-r-none focus-visible:ring-0"
        />
        <Button variant="ghost" className="rounded-l-none bg-muted h-full">
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="w-full absolute bottom-0" />
    </header>
  );
}
