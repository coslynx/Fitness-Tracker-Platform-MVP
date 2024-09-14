"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api/client";
import { API_URL } from "@/lib/utils/constants";
import { useUser } from "@/lib/hooks/useUser";

export interface Goal {
  id: number;
  title: string;
  description: string | null;
  target: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  activityLogs: {
    id: number;
    date: Date;
    description: string;
    goalId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface GoalState {
  isLoading: boolean;
  goal?: Goal;
  error?: string;
}

export const useGoal = (
  goalId?: string
): [GoalState, boolean, string | undefined] => {
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();
  const [goalState, setGoalState] = useState<GoalState>({
    isLoading: true,
    goal: undefined,
    error: undefined,
  });

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        setGoalState({ ...goalState, isLoading: true });
        if (goalId) {
          const response = await api.get(`${API_URL}/goals/${goalId}`);
          if (response.error) {
            setGoalState({
              ...goalState,
              error: response.error.message,
              isLoading: false,
            });
          } else {
            setGoalState({
              ...goalState,
              goal: response.data,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        setGoalState({
          ...goalState,
          error: "Failed to fetch goal",
          isLoading: false,
        });
      }
    };

    if (session && user && goalId) {
      fetchGoal();
    }
  }, [session, user, goalId]);

  return [goalState, goalState.isLoading, goalState.error];
};