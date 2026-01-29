import { Users, Trophy } from "lucide-react";

export default function AppearancesSection({ appearances = [] }) {
  // Sort appearances by created_at (most recent first)
  const sortedAppearances = [...appearances].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-orange-500" size={32} />
            <div>
              <h2 className="text-4xl font-black text-white">Appearances</h2>
              <p className="text-gray-400 text-sm mt-1">Competition history and recognitions</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sortedAppearances.map((appearance) => (
            <div
              key={appearance.id}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105"
            >
              {/* Appearance Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <Trophy className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{appearance.competition}</h3>
                    <p className="text-orange-400 text-sm font-semibold">{appearance.season}</p>
                  </div>
                </div>
              </div>
              
              {/* Appearance Description */}
              <p className="text-gray-400 mb-4 leading-relaxed">{appearance.description}</p>
              
              {/* Recognitions */}
              {appearance.recognitions && appearance.recognitions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-white mb-2">Recognitions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {appearance.recognitions.map((recognition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-linear-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold"
                      >
                        {recognition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appearances.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Appearances Yet</h3>
            <p className="text-gray-500">Competition appearances will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
}