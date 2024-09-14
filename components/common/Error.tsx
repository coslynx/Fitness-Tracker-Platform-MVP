"use client";

import { cn } from "@/lib/utils/cn";

interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  onClose?: () => void;
}

export const Error = ({
  message = "Something went wrong",
  onClose,
  className,
  ...props
}: ErrorProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50",
        {
          "hidden": !message,
        }
      )}
      {...props}
    >
      <div className="relative w-full max-w-md max-h-full px-4 pt-4 pb-20 overflow-y-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Error
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="p-4">
          <p className="text-lg text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};