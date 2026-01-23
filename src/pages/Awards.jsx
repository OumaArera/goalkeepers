import { useState, useEffect } from "react";
import { Award, Trophy, Medal, Star, ChevronRight, Calendar, MapPin } from "lucide-react";
import { getData } from "../api/api.service";

export default function AwardsPage() {
  const [awards, setAwards] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getAwards();
  }, []);

  const getAwards = async () => {
    try {
      setLoading(true);
      const response = await getData("awards/");
      const results = response?.data?.results || [];
      setAwards(results);
      
    } catch (error) {
      console.error("Error fetching awards:", error);
      // Use sample data on error
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = [
    { value: "all", label: "All Awards" },
    { value: "PENDING", label: "Upcoming" },
    { value: "APPROVED", label: "Awarded" },
  ];

  const filteredAwards = awards.filter((award) => {
    if (filter === "all") return true;
    return award.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "PENDING":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const getAwardIcon = (competition) => {
    if (competition.toLowerCase().includes("premier")) return Trophy;
    if (competition.toLowerCase().includes("goalkeeper")) return Award;
    return Medal;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Trophy className="text-orange-500" size={16} />
              <span className="text-orange-400 text-sm font-bold">Celebrating Excellence</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Awards & <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Recognition</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Honoring Kenya's finest goalkeepers for their outstanding performances, 
              dedication, and contribution to the sport.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  filter === option.value
                    ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-slate-900 text-gray-400 border border-orange-500/20 hover:border-orange-500/50 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
              <p className="text-gray-400 mt-4">Loading awards...</p>
            </div>
          ) : filteredAwards.length === 0 ? (
            <div className="text-center py-20">
              <Award className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-2xl font-black text-white mb-2">No Awards Found</h3>
              <p className="text-gray-400">Check back later for upcoming awards and recognitions.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAwards.map((award) => {
                const IconComponent = getAwardIcon(award.competition);
                return (
                  <div
                    key={award.id}
                    className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                  >
                    {/* Award Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30">
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(award.status)}`}>
                        {award.status === "APPROVED" ? "Awarded" : "Upcoming"}
                      </div>
                    </div>

                    {/* Award Title */}
                    <h3 className="text-xl font-black text-white mb-2 line-clamp-2">
                      {award.title}
                    </h3>

                    {/* Competition */}
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy size={14} className="text-orange-500" />
                      <span className="text-orange-400 text-sm font-semibold">{award.competition}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {award.description}
                    </p>

                    {/* Player Info */}
                    <div className="mb-4 pb-4 border-b border-orange-500/20">
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-orange-500" />
                        <span className="text-white font-bold text-sm">{award.player_name}</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={12} className="text-orange-500/70" />
                        <span>{award.season}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <MapPin size={12} className="text-orange-500/70" />
                        <span>Award Date: {new Date(award.award_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <a
                      href={`/goalkeepers/${award.player}`}
                      className="mt-4 flex items-center gap-2 text-orange-400 text-sm font-bold hover:text-orange-300 transition-colors group/link"
                    >
                      View Player Profile
                      <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    {/* Hover Effect Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Awards Section */}
      <section className="relative py-16 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8 lg:p-12">
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl shadow-orange-500/30">
                <Award className="text-white" size={32} />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-black text-white">
                About Our Awards
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                The Goalkeepers Alliance Kenya awards recognize exceptional talent, consistent performance, 
                and significant contributions to goalkeeping in Kenya. These accolades celebrate the dedication 
                and skill of goalkeepers who inspire the next generation and elevate the standard of the sport.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {awards.length}
                  </div>
                  <div className="text-gray-400 text-sm font-semibold">Total Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {awards.filter(a => a.status === "APPROVED").length}
                  </div>
                  <div className="text-gray-400 text-sm font-semibold">Awarded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {awards.filter(a => a.status === "PENDING").length}
                  </div>
                  <div className="text-gray-400 text-sm font-semibold">Upcoming</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}