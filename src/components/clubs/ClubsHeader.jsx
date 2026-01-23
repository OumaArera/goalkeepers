import { Shield, Trophy } from "lucide-react";

export default function ClubsHeader({ totalClubs }) {
  return (
    <section className="relative overflow-hidden border-b border-orange-500/20">
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Trophy className="text-orange-500" size={20} />
            <span className="text-orange-400 text-sm font-bold">Kenyan Premier League Clubs</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="text-white">Explore</span>
            <br />
            <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Partner Clubs
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Discover the teams shaping Kenyan football. From legendary clubs with decades of history 
            to emerging powerhouses, explore the clubs nurturing goalkeeper talent across Kenya.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="px-6 py-3 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20">
              <div className="flex items-center gap-2">
                <Shield className="text-orange-500" size={20} />
                <span className="text-white font-bold">{totalClubs}</span>
                <span className="text-gray-400">Clubs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}