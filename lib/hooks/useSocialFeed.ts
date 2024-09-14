"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api/client";
import { API_URL } from "@/lib/utils/constants";
import { useUser } from "@/lib/hooks/useUser";

export interface PostProps {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string | null;
    image: string | null;
    email: string;
  };
}

export interface SocialFeedState {
  isLoading: boolean;
  posts: PostProps[];
  error?: string;
}

export const useSocialFeed = (): [SocialFeedState, boolean, string | undefined] => {
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();
  const [socialFeedState, setSocialFeedState] = useState<SocialFeedState>({
    isLoading: true,
    posts: [],
    error: undefined,
  });

  useEffect(() => {
    const fetchSocialFeed = async () => {
      try {
        setSocialFeedState({ ...socialFeedState, isLoading: true });
        const response = await api.get(`${API_URL}/socialFeed`);
        if (response.error) {
          setSocialFeedState({
            ...socialFeedState,
            error: response.error.message,
            isLoading: false,
          });
        } else {
          setSocialFeedState({
            ...socialFeedState,
            posts: response.data,
            isLoading: false,
          });
        }
      } catch (error) {
        setSocialFeedState({
          ...socialFeedState,
          error: "Failed to fetch social feed",
          isLoading: false,
        });
      }
    };

    if (session && user) {
      fetchSocialFeed();
    }
  }, [session, user]);

  return [socialFeedState, socialFeedState.isLoading, socialFeedState.error];
};