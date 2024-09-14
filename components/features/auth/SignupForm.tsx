"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Error } from "@/components/common/Error";
import { Success } from "@/components/common/Success";
import { useUser } from "@/lib/hooks/useUser";

export default function SignupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, userLoading, userError] = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to signup");
      setIsLoading(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
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
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
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
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Signup
          </Button>
        </div>
      </form>

      {errorMessage && (
        <Error message={errorMessage} onClose={() => setErrorMessage("")} />
      )}

      <Success
        isOpen={showSuccessMessage}
        onClose={handleCloseSuccessMessage}
        message="Signup successful! You can now login."
      />
    </div>
  );
}