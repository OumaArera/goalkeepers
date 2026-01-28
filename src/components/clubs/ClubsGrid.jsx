import { MapPin, Calendar, Home, Shield, ChevronRight, Users } from "lucide-react";

export default function ClubsGrid({ clubs }) {
  const calculateAge = (foundedYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - foundedYear;
  };

  if (clubs.length === 0) {
    return (
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Clubs Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              {/* Club Header with Logo */}
              <div className="relative h-48 bg-linear-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
                {club.logo ? (
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="relative z-10 max-h-32 max-w-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="hidden relative z-10 w-32 h-32 bg-linear-to-r from-orange-500 to-red-500 rounded-full items-center justify-center">
                  <Shield className="text-white" size={48} />
                </div>
              </div>

              {/* Club Info */}
              <div className="p-6 space-y-4">
                {/* Club Name */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{club.name}</h3>
                  <p className="text-orange-400 font-bold text-sm">{club.short_name}</p>
                </div>

                {/* Club Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <MapPin className="text-orange-500" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs">Location</div>
                      <div className="text-white font-semibold text-sm">
                        {club.city}, {club.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Calendar className="text-orange-500" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs">Founded</div>
                      <div className="text-white font-semibold text-sm">
                        {club.founded_year} ({calculateAge(club.founded_year)} years)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Home className="text-orange-500" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs">Home Stadium</div>
                      <div className="text-white font-semibold text-sm truncate">
                        {club.stadium_name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Users className="text-orange-500" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs">Category</div>
                      <div className="text-white font-semibold text-sm">
                        {club.category || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full py-3 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}