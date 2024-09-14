"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number";
}

export default function Input({
  label,
  className,
  error,
  type = "text",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={props.id || undefined}
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={cn(
          "block w-full px-3 py-2 border rounded-md border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border-red-500": error,
            "focus:ring-blue-500": !error && isFocused,
          }
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}