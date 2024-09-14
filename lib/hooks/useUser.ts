"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api/client";
import { API_URL } from "@/lib/utils/constants";

export interface User {
  id: number;
  email: string;
  name: string | null;
  image: string | null;
  goals: {
    id: number;
    title: string;
    description: string | null;
    target: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
  }[];
}

export interface UserState {
  isLoading: boolean;
  user?: User;
  error?: string;
}

export const useUser = (): [UserState, boolean, string | undefined] => {
  const { data: session } = useSession();
  const [userState, setUserState] = useState<UserState>({
    isLoading: true,
    user: undefined,
    error: undefined,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserState({ ...userState, isLoading: true });
        if (session?.user.id) {
          const response = await api.get(`${API_URL}/users/${session.user.id}`);
          if (response.error) {
            setUserState({
              ...userState,
              error: response.error.message,
              isLoading: false,
            });
          } else {
            setUserState({
              ...userState,
              user: response.data,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        setUserState({
          ...userState,
          error: "Failed to fetch user",
          isLoading: false,
        });
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  return [userState, userState.isLoading, userState.error];
};