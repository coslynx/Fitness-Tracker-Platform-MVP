"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/common/Error";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils/formatters";
import { useUser } from "@/lib/hooks/useUser";

interface PostProps {
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

interface SocialFeedProps {
  socialFeed: PostProps[];
}

export const SocialFeed = ({ socialFeed }: SocialFeedProps) => {
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, postsLoading, postsError] = useSocialFeed();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleCreatePost = async () => {
    try {
      // Submit new post to the backend API
      const response = await fetch("/api/socialFeed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPostContent }),
      });

      if (response.ok) {
        setNewPostContent("");
        setShowCreatePostModal(false);
        // Update socialFeed state with the new post
        // ...
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("Failed to create post");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (postsLoading) {
    return <Loader />;
  }

  if (postsError) {
    return <Error message={postsError.message} />;
  }

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id}>
            <div className="flex items-center gap-2 mb-2">
              {post.user.image ? (
                <img
                  src={post.user.image}
                  alt={post.user.name || post.user.email}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {post.user.name?.slice(0, 1)}
                </div>
              )}
              <p className="text-sm font-medium">
                {post.user.name || post.user.email}
              </p>
            </div>
            <p className="text-sm">{post.content}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </p>
              {/* Add Like/Comment buttons here (optional) */}
            </div>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">No posts yet.</p>
      )}
      {session && (
        <Button variant="primary" onClick={() => setShowCreatePostModal(true)}>
          Create Post
        </Button>
      )}
      <Modal
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        title="Create New Post"
      >
        <div className="space-y-4">
          <Input
            label="Content"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <Button variant="primary" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
      </Modal>
      {errorMessage && (
        <Error message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </div>
  );
};