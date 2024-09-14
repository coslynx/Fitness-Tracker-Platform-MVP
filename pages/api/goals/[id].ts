"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;
  const goalId = req.query.id as string;

  if (req.method === "GET") {
    try {
      const goal = await prisma.goal.findUnique({
        where: {
          id: parseInt(goalId),
          userId,
        },
        include: {
          activityLogs: true,
        },
      });

      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      return res.status(200).json(goal);
    } catch (error) {
      console.error("Error fetching goal:", error);
      return res.status(500).json({ message: "Failed to fetch goal" });
    }
  } else if (req.method === "PUT") {
    const { title, description, target } = req.body;

    try {
      const goal = await prisma.goal.update({
        where: {
          id: parseInt(goalId),
          userId,
        },
        data: {
          title,
          description,
          target,
        },
      });

      return res.status(200).json(goal);
    } catch (error) {
      console.error("Error updating goal:", error);
      return res.status(500).json({ message: "Failed to update goal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const goal = await prisma.goal.delete({
        where: {
          id: parseInt(goalId),
          userId,
        },
      });

      return res.status(200).json(goal);
    } catch (error) {
      console.error("Error deleting goal:", error);
      return res.status(500).json({ message: "Failed to delete goal" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}