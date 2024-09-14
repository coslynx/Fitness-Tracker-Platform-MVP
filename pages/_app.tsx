"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/common/Error";
import { Session } from "next-auth/react/types";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils/cn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { useGoal } from "@/lib/hooks/useGoal";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [goals, goalsLoading, goalsError] = useGoal();
  const [activityLogs, activityLogsLoading, activityLogsError] =
    useActivityLog();
  const [socialFeed, socialFeedLoading, socialFeedError] = useSocialFeed();
  const [user, userLoading, userError] = useUser();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getServerSession(authOptions);
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (userLoading || goalsLoading || activityLogsLoading || socialFeedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (
    userError ||
    goalsError ||
    activityLogsError ||
    socialFeedError
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Error message={userError?.message || "Something went wrong"} />
      </div>
    );
  }

  return (
    <html lang="en">
      <body className={cn("bg-white dark:bg-gray-900", {
        "bg-gray-100 dark:bg-gray-800": !session,
      })}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            {children}
          </ThemeProvider>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}