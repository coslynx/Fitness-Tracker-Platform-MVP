"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useGoal } from "@/lib/hooks/useGoal";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils/formatters";

interface GoalFormProps {
  goal: Goal;
  onCancel: () => void;
  onSubmit: () => void;
}

export const GoalForm = ({ goal, onCancel, onSubmit }: GoalFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description || "");
  const [target, setTarget] = useState(goal.target);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goal.title = title;
    goal.description = description;
    goal.target = target;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        placeholder="Enter goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        label="Description"
        placeholder="Enter goal description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Target"
        placeholder="Enter goal target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Update Goal
        </Button>
      </div>
    </form>
  );
};