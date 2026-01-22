import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Shield, TrendingUp, Award, MapPin, Calendar, Ruler, 
  ArrowLeft, Trophy, Target, Users, BarChart3, CheckCircle,
  Clock, Loader2, AlertCircle
} from "lucide-react";
import { getData } from "../api/api.service";

export default function GoalkeeperProfile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoalkeeperBySlug();
  }, [slug]);

  const fetchGoalkeeperBySlug = async () => {
    setLoading(true);
    setError(null);
    try {
      // First, get all players and find the one matching the slug
      const response = await getData("players/");
      const players = response?.data?.results || [];
      
      // Find player by slug (name converted to slug format)
      const player = players.find(p => 
        p.full_name.toLowerCase().replace(/\s+/g, "-") === slug
      );

      if (player) {
        setGoalkeeper(player);
      } else {
        setError("Goalkeeper not found");
      }
    } catch (err) {
      console.error("Error fetching goalkeeper:", err);
      setError("Failed to load goalkeeper profile");
    } finally {
      setLoading(false);
    }
  };

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'REJECTED': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-orange-500 mx-auto mb-4" size={64} />
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !goalkeeper) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-white mb-2">{error || "Goalkeeper not found"}</h2>
          <p className="text-gray-400 mb-6">The goalkeeper you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/goalkeepers')}
            className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Back to Goalkeepers
          </button>
        </div>
      </div>
    );
  }

  const stats = goalkeeper.goalkeeper_averages || {};
  const club = goalkeeper.clubs?.[0];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Back Button */}
      <div className="border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/goalkeepers')}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Goalkeepers</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Player Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-8">
                  <img
                    src={goalkeeper.avatar}
                    alt={goalkeeper.full_name}
                    className="w-full aspect-square object-cover rounded-2xl border-4 border-orange-500/20 shadow-2xl"
                  />
                  {goalkeeper.awards && goalkeeper.awards.length > 0 && (
                    <div className="absolute top-12 right-12 px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center gap-2">
                      <Award className="text-white" size={18} />
                      <span className="text-white font-black">{goalkeeper.awards.length} Awards</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Player Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
                  {goalkeeper.full_name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-lg">
                  {club && (
                    <>
                      <div className="flex items-center gap-2">
                        {club.logo && (
                          <img src={club.logo} alt={club.name} className="w-8 h-8 object-contain" />
                        )}
                        <span className="text-orange-400 font-bold">{club.name}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                    </>
                  )}
                  <span className="text-gray-400">{goalkeeper.country_of_birth}</span>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
                  <Calendar className="text-orange-500 mb-2" size={24} />
                  <div className="text-2xl font-black text-white">{getAge(goalkeeper.date_of_birth)}</div>
                  <div className="text-sm text-gray-400">Years Old</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
                  <Ruler className="text-orange-500 mb-2" size={24} />
                  <div className="text-2xl font-black text-white">{goalkeeper.height}m</div>
                  <div className="text-sm text-gray-400">Height</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
                  <MapPin className="text-orange-500 mb-2" size={24} />
                  <div className="text-2xl font-black text-white">{goalkeeper.country_of_residence}</div>
                  <div className="text-sm text-gray-400">Based In</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4">
                  <Shield className="text-orange-500 mb-2" size={24} />
                  <div className="text-2xl font-black text-white">{stats.clean_sheet_rate || 0}%</div>
                  <div className="text-sm text-gray-400">Clean Sheets</div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
                <h3 className="text-xl font-black text-white mb-3 flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  Player Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Date of Birth:</span>
                    <span className="text-white font-semibold ml-2">{formatDate(goalkeeper.date_of_birth)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Country of Birth:</span>
                    <span className="text-white font-semibold ml-2">{goalkeeper.country_of_birth}</span>
                  </div>
                  {club && (
                    <>
                      <div>
                        <span className="text-gray-400">Current Club:</span>
                        <span className="text-white font-semibold ml-2">{club.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Stadium:</span>
                        <span className="text-white font-semibold ml-2">{club.stadium_name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Statistics */}
      <section className="relative py-12 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-orange-500" size={32} />
            <h2 className="text-4xl font-black text-white">Performance Statistics</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Shot Stopping */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-black text-white">Shot Stopping</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Saves per Match</span>
                  <span className="text-orange-400 font-bold">{stats.saves || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Penalties Saved</span>
                  <span className="text-orange-400 font-bold">{stats.penalty_saved || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Goals Conceded</span>
                  <span className="text-orange-400 font-bold">{stats.goals_conceded || 0}</span>
                </div>
              </div>
            </div>

            {/* Aerial */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-black text-white">Aerial Ability</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">High Claims</span>
                  <span className="text-orange-400 font-bold">{stats.high_claims || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Catches</span>
                  <span className="text-orange-400 font-bold">{stats.catches || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Punches</span>
                  <span className="text-orange-400 font-bold">{stats.punches || 0}</span>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-black text-white">Distribution</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Passes per Match</span>
                  <span className="text-orange-400 font-bold">{stats.passes_per_match || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Accurate Long Balls</span>
                  <span className="text-orange-400 font-bold">{stats.accurate_long_balls || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Build Up</span>
                  <span className="text-orange-400 font-bold">{stats.build_up || 0}</span>
                </div>
              </div>
            </div>

            {/* Sweeping */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-black text-white">Sweeping</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Clearances</span>
                  <span className="text-orange-400 font-bold">{stats.sweeper_clearances || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Goal Kicks</span>
                  <span className="text-orange-400 font-bold">{stats.goal_kicks || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Throw Outs</span>
                  <span className="text-orange-400 font-bold">{stats.throw_outs || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Achievements */}
      {goalkeeper.awards && goalkeeper.awards.length > 0 && (
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="text-orange-500" size={32} />
              <h2 className="text-4xl font-black text-white">Awards & Achievements</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {goalkeeper.awards.map((award) => (
                <div
                  key={award.id}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                        <Award className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{award.title}</h3>
                        <p className="text-orange-400 text-sm font-semibold">{award.competition}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(award.status)}`}>
                      {award.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{award.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} />
                      <span>{formatDate(award.award_date)}</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={16} />
                      <span>{award.season}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}