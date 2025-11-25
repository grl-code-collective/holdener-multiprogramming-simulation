import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CPUPieChart = ({ numPrograms, cpuUtilization, sameUtilization, programTimes }) => {
  // Total CPU time for Pie chart representation is always 100%
  const totalCPUTime = 100;

  // Calculate the percentage of CPU used by each program based on programTimes
  const usedCPUPercentage = programTimes.reduce((acc, time) => acc + time, 0);

  // Calculate unused CPU percentage dynamically
  const unusedCPU = Math.max(0, totalCPUTime - usedCPUPercentage);

  // Generate labels for programs and unused CPU
  const labels = [
    ...Array.from({ length: programTimes.length }, (_, i) => `Program ${i + 1}`),
    unusedCPU > 0 ? 'Unused CPU' : null,
  ].filter(Boolean);

  // Data for the Pie chart
  const pieData = {
    labels,
    datasets: [
      {
        label: 'CPU Utilization (%)',
        data: [...programTimes, unusedCPU].filter(Boolean), // Include unused CPU if applicable
        backgroundColor: [
          ...Array.from({ length: programTimes.length }, (_, i) => `hsl(${i * 360 / numPrograms}, 100%, 50%)`),
          unusedCPU > 0 ? 'lightgray' : null, // Color for unused CPU
        ].filter(Boolean),
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw.toFixed(2)}%`,
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', marginTop: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h3>Overall CPU Utilization</h3>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default CPUPieChart;
