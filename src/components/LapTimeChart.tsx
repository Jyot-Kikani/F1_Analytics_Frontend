import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Match the interface defined in page.tsx
interface LapTimeData {
  lap_num: number;
  time: number;
}

interface LapTimeChartProps {
  data: Record<string, LapTimeData[]>;
}

// Colors for multiple driver lines
const COLORS = [
  "rgb(255, 99, 132)", // red
  "rgb(54, 162, 235)", // blue
  "rgb(75, 192, 192)", // teal
  "rgb(255, 206, 86)", // yellow
  "rgb(153, 102, 255)", // purple
  "rgb(255, 159, 64)", // orange
  "rgb(22, 160, 133)", // green
  "rgb(142, 68, 173)", // violet
];

// Function to detect outliers using IQR method
function removeOutliers(laps: (number | null)[]): (number | null)[] {
  // Filter out null values first
  const validLaps = laps.filter((lap) => lap !== null) as number[];

  if (validLaps.length < 4) return laps; // Not enough data to reliably detect outliers

  // Sort the data
  const sorted = [...validLaps].sort((a, b) => a - b);

  // Calculate quartiles
  const q1Index = Math.floor(sorted.length / 4);
  const q3Index = Math.floor((sorted.length * 3) / 4);
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];

  // Calculate IQR and bounds
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  // Return the original array with outliers replaced by null
  return laps.map((lap) => {
    if (lap === null) return null;
    return lap < lowerBound || lap > upperBound ? null : lap;
  });
}

export default function LapTimeChart({ data }: LapTimeChartProps) {
  const [hideOutliers, setHideOutliers] = useState(false);

  // Find the maximum lap number using a loop instead of Math.max with spread
  let maxLap = 1; // Start with minimum of 1 lap
  for (const driverLaps of Object.values(data)) {
    for (const lap of driverLaps) {
      if (lap && lap.lap_num > maxLap) {
        maxLap = lap.lap_num;
      }
    }
  }

  // Generate lap numbers for x-axis
  const labels = Array.from({ length: maxLap }, (_, i) => i + 1);

  // Prepare datasets for each driver
  const datasets = Object.entries(data).map(([driver, laps], index) => {

    // Create an array with length = maxLap filled with null values
    const lapTimes = Array(maxLap).fill(null);

    // Fill in actual lap times where available
    laps.forEach((lap) => {
      if (
        lap &&
        lap.lap_num > 0 &&
        lap.lap_num <= maxLap &&
        lap.time !== undefined
      ) {
        lapTimes[lap.lap_num - 1] = lap.time;
      }
    });

    // Apply outlier filtering if enabled
    const filteredLapTimes = hideOutliers ? removeOutliers(lapTimes) : lapTimes;

    return {
      label: driver,
      data: filteredLapTimes,
      borderColor: COLORS[index % COLORS.length],
      backgroundColor: COLORS[index % COLORS.length] + "33", // Add transparency
      tension: 0.1,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2,
      spanGaps: true,
    };
  });

  const chartData: ChartData<"line"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Lap Time (seconds)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          callback: function (value) {
            if (typeof value === "number") {
              const minutes = Math.floor(value / 60);
              const seconds = (value % 60).toFixed(3);
              return `${minutes}:${seconds.padStart(6, "0")}`;
            }
            return value;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Lap Number",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            if (value === null) return `${context.dataset.label}: No time`;

            const minutes = Math.floor(value / 60);
            const seconds = (value % 60).toFixed(3);
            return `${context.dataset.label}: ${minutes}:${seconds.padStart(
              6,
              "0"
            )}`;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Lap Times Comparison",
        font: {
          size: 20,
          weight: "bold",
        },
        padding: {
          bottom: 30,
        },
      },
    },
  };

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hide-outliers"
            checked={hideOutliers}
            onChange={() => setHideOutliers(!hideOutliers)}
            className="mr-2 h-5 w-5"
          />
          <label htmlFor="hide-outliers" className="text-sm font-medium">
            Hide Outliers (Pit Stops & Anomalies)
          </label>
        </div>

        {hideOutliers && (
          <div className="ml-4 text-sm">
            Using 1.5 x IQR method to detect outliers
          </div>
        )}
      </div>

      <div className="h-[500px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
