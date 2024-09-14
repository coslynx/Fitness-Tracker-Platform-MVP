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
  const id = req.query.id as string;

  if (req.method === "GET") {
    try {
      const activityLog = await prisma.activityLog.findUnique({
        where: { id: parseInt(id) },
        include: { goal: true },
      });

      if (!activityLog) {
        return res.status(404).json({ message: "Activity log not found" });
      }

      return res.status(200).json(activityLog);
    } catch (error) {
      console.error("Error fetching activity log:", error);
      return res.status(500).json({ message: "Failed to fetch activity log" });
    }
  } else if (req.method === "PUT") {
    const { description } = req.body;

    try {
      const activityLog = await prisma.activityLog.update({
        where: { id: parseInt(id) },
        data: { description },
      });

      return res.status(200).json(activityLog);
    } catch (error) {
      console.error("Error updating activity log:", error);
      return res.status(500).json({ message: "Failed to update activity log" });
    }
  } else if (req.method === "DELETE") {
    try {
      const activityLog = await prisma.activityLog.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json(activityLog);
    } catch (error) {
      console.error("Error deleting activity log:", error);
      return res.status(500).json({ message: "Failed to delete activity log" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}