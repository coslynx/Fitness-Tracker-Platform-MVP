"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Error } from "@/components/common/Error";
import { useUser } from "@/lib/hooks/useUser";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, userLoading, userError] = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to login");
      setIsLoading(false);
    }
  };

  if (userLoading) {
    return <Loader />;
  }

  if (userError) {
    return <Error message={userError.message} />;
  }

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </form>

      {errorMessage && (
        <Error message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </div>
  );
}