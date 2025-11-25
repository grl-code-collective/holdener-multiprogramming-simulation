import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TOTAL_CPU_TIME_MS = 1000; // Define the total CPU time period in milliseconds

const CPUActivityChart = ({ numPrograms, cpuUtilization, sameUtilization, programTimes }) => {
  // Generate labels and data for the bar chart
  const labels = Array.from({ length: numPrograms }, (_, i) => `Program ${i + 1}`);

  const data = programTimes.map((time) => (time / 100) * TOTAL_CPU_TIME_MS);

  const chartData = {
    labels, // The program names will be displayed along X-axis
    datasets: [
      {
        label: 'CPU Time (ms) Over Time',
        data, // Stacked data for each program in milliseconds
        backgroundColor: Array.from({ length: numPrograms }, (_, i) => `hsl(${i * 360 / numPrograms}, 100%, 50%)`), // Different color for each bar
        stack: 'Stack 0', // Make sure each dataset is stacked together
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true, // Enable stacking on X-axis
        title: { display: true, text: 'Programs' },
      },
      y: {
        stacked: true, // Enable stacking on Y-axis
        title: { display: true, text: 'CPU Time (ms)' }, // Show Y-axis label as CPU Time in milliseconds
        suggestedMax: TOTAL_CPU_TIME_MS, // Set the max to the total CPU time period in milliseconds
        ticks: {
          callback: function(value) {
            return `${value} ms`; // Show CPU time in milliseconds
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw.toFixed(2)} ms`, // Show CPU time in milliseconds in tooltip
        },
      },
    },
  };

  return (
    <div>
      <h3>CPU Activity Over Time (ms)</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CPUActivityChart;
