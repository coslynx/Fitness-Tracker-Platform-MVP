"use client";

import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/common/Error";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils/formatters";

interface GoalProps {
  id: number;
  title: string;
  description: string | null;
  target: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GoalsListProps {
  goals: GoalProps[];
}

export const GoalsList = ({ goals }: GoalsListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} onClose={() => setError(null)} />;
  }

  return (
    <div className="space-y-4">
      {goals.length > 0 ? (
        goals.map((goal) => (
          <Card key={goal.id}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{goal.title}</h3>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/goal/${goal.id}`)}
                >
                  View
                </Button>
              </div>
            </div>
            <p className="text-sm">{goal.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-500">
                Target: {goal.target}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Created: {formatDate(goal.createdAt)}
              </p>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">No goals yet.</p>
      )}
    </div>
  );
};