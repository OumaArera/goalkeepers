import { Users, MapPin, Calendar, Home } from "lucide-react";

export default function ClubHistory({ clubs = [] }) {
  return (
    <section className="relative py-12 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-orange-500" size={32} />
          <div>
            <h2 className="text-4xl font-black text-white">Club History</h2>
            <p className="text-gray-400 text-sm mt-1">Career journey across clubs</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <div
              key={club.id}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105"
            >
              {/* Active Badge */}
              {club.is_active && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-full">
                  <span className="text-white text-xs font-black">CURRENT</span>
                </div>
              )}

              {/* Club Logo & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur opacity-75"></div>
                  {club.logo ? (
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="relative h-16 w-16 object-contain rounded-full bg-white p-2 border-2 border-white"
                    />
                  ) : (
                    <div className="relative h-16 w-16 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center border-2 border-white">
                      <Users className="text-white" size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{club.name}</h3>
                  <p className="text-orange-400 text-sm font-semibold">{club.short_name}</p>
                </div>
              </div>

              {/* Club Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500" size={16} />
                  <div>
                    <span className="text-gray-400 text-sm">Location:</span>
                    <span className="text-white font-semibold ml-2">{club.city}, {club.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Home className="text-orange-500" size={16} />
                  <div>
                    <span className="text-gray-400 text-sm">Stadium:</span>
                    <span className="text-white font-semibold ml-2">{club.stadium_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-orange-500" size={16} />
                  <div>
                    <span className="text-gray-400 text-sm">Founded:</span>
                    <span className="text-white font-semibold ml-2">{club.founded_year}</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}