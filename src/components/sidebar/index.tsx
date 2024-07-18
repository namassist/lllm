"use client";

import { Book, Compass, Home, User } from "lucide-react";
import { SidebarDesktop } from "./desktop";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./mobile";

import { SidebarItems } from "@/types/sidebar";
const sidebarInstructur: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/admin/dashboard", icon: Home },
    { label: "Explore", href: "/admin/explores", icon: Compass },
    { label: "Courses", href: "/admin/courses", icon: Book },
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
    {
      label: "Profile",
      href: "/student/profile",
      icon: User,
    },
  ],
};

export function Sidebar({
  isStudent,
  session,
}: {
  isStudent: boolean;
  session: any;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return (
      <SidebarDesktop
        session={session}
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
