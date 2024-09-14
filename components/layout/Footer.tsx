"use client";

import { cn } from "@/lib/utils/cn";

interface FooterProps {
  isOpen: boolean;
}

export default function Footer({ isOpen }: FooterProps) {
  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-10 px-4 py-3 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out",
        {
          "translate-y-full": !isOpen,
          "translate-y-0": isOpen,
        }
      )}
    >
      <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
      </div>
    </footer>
  );
}