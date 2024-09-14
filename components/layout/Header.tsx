"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/lib/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isOpen: boolean;
}

export default function Header({ isOpen }: HeaderProps) {
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out",
        {
          "translate-y-full": !isOpen,
          "translate-y-0": isOpen,
        }
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src="/assets/images/logo.svg"
          alt="Fitness Tracker Logo"
          className="h-8 w-auto"
        />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Fitness Tracker
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {userLoading ? (
          <div className="w-10 h-10 rounded-full border border-gray-300 animate-pulse" />
        ) : userError ? (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.869-3.228l-1.259-2.52-2.52-1.261c-1.433-0.698-3.19-0.525-4.314.504L12 21.01 8.063 17.158c-1.124-.929-2.881-.524-4.314.504l-2.52-1.261-1.259-2.52c-0.633-1.561.327-3.228 1.869-3.228z"
              />
            </svg>
            <p className="text-gray-500">Error loading profile</p>
          </div>
        ) : session && user ? (
          <div className="flex items-center gap-2">
            <Avatar
              className="w-10 h-10"
              src={user.image}
              fallback={
                <AvatarFallback className="bg-gray-300">
                  {user.name?.slice(0, 1)}
                </AvatarFallback>
              }
            />
            <p className="text-gray-800 dark:text-gray-100 font-medium">
              {user.name || user.email}
            </p>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="secondary" onClick={() => router.push("/signup")}>
              Signup
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}