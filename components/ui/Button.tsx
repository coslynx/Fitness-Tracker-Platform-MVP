"use client";

import { cn } from "@/lib/utils/cn";
import { ButtonProps } from "@/types/Button";

interface ButtonBaseProps extends ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}: ButtonBaseProps) {
  const buttonClasses = cn(
    "flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    {
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50":
        variant === "primary",
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-50":
        variant === "secondary",
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-50":
        variant === "danger",
      "text-blue-500 border border-blue-500 hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50":
        variant === "outline",
      "text-gray-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-50":
        variant === "ghost",
      "bg-gray-300 text-gray-600 cursor-not-allowed": disabled,
      "opacity-50 cursor-not-allowed": isLoading,
      [`px-6 py-3 text-${size}`]: size === "sm",
      [`px-8 py-4 text-${size}`]: size === "md",
      [`px-10 py-5 text-${size}`]: size === "lg",
    },
    className
  );

  if (isLoading) {
    return (
      <button
        className={buttonClasses}
        disabled={true}
        {...props}
      >
        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      </button>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}