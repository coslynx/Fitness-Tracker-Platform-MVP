"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/common/Error";
import { useUser } from "@/lib/hooks/useUser";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, userLoading, userError] = useUser();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (userLoading) {
    return <Loader />;
  }

  if (userError) {
    return <Error message={userError.message} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
      <Card className="w-full md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to the Fitness Tracker
        </h1>
        <p className="text-lg text-center">
          Track your progress, set goals, and stay motivated!
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="primary" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => router.push("/signup")}>
            Signup
          </Button>
        </div>
      </Card>
      <img
        src="/assets/images/hero.jpg"
        alt="Fitness Tracker Hero"
        className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-md"
      />
    </div>
  );
}