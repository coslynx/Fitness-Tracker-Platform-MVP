"use client";

import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useActivityLog } from "@/lib/hooks/useActivityLog";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { formatDate } from "@/lib/utils/formatters";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip
);

interface Props {
  goals: Goal[];
  activityLogs: ActivityLog[];
}

export const AnalyticsChart = ({ goals, activityLogs }: Props) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const data = goals.map((goal) => {
      const goalActivityLogs = activityLogs.filter(
        (log) => log.goalId === goal.id
      );

      const dataPoints = goalActivityLogs.map((log) => ({
        date: log.date,
        progress:
          (goalActivityLogs.filter((_log) => _log.date <= log.date).length /
            goal.target) *
          100,
      }));

      return {
        label: goal.title,
        data: dataPoints.map((point) => point.progress),
        borderColor:
          goal.id % 2 === 0
            ? "rgba(53, 162, 235, 1)"
            : "rgba(255, 159, 64, 1)",
        backgroundColor:
          goal.id % 2 === 0
            ? "rgba(53, 162, 235, 0.2)"
            : "rgba(255, 159, 64, 0.2)",
      };
    });

    setChartData({
      labels: dataPoints.map((point) => formatDate(point.date)),
      datasets: data,
    });
  }, [goals, activityLogs]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Progress Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Progress (%)",
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};