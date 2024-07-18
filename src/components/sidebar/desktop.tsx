"use client";

import { SidebarButton } from "./button";
import { SidebarItems } from "@/types/sidebar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, LogOut, MoreHorizontal, Settings } from "lucide-react";
import { useTheme } from "next-themes";

import { usePathname } from "next/navigation";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
  session: any;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">lLMS</h3>
        <div className="mt-5">
          <div className="flex flex-col gap-3 w-full">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={
                    pathname.startsWith(link.href) ? "secondary" : "ghost"
                  }
                  icon={link.icon}
                  className="w-full"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute left-0 bottom-3 w-full px-3 flex">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/namassist.png" />
                        <AvatarFallback>{props.session?.name}</AvatarFallback>
                      </Avatar>
                      <span>{props.session?.name}</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
                <div className="space-y-1">
                  <SidebarButton
                    size="sm"
                    icon={theme === "dark" ? Moon : Sun}
                    className="w-full"
                    onClick={() =>
                      theme === "dark" ? setTheme("light") : setTheme("dark")
                    }
                  >
                    {theme === "dark" ? "Dark" : "Light"}
                  </SidebarButton>
                  <SidebarButton
                    size="sm"
                    icon={LogOut}
                    className="w-full"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/`,
                      })
                    }
                  >
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}
