"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api/client";
import { API_URL } from "@/lib/utils/constants";
import { useUser } from "@/lib/hooks/useUser";

export interface ActivityLog {
  id: number;
  date: Date;
  description: string;
  goalId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  goal: {
    id: number;
    title: string;
    description: string | null;
    target: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
  };
}

export interface ActivityLogState {
  isLoading: boolean;
  activityLogs: ActivityLog[];
  error?: string;
}

export const useActivityLog = (
  goalId?: string
): [ActivityLogState, boolean, string | undefined] => {
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();
  const [activityLogState, setActivityLogState] = useState<ActivityLogState>({
    isLoading: true,
    activityLogs: [],
    error: undefined,
  });

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setActivityLogState({ ...activityLogState, isLoading: true });
        if (goalId) {
          const response = await api.get(
            `${API_URL}/activityLogs/${goalId}`
          );
          if (response.error) {
            setActivityLogState({
              ...activityLogState,
              error: response.error.message,
              isLoading: false,
            });
          } else {
            setActivityLogState({
              ...activityLogState,
              activityLogs: response.data,
              isLoading: false,
            });
          }
        } else {
          const response = await api.get(`${API_URL}/activityLogs`);
          if (response.error) {
            setActivityLogState({
              ...activityLogState,
              error: response.error.message,
              isLoading: false,
            });
          } else {
            setActivityLogState({
              ...activityLogState,
              activityLogs: response.data,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        setActivityLogState({
          ...activityLogState,
          error: "Failed to fetch activity logs",
          isLoading: false,
        });
      }
    };

    if (session && user && goalId) {
      fetchActivityLogs();
    }
  }, [session, user, goalId]);

  return [activityLogState, activityLogState.isLoading, activityLogState.error];
};