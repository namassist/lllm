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

const sidebarInstructur: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/admin/dashboard", icon: Home },
    { label: "Explore", href: "/admin/explores", icon: Compass },
    { label: "Courses", href: "/admin/courses", icon: Book },
    { label: "Exams", href: "/admin/exams", icon: BookUser },
    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ],
};

const sidebarStudent: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/student/dashboard", icon: Home },
    { label: "Explore", href: "/student/explores", icon: Compass },
    { label: "Courses", href: "/student/courses", icon: Book },
    { label: "Exams", href: "/student/exams", icon: BookUser },
    {
      label: "Profile",
      href: "/student/profile",
      icon: User,
    },
  ],
};

export function Sidebar({ isStudent }: { isStudent: boolean }) {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return (
      <SidebarDesktop
        sidebarItems={isStudent ? sidebarStudent : sidebarInstructur}
      />
    );
  }

  return (
    <SidebarMobile
      sidebarItems={isStudent ? sidebarStudent : sidebarInstructur}
    />
  );
}
