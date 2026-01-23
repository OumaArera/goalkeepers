import { useState, useEffect } from "react";
import { Trophy, TrendingUp, Award, Shield, Loader2, Medal } from "lucide-react";
import { getData } from "../api/api.service";

export default function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const response = await getData("goalkeepers/rankings/");
      const data = response?.data;
      
      setRankings(data?.results || []);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="text-yellow-400" size={24} />;
    if (index === 1) return <Medal className="text-gray-300" size={24} />;
    if (index === 2) return <Medal className="text-orange-400" size={24} />;
    return <span className="text-2xl font-black text-gray-500">#{index + 1}</span>;
  };

  const getRankBadgeColor = (index) => {
    if (index === 0) return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
    if (index === 1) return "from-gray-400/20 to-gray-500/20 border-gray-400/30";
    if (index === 2) return "from-orange-500/20 to-orange-600/20 border-orange-500/30";
    return "from-orange-500/10 to-red-500/10 border-orange-500/20";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Trophy className="text-orange-500" size={16} />
              <span className="text-orange-400 text-sm font-bold">Leaderboard</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white">
              Goalkeeper
              <br />
              <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Rankings
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Top-performing goalkeepers ranked by saves, clean sheets, and overall performance
            </p>
          </div>
        </div>
      </section>

      {/* Rankings Content */}
      <section className="relative py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
          ) : rankings.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No rankings available</h3>
              <p className="text-gray-500">Rankings will appear once goalkeepers have played matches</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rankings.map((player, index) => (
                <div
                  key={player.id}
                  className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] ${
                    index < 3 ? 'border-orange-500/30' : 'border-orange-500/20'
                  }`}
                >
                  <div className="flex items-center gap-6 p-6">
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br border ${getRankBadgeColor(index)}`}>
                      {getRankIcon(index)}
                    </div>

                    {/* Player Avatar */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-linear-to-br from-orange-500/20 to-red-500/20 shrink-0">
                      <img
                        src={player.avatar}
                        alt={player.full_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-white mb-1 truncate">
                        {player.full_name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">
                          <span className="text-orange-400 text-sm font-bold">
                            Score: {player.ranking_score}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="hidden md:grid grid-cols-4 gap-4 shrink-0">
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.matches_played}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Matches</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.avg_saves.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Avg Saves</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.clean_sheets}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Clean Sheets</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.goals_conceded}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Conceded</div>
                      </div>
                    </div>

                    {/* View Profile Link */}
                    <a
                      href={`/goalkeepers/${player.id}`}
                      className="hidden lg:flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
                    >
                      View Profile
                      <TrendingUp size={16} />
                    </a>
                  </div>

                  {/* Mobile Stats */}
                  <div className="md:hidden px-6 pb-6">
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-lg font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.matches_played}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Matches</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-lg font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.avg_saves.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Avg Saves</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-lg font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.clean_sheets}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Clean Sheets</div>
                      </div>
                      <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                        <div className="text-lg font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {player.goals_conceded}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-semibold">Conceded</div>
                      </div>
                    </div>
                    <a
                      href={`/goalkeepers/${player.id}`}
                      className="block w-full mt-4 py-3 text-center bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
                    >
                      View Full Profile
                    </a>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}