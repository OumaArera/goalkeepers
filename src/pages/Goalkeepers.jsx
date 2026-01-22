import { useState, useEffect } from "react";
import { Shield, TrendingUp, Award, Search, Filter, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getData } from "../api/api.service";



export default function Goalkeepers() {
  const [goalkeepers, setGoalkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [filterClub, setFilterClub] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    fetchGoalkeepers();
  }, [currentPage]);

  const fetchGoalkeepers = async (url = null) => {
    setLoading(true);
    try {
      const endpoint = url || "players/";
      const response = await getData(endpoint);
      const data = response?.data;
      
      setGoalkeepers(data?.results || []);
      setTotalCount(data?.count || 0);
      setNextPage(data?.next);
      setPreviousPage(data?.previous);
    } catch (error) {
      console.error("Error fetching goalkeepers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(prev => prev + 1);
      fetchGoalkeepers(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPage(prev => prev - 1);
      fetchGoalkeepers(previousPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredGoalkeepers = goalkeepers.filter(gk => {
    const matchesSearch = gk.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = !filterClub || gk.clubs?.some(club => club.name === filterClub);
    const matchesCountry = !filterCountry || gk.country_of_birth === filterCountry;
    return matchesSearch && matchesClub && matchesCountry;
  });

  const uniqueClubs = [...new Set(goalkeepers.flatMap(gk => gk.clubs?.map(club => club.name) || []))];
  const uniqueCountries = [...new Set(goalkeepers.map(gk => gk.country_of_birth).filter(Boolean))];

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

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Shield className="text-orange-500" size={16} />
              <span className="text-orange-400 text-sm font-bold">Goalkeeper Directory</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white">
              Discover Kenya's
              <br />
              <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Elite Goalkeepers
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse comprehensive profiles, statistics, and achievements of Kenya's finest shot-stoppers
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative border-b border-orange-500/20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            {/* Club Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterClub}
                onChange={(e) => setFilterClub(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Clubs</option>
                {uniqueClubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredGoalkeepers.length} of {totalCount} goalkeepers
          </div>
        </div>
      </section>

      {/* Goalkeepers Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
          ) : filteredGoalkeepers.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No goalkeepers found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGoalkeepers.map((gk) => (
                  <div
                    key={gk.id}
                    className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                  >
                    {/* Card Header */}
                    <div className="relative h-48 bg-linear-to-br from-orange-500/20 to-red-500/20">
                      <img
                        src={gk.avatar}
                        alt={gk.full_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
                      
                      {/* Awards Badge */}
                      {gk.awards && gk.awards.length > 0 && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center gap-1">
                          <Award className="text-white" size={14} />
                          <span className="text-white text-xs font-bold">{gk.awards.length}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {/* Player Info */}
                      <div>
                        <h3 className="text-xl font-black text-white mb-2">{gk.full_name}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-orange-400 font-semibold">
                            {gk.clubs && gk.clubs.length > 0 ? gk.clubs[0].name : "Free Agent"}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{gk.country_of_birth}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>Age: {getAge(gk.date_of_birth)}</span>
                          <span>•</span>
                          <span>Height: {gk.height}m</span>
                        </div>
                      </div>

                      {/* Key Stats */}
                      {gk.goalkeeper_averages && (
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                            <div className="text-2xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                              {gk.goalkeeper_averages.saves || 0}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 font-semibold">Saves</div>
                          </div>
                          <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                            <div className="text-2xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                              {gk.goalkeeper_averages.passes_per_match || 0}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 font-semibold">Passes</div>
                          </div>
                          <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-orange-500/10">
                            <div className="text-2xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                              {gk.goalkeeper_averages.clean_sheet_rate || 0}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 font-semibold">CS Rate</div>
                          </div>
                        </div>
                      )}

                      {/* View Profile Button */}
                      <a
                        href={`/goalkeepers/${gk.full_name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block w-full py-3 text-center bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
                      >
                        View Full Profile
                      </a>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {(nextPage || previousPage) && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={handlePreviousPage}
                    disabled={!previousPage}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold border border-orange-500/20 hover:border-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>

                  <span className="text-gray-400 font-semibold">
                    Page {currentPage}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={!nextPage}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold border border-orange-500/20 hover:border-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}