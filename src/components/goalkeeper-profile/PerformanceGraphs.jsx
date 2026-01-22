import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp } from "lucide-react";

export default function PerformanceGraphs({ recentGames = [] }) {
  // Sort games by date (most recent first) and take last 20
  const sortedGames = [...recentGames]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .slice(-20);

  // Prepare data for saves trend
  const savesData = sortedGames.map((game, index) => ({
    game: `G${index + 1}`,
    saves: game.saves || 0,
    goals_conceded: game.goals_conceded || 0,
  }));

  // Prepare data for distribution
  const distributionData = sortedGames.map((game, index) => ({
    game: `G${index + 1}`,
    passes: game.total_passes || 0,
    accurate_long_balls: game.accurate_long_balls || 0,
  }));

  // Prepare data for aerial dominance
  const aerialData = sortedGames.map((game, index) => ({
    game: `G${index + 1}`,
    high_claims: game.high_claims || 0,
    catches: game.catches || 0,
    punches: game.punches || 0,
  }));

  // Calculate performance insights
  const avgSaves = (sortedGames.reduce((sum, g) => sum + (g.saves || 0), 0) / sortedGames.length).toFixed(1);
  const cleanSheets = sortedGames.filter(g => g.clean_sheet).length;
  const avgPasses = (sortedGames.reduce((sum, g) => sum + (g.total_passes || 0), 0) / sortedGames.length).toFixed(1);
  const totalErrors = sortedGames.reduce((sum, g) => sum + (g.error_leading_to_goal || 0), 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-orange-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="relative py-12 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="text-orange-500" size={32} />
          <div>
            <h2 className="text-4xl font-black text-white">Performance Trends</h2>
            <p className="text-gray-400 text-sm mt-1">Last {sortedGames.length} matches analysis</p>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <div className="text-gray-400 text-sm mb-1">Avg Saves/Game</div>
            <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {avgSaves}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <div className="text-gray-400 text-sm mb-1">Clean Sheets</div>
            <div className="text-3xl font-black bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {cleanSheets}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <div className="text-gray-400 text-sm mb-1">Avg Passes/Game</div>
            <div className="text-3xl font-black bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {avgPasses}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <div className="text-gray-400 text-sm mb-1">Total Errors</div>
            <div className="text-3xl font-black bg-linear-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {totalErrors}
            </div>
          </div>
        </div>

        {/* Saves & Goals Conceded Trend */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 mb-8">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-orange-500" size={20} />
            Saves vs Goals Conceded
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="game" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="saves" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Saves"
                dot={{ fill: '#f97316', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="goals_conceded" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Goals Conceded"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Performance */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 mb-8">
          <h3 className="text-xl font-black text-white mb-4">Distribution Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="game" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="passes" fill="#3b82f6" name="Total Passes" />
              <Bar dataKey="accurate_long_balls" fill="#22c55e" name="Accurate Long Balls" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Aerial Dominance */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
          <h3 className="text-xl font-black text-white mb-4">Aerial Dominance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aerialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="game" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="high_claims" fill="#f97316" name="High Claims" />
              <Bar dataKey="catches" fill="#eab308" name="Catches" />
              <Bar dataKey="punches" fill="#ef4444" name="Punches" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}