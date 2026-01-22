import { Shield, TrendingUp, Target, CheckCircle, BarChart3 } from "lucide-react";

export default function PerformanceStats({ stats = {} }) {
  return (
    <section className="relative py-12 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-orange-500" size={32} />
          <div>
            <h2 className="text-4xl font-black text-white">Performance Statistics</h2>
            <p className="text-gray-400 text-sm mt-1">Season averages across all competitions</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Shot Stopping */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-white">Shot Stopping</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Saves per Match</span>
                <span className="text-orange-400 font-bold text-lg">{stats.saves || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Penalties Saved</span>
                <span className="text-orange-400 font-bold text-lg">{stats.penalty_saved || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Goals Conceded</span>
                <span className="text-red-400 font-bold text-lg">{stats.goals_conceded || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Errors Leading to Goal</span>
                <span className="text-red-400 font-bold text-lg">{stats.error_leading_to_goal || 0}</span>
              </div>
            </div>
          </div>

          {/* Aerial Ability */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-white">Aerial Ability</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">High Claims</span>
                <span className="text-orange-400 font-bold text-lg">{stats.high_claims || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Catches</span>
                <span className="text-orange-400 font-bold text-lg">{stats.catches || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Punches</span>
                <span className="text-orange-400 font-bold text-lg">{stats.punches || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Corner Goals Conceded</span>
                <span className="text-red-400 font-bold text-lg">{stats.corner_goals_conceded || 0}</span>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-white">Distribution</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Passes per Match</span>
                <span className="text-orange-400 font-bold text-lg">{stats.passes_per_match || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Accurate Long Balls</span>
                <span className="text-orange-400 font-bold text-lg">{stats.accurate_long_balls || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Build Up</span>
                <span className="text-orange-400 font-bold text-lg">{stats.build_up || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Missed Passes</span>
                <span className="text-red-400 font-bold text-lg">{stats.total_missed_passes || 0}</span>
              </div>
            </div>
          </div>

          {/* Sweeping */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-white">Sweeping</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Clearances</span>
                <span className="text-orange-400 font-bold text-lg">{stats.sweeper_clearances || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Goal Kicks</span>
                <span className="text-orange-400 font-bold text-lg">{stats.goal_kicks || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Throw Outs</span>
                <span className="text-orange-400 font-bold text-lg">{stats.throw_outs || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Assists</span>
                <span className="text-green-400 font-bold text-lg">{stats.assists || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}