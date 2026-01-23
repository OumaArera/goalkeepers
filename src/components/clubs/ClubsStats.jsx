import { MapPin, Calendar, Home, Trophy } from "lucide-react";

export default function ClubsStats({ clubs }) {
  // Calculate stats
  const totalClubs = clubs.length;
  const uniqueCities = [...new Set(clubs.map(club => club.city))].length;
  const oldestClub = clubs.length > 0 ? Math.min(...clubs.map(club => club.founded_year)) : 0;
  const avgFoundedYear = clubs.length > 0 
    ? Math.round(clubs.reduce((sum, club) => sum + club.founded_year, 0) / clubs.length) 
    : 0;

  const stats = [
    { 
      icon: Trophy, 
      value: totalClubs, 
      label: "Total Clubs", 
      color: "from-orange-500 to-red-500" 
    },
    { 
      icon: MapPin, 
      value: uniqueCities, 
      label: "Cities Represented", 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: Calendar, 
      value: oldestClub, 
      label: "Oldest Club Founded", 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: Home, 
      value: avgFoundedYear, 
      label: "Average Founded Year", 
      color: "from-purple-500 to-pink-500" 
    }
  ];

  return (
    <section className="relative py-12 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105"
            >
              <div className={`inline-flex p-3 bg-linear-to-r ${stat.color} rounded-xl mb-4 shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-4xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-semibold text-sm">{stat.label}</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}