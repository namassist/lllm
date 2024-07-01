import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";

export default function SheetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SheetContent
      side="bottom"
      className="rounded-t-xl h-[100vh] overflow-y-auto dark:bg-slate-950 flex justify-center"
    >
      <div className="h-2 w-40 bg-foreground/10 opacity-40 mx-auto rounded-full mb-5 absolute top-7"></div>
      <div className="absolute bottom-0 left-0 right-0 top-14 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <SheetHeader className="space-y-5 w-full lg:w-[60%] z-20 mt-14">
        {children}
      </SheetHeader>
    </SheetContent>
  );
}
