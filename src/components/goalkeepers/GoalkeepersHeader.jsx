import { Shield } from "lucide-react";

export default function GoalkeepersHeader({ totalCount }) {
  return (
    <section className="relative overflow-hidden border-b border-orange-500/20">
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Shield className="text-orange-500" size={14} />
            <span className="text-orange-400 text-xs sm:text-sm font-bold">Goalkeeper Directory</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Discover Kenya's
            <br />
            <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Elite Goalkeepers
            </span>
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Browse comprehensive profiles, statistics, and achievements of Kenya's finest shot-stoppers
          </p>

          {totalCount > 0 && (
            <div className="flex items-center justify-center gap-3 pt-2 sm:pt-4">
              <div className="px-4 py-2 sm:px-6 sm:py-3 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="text-orange-500" size={18} />
                  <span className="text-white font-bold text-sm sm:text-base">{totalCount}</span>
                  <span className="text-gray-400 text-sm sm:text-base">Goalkeepers</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}