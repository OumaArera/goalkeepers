import { Activity, Zap, Clock, TrendingUp, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TrainingLoad({ recent = [], totals = {}, averages = {}, sessions = 0 }) {
  // Sort recent sessions by date and take last 10
  const sortedSessions = [...recent]
    .sort((a, b) => new Date(a.session_date) - new Date(b.session_date))
    .slice(-10);

  // Prepare data for distance chart
  const distanceData = sortedSessions.map((session, index) => ({
    session: `S${index + 1}`,
    total: session.total_distance_km || 0,
    highSpeed: session.high_speed_distance_km || 0,
    sprint: session.sprint_distance_km || 0,
  }));

  // Prepare data for intensity
  const intensityData = sortedSessions.map((session, index) => ({
    session: `S${index + 1}`,
    intensity: session.intensity_score || 0,
    playerLoad: session.player_load || 0,
    avgHR: session.avg_heart_rate || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-orange-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
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
          <Zap className="text-orange-500" size={32} />
          <div>
            <h2 className="text-4xl font-black text-white">Training Load & Physical Data</h2>
            <p className="text-gray-400 text-sm mt-1">{sessions} training sessions tracked</p>
          </div>
        </div>

        {/* Total Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Activity className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.total_distance_km?.toFixed(1) || 0}</div>
            <div className="text-xs text-gray-400">Total KM</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <TrendingUp className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.high_speed_distance_km?.toFixed(1) || 0}</div>
            <div className="text-xs text-gray-400">High Speed KM</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Zap className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.sprint_distance_km?.toFixed(1) || 0}</div>
            <div className="text-xs text-gray-400">Sprint KM</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Target className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.sprint_count || 0}</div>
            <div className="text-xs text-gray-400">Total Sprints</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Activity className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.accelerations || 0}</div>
            <div className="text-xs text-gray-400">Accelerations</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Activity className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.decelerations || 0}</div>
            <div className="text-xs text-gray-400">Decelerations</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
            <Zap className="text-orange-500 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{totals.player_load?.toFixed(0) || 0}</div>
            <div className="text-xs text-gray-400">Player Load</div>
          </div>
        </div>

        {/* Average Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <Clock className="text-blue-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{averages.duration_minutes?.toFixed(0) || 0}</div>
            <div className="text-xs text-gray-400">Avg Duration (min)</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <TrendingUp className="text-green-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{averages.intensity_score?.toFixed(2) || 0}</div>
            <div className="text-xs text-gray-400">Avg Intensity</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <Zap className="text-red-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{averages.max_speed_kmh?.toFixed(1) || 0}</div>
            <div className="text-xs text-gray-400">Max Speed (km/h)</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
            <Activity className="text-purple-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{averages.avg_heart_rate?.toFixed(0) || 0}</div>
            <div className="text-xs text-gray-400">Avg Heart Rate</div>
          </div>
        </div>

        {/* Distance Covered Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 mb-8">
          <h3 className="text-xl font-black text-white mb-4">Distance Covered (Last 10 Sessions)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="session" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" name="Total Distance (km)" />
              <Bar dataKey="highSpeed" fill="#f97316" name="High Speed (km)" />
              <Bar dataKey="sprint" fill="#ef4444" name="Sprint (km)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Intensity & Load Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
          <h3 className="text-xl font-black text-white mb-4">Intensity & Load Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={intensityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="session" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Intensity Score"
                dot={{ fill: '#22c55e', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="playerLoad" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Player Load"
                dot={{ fill: '#f97316', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Sessions Details */}
        {sortedSessions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-black text-white mb-4">Recent Training Sessions</h3>
            <div className="space-y-4">
              {sortedSessions.slice(-3).reverse().map((session) => (
                <div 
                  key={session.id}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
                        {session.session_type}
                      </span>
                      <p className="text-white font-bold mt-2">{new Date(session.session_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        {session.duration_minutes} min
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Distance:</span>
                      <span className="text-white font-semibold ml-2">{session.total_distance_km} km</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sprints:</span>
                      <span className="text-white font-semibold ml-2">{session.sprint_count}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Max Speed:</span>
                      <span className="text-white font-semibold ml-2">{session.max_speed_kmh} km/h</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Intensity:</span>
                      <span className="text-white font-semibold ml-2">{session.intensity_score}</span>
                    </div>
                  </div>
                  
                  {session.notes && (
                    <p className="text-gray-400 text-sm mt-3 italic">{session.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}