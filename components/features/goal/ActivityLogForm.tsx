"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { formatDate } from "@/lib/utils/formatters";

interface ActivityLogFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  goalId: number;
}

export const ActivityLogForm = ({
  onCancel,
  onSubmit,
  goalId,
}: ActivityLogFormProps) => {
  const [description, setDescription] = useState("");
  const [activityLogs, activityLogsLoading, activityLogsError] =
    useActivityLog(goalId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Description"
        placeholder="Enter activity description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Activity
        </Button>
      </div>
    </form>
  );
};