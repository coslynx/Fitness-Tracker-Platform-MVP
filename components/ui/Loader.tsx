"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const loaderSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

export default function Loader({
  size = "md",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-t-transparent border-gray-400 dark:border-gray-600",
        loaderSizes[size],
        className
      )}
    />
  );
}