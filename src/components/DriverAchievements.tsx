import React from 'react';
import { ChevronLeftIcon, TrophyIcon, StarIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

interface DriverAchievementsProps {
  onBack: () => void;
  driverName: string;
  score: number;
  level: number;
}

const DriverAchievements: React.FC<DriverAchievementsProps> = ({ onBack, driverName, score, level }) => {
  const achievements = [
    { name: 'Early Bird', description: 'Complete route before 2 PM', icon: '🌅', completed: true, points: 100 },
    { name: 'Perfect Week', description: 'No missed collections for 5 days', icon: '⭐', completed: true, points: 500 },
    { name: 'Photo Pro', description: 'Take 50 issue photos', icon: '📸', completed: false, points: 200, progress: 32 },
    { name: 'Route Master', description: 'Complete 100 routes', icon: '🗺️', completed: false, points: 1000, progress: 45 },
    { name: 'Customer Champion', description: 'Get 100 five-star ratings', icon: '🏆', completed: false, points: 750, progress: 28 },
    { name: 'Safety First', description: 'No incidents for 30 days', icon: '🛡️', completed: true, points: 300 },
  ];

  const nextLevelPoints = (level + 1) * 1000;
  const currentLevelPoints = level * 1000;
  const pointsToNext = nextLevelPoints - score;
  const progress = ((score - currentLevelPoints) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-5 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Driver Achievements</h1>
            <p className="text-amber-200 text-sm mt-1">{driverName}'s Progress</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        {/* Score Card */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-6 shadow-xl text-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <TrophyIcon className="h-8 w-8 text-yellow-300 mb-2" />
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Level {level}</div>
              <div className="text-2xl font-bold">{driverName}</div>
            </div>
          </div>
          
          {/* Progress to next level */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {level + 1}</span>
              <span>{pointsToNext} points needed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-yellow-300 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-500 rounded-full"></span>
            Recent Badges
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-3xl mb-1">🌅</div>
              <div className="text-white font-bold text-xs">Early Bird</div>
              <div className="text-white/80 text-xs">+100 pts</div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-white font-bold text-xs">Perfect Week</div>
              <div className="text-white/80 text-xs">+500 pts</div>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-3xl mb-1">🛡️</div>
              <div className="text-white font-bold text-xs">Safety First</div>
              <div className="text-white/80 text-xs">+300 pts</div>
            </div>
          </div>
        </div>

        {/* All Achievements */}
        <div>
          <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
            All Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((ach, idx) => (
              <div key={idx} className={`bg-white rounded-xl p-4 shadow-md ${ach.completed ? 'border-l-4 border-green-500' : 'opacity-75'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{ach.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-bold text-gray-800">{ach.name}</div>
                      <div className="text-xs text-green-600 font-semibold">+{ach.points} pts</div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{ach.description}</div>
                    {!ach.completed && ach.progress && (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(ach.progress / 100) * 100}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{ach.progress}% complete</div>
                      </div>
                    )}
                    {ach.completed && (
                      <div className="flex items-center gap-1 mt-1">
                        <StarIcon className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-green-600">Unlocked!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <RocketLaunchIcon className="h-5 w-5 text-yellow-400" />
            <h3 className="text-white font-bold">This Week's Leaderboard</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">1</span>
                <span className="text-white">Mike Davis</span>
              </div>
              <span className="text-green-400">2,450 pts</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-bold">2</span>
                <span className="text-white">Sarah Johnson</span>
              </div>
              <span className="text-green-400">2,120 pts</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">3</span>
                <span className="text-white font-bold">{driverName}</span>
              </div>
              <span className="text-green-400 font-bold">{score} pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAchievements;