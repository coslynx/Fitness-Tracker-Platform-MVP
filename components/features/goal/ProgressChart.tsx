"use client";

import { useState, useEffect } from "react";
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
  goal: Goal;
  activityLogs: ActivityLog[];
}

export const ProgressChart = ({ goal, activityLogs }: Props) => {
  const [chartData, setChartData] = useState<
    {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    }
  >({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
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

    setChartData({
      labels: dataPoints.map((point) => formatDate(point.date)),
      datasets: [
        {
          label: goal.title,
          data: dataPoints.map((point) => point.progress),
          borderColor: "rgba(53, 162, 235, 1)",
          backgroundColor: "rgba(53, 162, 235, 0.2)",
        },
      ],
    });
  }, [goal, activityLogs]);

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