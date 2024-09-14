"use client";

import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/formatters";
import { useState, useEffect } from "react";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/common/Error";

interface Props {
  activityLogs: ActivityLog[];
}

export const RecentActivity = ({ activityLogs }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch the activityLogs
        const response = await fetch("/api/activityLogs");
        const data: ActivityLog[] = await response.json();
        activityLogs.push(...data);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        setError("Failed to fetch activity logs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityLogs();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} onClose={() => setError(null)} />;
  }

  return (
    <div className="space-y-4">
      {activityLogs.length > 0 ? (
        activityLogs
          .slice(0, 5) // Display only the last 5 activity logs
          .map((activityLog) => (
            <Card key={activityLog.id}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">
                  {formatDate(activityLog.date)}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {activityLog.description}
                </p>
              </div>
            </Card>
          ))
      ) : (
        <p className="text-sm text-gray-500">No recent activity yet.</p>
      )}
    </div>
  );
};