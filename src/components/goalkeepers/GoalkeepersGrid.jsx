import { Shield, Award } from "lucide-react";

export default function GoalkeepersGrid({ goalkeepers }) {
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

  if (goalkeepers.length === 0) {
    return (
      <div className="text-center py-20">
        <Shield className="mx-auto text-gray-600 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-gray-400 mb-2">No goalkeepers found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goalkeepers.map((gk) => (
        <div
          key={gk.id}
          className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
        >
          {/* Card Header */}
          <div className="relative h-64 bg-slate-950 flex items-center justify-center overflow-hidden">

            <img
                src={gk.avatar}
                alt={gk.full_name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                    e.target.style.display = "none";
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
                <span>Height: {gk.height}ft</span>
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
              href={`/goalkeepers/${gk.id}`}
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
  );
}