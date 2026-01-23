// src/components/goalkeeper-profile/ProfileHeader.jsx
import { Award, Calendar, Ruler, MapPin, Shield, Users, TrendingUp, Scale, Zap  } from "lucide-react";

export default function ProfileHeader({ player, clubs, awards, stats, matchesPlayed, cleanSheetRate }) {
  const club = clubs?.[0];

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

  return (
    <section className="relative overflow-hidden border-b border-orange-500/20">
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Player Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-8">
                <img
                  src={player.avatar}
                  alt={player.full_name}
                  className="w-full h-96 aspect-square object-cover rounded-2xl border-4 border-orange-500/20 shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                  }}
                />
                {awards && awards.length > 0 && (
                  <div className="absolute top-12 right-12 px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center gap-2 shadow-lg">
                    <Award className="text-white" size={18} />
                    <span className="text-white font-black">{awards.length} Awards</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Player Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
                {player.full_name}
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
                <span className="text-gray-400">{player.country_of_birth}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <Calendar className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{getAge(player.date_of_birth)}</div>
                <div className="text-sm text-gray-400">Years Old</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <Ruler className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{player.height}ft</div>
                <div className="text-sm text-gray-400">Height</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <Scale className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{player.weight || "N/A"}kg</div>
                <div className="text-sm text-gray-400">Weight</div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <Zap className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{player.preferred_foot || "N/A"}</div>
                <div className="text-sm text-gray-400">Preferred Foot</div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <MapPin className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{player.country_of_residence}</div>
                <div className="text-sm text-gray-400">Based In</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 hover:border-orange-500/50 transition-all">
                <Shield className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-white">{cleanSheetRate || 0}%</div>
                <div className="text-sm text-gray-400">Clean Sheets</div>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-orange-500" size={20} />
                Season Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {matchesPlayed || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Matches</div>
                </div>
                <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {stats?.saves || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Avg Saves</div>
                </div>
                <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {stats?.passes_per_match || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Avg Passes</div>
                </div>
                <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {stats?.high_claims || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">High Claims</div>
                </div>
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
                  <span className="text-white font-semibold ml-2">{formatDate(player.date_of_birth)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Country of Birth:</span>
                  <span className="text-white font-semibold ml-2">{player.country_of_birth}</span>
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
                    <div>
                      <span className="text-gray-400">City:</span>
                      <span className="text-white font-semibold ml-2">{club.city}, {club.country}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Founded:</span>
                      <span className="text-white font-semibold ml-2">{club.founded_year}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}