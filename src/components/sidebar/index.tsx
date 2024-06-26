"use client";

import {
  Book,
  BookUser,
  Compass,
  Home,
  NotebookText,
  User,
} from "lucide-react";
import { SidebarDesktop } from "./desktop";
import { SidebarItems } from "@/types/sidebar";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./mobile";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/admin/dashboard", icon: Home },
    { label: "Explore", href: "/admin/explores", icon: Compass },
    { label: "Courses", href: "/admin/courses", icon: Book },
    { label: "Exams", href: "/admin/exams", icon: BookUser },
    { label: "Assignments", href: "/admin/assignments", icon: NotebookText },
    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ],
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
