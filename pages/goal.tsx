"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { formatDate } from "@/lib/utils/formatters";
import { GoalForm } from "@/components/features/goal/GoalForm";
import { ActivityLogForm } from "@/components/features/goal/ActivityLogForm";
import { ProgressChart } from "@/components/features/goal/ProgressChart";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Error } from "@/components/common/Error";
import { Success } from "@/components/common/Success";

export default function GoalPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [goalId, setGoalId] = useState<string | undefined>();
  const [goal, isLoading, error] = useGoal(goalId);
  const [activityLogs, activityLogsLoading, activityLogsError] = useActivityLog(
    goalId
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isDeletingGoal, setIsDeletingGoal] = useState(false);
  const [isDeletingActivity, setIsDeletingActivity] = useState(false);
  const [showDeleteGoalModal, setShowDeleteGoalModal] = useState(false);
  const [showDeleteActivityModal, setShowDeleteActivityModal] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState<number | null>(null);

  useEffect(() => {
    const id = router.query.id as string;
    setGoalId(id);
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (activityLogsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (activityLogsError) {
    return <Error message={activityLogsError.message} />;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (!goal) {
    return null;
  }

  const handleEditGoal = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAddActivity = () => {
    setIsAddingActivity(true);
  };

  const handleCancelAddActivity = () => {
    setIsAddingActivity(false);
  };

  const handleDeleteGoal = () => {
    setIsDeletingGoal(true);
  };

  const handleCancelDeleteGoal = () => {
    setIsDeletingGoal(false);
    setShowDeleteGoalModal(false);
  };

  const handleDeleteActivity = (activityId: number) => {
    setDeleteActivityId(activityId);
    setShowDeleteActivityModal(true);
  };

  const handleCancelDeleteActivity = () => {
    setIsDeletingActivity(false);
    setShowDeleteActivityModal(false);
    setDeleteActivityId(null);
  };

  const handleConfirmDeleteActivity = async () => {
    if (deleteActivityId) {
      setIsDeletingActivity(true);
      try {
        await fetch(`/api/activityLogs/${deleteActivityId}`, {
          method: "DELETE",
        });
        setIsDeletingActivity(false);
        setShowDeleteActivityModal(false);
        setDeleteActivityId(null);
      } catch (error) {
        console.error("Error deleting activity log:", error);
        setIsDeletingActivity(false);
      }
    }
  };

  const handleConfirmDeleteGoal = async () => {
    setIsDeletingGoal(true);
    try {
      await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
      });
      setIsDeletingGoal(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting goal:", error);
      setIsDeletingGoal(false);
    }
  };

  const handleGoalUpdated = async () => {
    setIsEditing(false);
    try {
      await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleActivityAdded = async () => {
    setIsAddingActivity(false);
    try {
      await fetch("/api/activityLogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: goal.activityLogs[0].description,
          goalId: goal.id,
        }),
      });
    } catch (error) {
      console.error("Error adding activity log:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{goal.title}</h1>

      {isEditing ? (
        <GoalForm
          goal={goal}
          onCancel={handleCancelEdit}
          onSubmit={handleGoalUpdated}
        />
      ) : (
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleEditGoal}>
              Edit Goal
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteGoalModal(true)}>
              Delete Goal
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium">
              Created: {formatDate(goal.createdAt)}
            </p>
          </div>
        </div>
      )}

      {isAddingActivity ? (
        <ActivityLogForm
          onCancel={handleCancelAddActivity}
          onSubmit={handleActivityAdded}
        />
      ) : (
        <div className="flex justify-between items-center mb-4">
          <Button variant="primary" onClick={handleAddActivity}>
            Add Activity
          </Button>
          <p className="text-sm font-medium">
            Target: {goal.target}
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Activity Logs</h2>

      <div className="grid grid-cols-1 gap-4">
        {goal.activityLogs.length > 0 ? (
          goal.activityLogs.map((activityLog) => (
            <Card key={activityLog.id}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">
                  {formatDate(activityLog.date)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteActivity(activityLog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm">{activityLog.description}</p>
            </Card>
          ))
        ) : (
          <p className="text-sm">No activity logs yet.</p>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Progress</h2>

      <ProgressChart goal={goal} activityLogs={activityLogs} />

      <Modal
        isOpen={showDeleteGoalModal}
        onClose={() => setShowDeleteGoalModal(false)}
        title="Delete Goal"
      >
        <p>Are you sure you want to delete this goal?</p>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" onClick={handleCancelDeleteGoal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDeleteGoal}>
            Delete
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteActivityModal}
        onClose={() => setShowDeleteActivityModal(false)}
        title="Delete Activity Log"
      >
        <p>Are you sure you want to delete this activity log?</p>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" onClick={handleCancelDeleteActivity}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDeleteActivity}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}