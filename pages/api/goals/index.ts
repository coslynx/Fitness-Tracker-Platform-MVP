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

  if (req.method === "GET") {
    try {
      const goals = await prisma.goal.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      return res.status(500).json({ message: "Failed to fetch goals" });
    }
  } else if (req.method === "POST") {
    const { title, description, target } = req.body;

    if (!title || !target) {
      return res
        .status(400)
        .json({ message: "Title and Target are required" });
    }

    try {
      const goal = await prisma.goal.create({
        data: {
          title,
          description,
          target,
          userId,
        },
      });
      return res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      return res.status(500).json({ message: "Failed to create goal" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}