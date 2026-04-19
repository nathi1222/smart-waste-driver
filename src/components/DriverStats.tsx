import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface DriverStatsProps {
  stats: {
    daily: { collections: number; distance: number; fuel: number };
    weekly: { collections: number; efficiency: number };
    monthly: { collections: number; rating: number };
    achievements: string[];
  };
}

const DriverStats: React.FC<DriverStatsProps> = ({ stats }) => {
  const pieData = {
    labels: ['Completed', 'Missed', 'Issues'],
    datasets: [
      {
        data: [120, 4, 3],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Collections',
        data: [95, 98, 102, 97, 105, 89],
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 text-white text-center">
          <div className="text-2xl font-bold">{stats.daily.collections}</div>
          <div className="text-xs opacity-90">Today's Collections</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 text-white text-center">
          <div className="text-2xl font-bold">{stats.daily.distance}km</div>
          <div className="text-xs opacity-90">Distance</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 text-white text-center">
          <div className="text-2xl font-bold">{stats.daily.fuel}L</div>
          <div className="text-xs opacity-90">Fuel Used</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h4 className="font-bold text-gray-800 mb-3">Collection Rate</h4>
        <div className="w-full h-48">
          <Pie data={pieData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h4 className="font-bold text-gray-800 mb-3">Weekly Performance</h4>
        <div className="w-full h-52">
          <Bar data={barData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h4 className="font-bold text-gray-800 mb-3">🏆 Achievements</h4>
        <div className="space-y-2">
          {stats.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <span className="text-2xl">⭐</span>
              <span className="text-sm text-gray-700">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverStats;