"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { formatDate } from "@/lib/utils/formatters";
import { GoalsList } from "@/components/features/dashboard/GoalsList";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";
import { AnalyticsChart } from "@/components/features/dashboard/AnalyticsChart";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Error } from "@/components/common/Error";
import { Success } from "@/components/common/Success";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { SocialFeed } from "@/components/features/social/SocialFeed";
import { useUser } from "@/lib/hooks/useUser";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [user, userLoading, userError] = useUser();
  const [socialFeed, socialFeedLoading, socialFeedError] = useSocialFeed();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");
        const data: Goal[] = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch goals");
        setIsLoading(false);
      }
    };

    const fetchActivityLogs = async () => {
      try {
        const response = await fetch("/api/activityLogs");
        const data: ActivityLog[] = await response.json();
        setActivityLogs(data);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
    };

    fetchGoals();
    fetchActivityLogs();
  }, []);

  const handleCreateGoal = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newGoalTitle,
          description: newGoalDescription,
          target: newGoalTarget,
        }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setNewGoalTitle("");
        setNewGoalDescription("");
        setNewGoalTarget("");
        setShowCreateGoalModal(false);
        // Fetch updated goals
        fetchGoals();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("Failed to create goal");
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (userLoading) {
    return <Loader />;
  }

  if (userError) {
    return <Error message={userError.message} />;
  }

  if (socialFeedLoading) {
    return <Loader />;
  }

  if (socialFeedError) {
    return <Error message={socialFeedError.message} />;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Your Goals</h2>
          <GoalsList goals={goals} />
          <Button variant="primary" onClick={() => setShowCreateGoalModal(true)}>
            Create New Goal
          </Button>
        </Card>
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <RecentActivity activityLogs={activityLogs} />
        </Card>
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Your Analytics</h2>
          <AnalyticsChart goals={goals} activityLogs={activityLogs} />
        </Card>
      </div>
      <Card className="mt-8">
        <h2 className="text-xl font-bold mb-4">Community Feed</h2>
        <SocialFeed socialFeed={socialFeed} />
      </Card>

      <Modal
        isOpen={showCreateGoalModal}
        onClose={() => setShowCreateGoalModal(false)}
        title="Create New Goal"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
          />
          <Input
            label="Description"
            value={newGoalDescription}
            onChange={(e) => setNewGoalDescription(e.target.value)}
          />
          <Input
            label="Target"
            value={newGoalTarget}
            onChange={(e) => setNewGoalTarget(e.target.value)}
          />
          <Button variant="primary" onClick={handleCreateGoal}>
            Create Goal
          </Button>
        </div>
      </Modal>

      <Success
        isOpen={showSuccessMessage}
        onClose={handleCloseSuccessMessage}
        message="Goal created successfully!"
      />

      {errorMessage && (
        <Error message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </div>
  );
}