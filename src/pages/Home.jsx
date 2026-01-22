import { useState, useEffect } from "react";
import { TrendingUp, Award, Shield, BarChart3, Users, ChevronRight, Star, Target, Zap } from "lucide-react";
import { getData } from "../api/api.service";

export default function Homepage() {
    const [players, setPlayers] = useState([]);
    const [featuredGoalkeeper, setFeaturedGoalkeeper] = useState(null);
    const [topPerformers, setTopPerformers] = useState([]);



    const getRandomPlayers = (list, count = 3) => {
        if (!Array.isArray(list)) return [];
        return [...list]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    };


    useEffect(()=>{
        getPlayers()
    }, [])
    
    const getPlayers = async () => {
        const response = await getData("players/");
        const results = response?.data?.results || [];
        console.log("Res: ", JSON.stringify(results))
        setPlayers(results);

        // Randomize from returned 10 players
        const randomSelection = getRandomPlayers(results, 3);

        // Featured goalkeeper (first random)
        if (randomSelection[0]) {
            const p = randomSelection[0];
            setFeaturedGoalkeeper({
            id: p.id,
            name: p.full_name,
            avatar: p.avatar,
            club: p.clubs?.[0]?.name || "Unknown Club",
            clubLogo: p.clubs?.[0]?.logo || "",
            country: p.country_of_birth,
            stats: {
                saves: p.goalkeeper_averages?.saves ?? 0,
                passesPerMatch: p.goalkeeper_averages?.passes_per_match ?? 0,
            },
            awards: p.awards?.length || 0,
            slug: p.full_name.toLowerCase().replace(/\s+/g, "-"),
            });
        }

        // Top performers (remaining 2)
        setTopPerformers(
            randomSelection.slice(1).map((p) => ({
            id: p.id,
            name: p.full_name,
            club: p.clubs?.[0]?.name || "Unknown Club",
            stat: `${p.goalkeeper_averages?.saves ?? 0} Saves/Match`,
            avatar: p.avatar,
            }))
        );
        };


  const statCategories = [
    { icon: Shield, label: "Shot Stopping", value: "Elite Reflexes", color: "from-orange-500 to-red-500" },
    { icon: Target, label: "Distribution", value: "34 Passes/Match", color: "from-red-500 to-orange-500" },
    { icon: Zap, label: "Aerial Dominance", value: "4 High Claims", color: "from-orange-600 to-red-600" },
    { icon: Award, label: "Clean Sheets", value: "Improving", color: "from-red-600 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
                <Star className="text-orange-500" size={16} />
                <span className="text-orange-400 text-sm font-bold">Kenya's Premier Goalkeeper Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-white">Where</span>
                <br />
                <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                  Goalkeepers
                </span>
                <br />
                <span className="text-white">Become Legends</span>
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                The definitive platform for discovering, analyzing, and celebrating Kenya's finest goalkeepers. 
                Connecting talent with opportunity through data-driven insights.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="/goalkeepers"
                  className="group relative px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-black hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">Explore Goalkeepers</span>
                  <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a
                  href="/rankings"
                  className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold border border-orange-500/20 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 flex items-center gap-2"
                >
                  <BarChart3 size={20} className="text-orange-500" />
                  View Rankings
                </a>
              </div>
            </div>
            
            {/* Right Content - Featured Player */}
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-8 shadow-2xl">
                <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-black">
                  FEATURED
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur"></div>
                    <img
                      src={featuredGoalkeeper?.avatar}
                      alt={featuredGoalkeeper?.name}
                      className="relative h-20 w-20 object-cover rounded-full border-2 border-white shadow-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{featuredGoalkeeper?.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-orange-400 text-sm font-semibold">{featuredGoalkeeper?.club}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{featuredGoalkeeper?.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-950/50 rounded-xl border border-orange-500/10">
                    <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {featuredGoalkeeper?.stats?.saves}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-semibold">Saves/Match</div>
                  </div>
                  <div className="text-center p-4 bg-slate-950/50 rounded-xl border border-orange-500/10">
                    <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {featuredGoalkeeper?.stats?.passesPerMatch}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-semibold">Passes/Match</div>
                  </div>
                  <div className="text-center p-4 bg-slate-950/50 rounded-xl border border-orange-500/10">
                    <div className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {featuredGoalkeeper?.awards}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-semibold">Awards</div>
                  </div>
                </div>
                
                <a
                  href={`/goalkeepers/${featuredGoalkeeper?.slug}`}
                  className="block w-full py-3 text-center bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold hover:bg-linear-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
                >
                  View Full Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Categories */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Elite Performance Metrics
            </h2>
            <p className="text-gray-400 text-lg">Data-driven insights into goalkeeping excellence</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCategories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-3 bg-linear-to-r ${category.color} rounded-xl mb-4 shadow-lg shadow-orange-500/20`}>
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-black text-lg mb-2">{category.label}</h3>
                <p className="text-orange-400 font-bold text-sm">{category.value}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Top Performers</h2>
              <p className="text-gray-400">Leading goalkeepers this season</p>
            </div>
            <a
              href="/rankings"
              className="group text-orange-400 font-bold flex items-center gap-2 hover:text-orange-300 transition-colors"
            >
              View All Rankings
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPerformers.map((player, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur opacity-75"></div>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="relative h-16 w-16 object-cover rounded-full border-2 border-white"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black text-lg">{player.name}</h3>
                    <p className="text-gray-400 text-sm">{player.club}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-orange-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-semibold">Key Stat</span>
                    <span className="text-orange-400 font-black">{player.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
                <TrendingUp className="text-orange-500" size={16} />
                <span className="text-orange-400 text-sm font-bold">Our Mission</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Elevating Kenyan Goalkeeping Through Data & Recognition
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                We're building the most comprehensive platform for goalkeeper talent discovery in Kenya. 
                By digitizing performance data and making it accessible to clubs, scouts, and fans, we're 
                creating opportunities for our nation's finest shot-stoppers to shine on bigger stages.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Comprehensive Stats</h3>
                    <p className="text-gray-400 text-sm">Track saves, distribution, aerial dominance, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Connect Talent with Opportunity</h3>
                    <p className="text-gray-400 text-sm">Helping clubs discover the next generation of goalkeepers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                    <Award className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Recognition & Awards</h3>
                    <p className="text-gray-400 text-sm">Celebrating excellence and outstanding performances</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Placeholder for goalkeeper action image */}
              <div className="relative bg-linear-to-br from-orange-500/20 to-red-500/20 rounded-3xl border border-orange-500/30 p-12 text-center">
                <div className="text-gray-400 space-y-4">
                  <Shield size={80} className="mx-auto text-orange-500/50" />
                  <p className="text-sm font-semibold">
                    📸 Image Needed: Kenyan goalkeeper making a spectacular save
                    <br />
                    <span className="text-xs">(Dynamic action shot, preferably in stadium)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/10 via-red-600/10 to-orange-600/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Discover Kenya's <br />
            <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Next Goalkeeping Star?
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join scouts, clubs, and fans in exploring the most comprehensive goalkeeper database in Kenya
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/goalkeepers"
              className="group relative px-10 py-5 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Explore All Goalkeepers</span>
              <ChevronRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}