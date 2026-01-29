import { Trophy, Award, Calendar, Clock } from "lucide-react";

export default function AwardsSection({ awards = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Sort awards by date (most recent first)
  const sortedAwards = [...awards].sort((a, b) => 
    new Date(b.award_date) - new Date(a.award_date)
  );


  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="text-orange-500" size={32} />
            <div>
              <h2 className="text-4xl font-black text-white">Awards & Achievements</h2>
              <p className="text-gray-400 text-sm mt-1">Recognition of excellence</p>
            </div>
          </div>
          
          
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sortedAwards.map((award, index) => (
            <div
              key={award.id}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105"
            >
              {/* Award Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{award.title}</h3>
                    <p className="text-orange-400 text-sm font-semibold">{award.competition}</p>
                  </div>
                </div>
              </div>
              
              {/* Award Description */}
              <p className="text-gray-400 mb-4 leading-relaxed">{award.description}</p>
              
              {/* Award Details */}
              <div className="flex items-center gap-4 text-sm pt-4 border-t border-orange-500/20">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span>{formatDate(award.award_date)}</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span>{award.season}</span>
                </div>
              </div>

              {/* Review Comment if available */}
              {award.review_comment && (
                <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-orange-500/10">
                  <p className="text-gray-400 text-xs italic">"{award.review_comment}"</p>
                </div>
              )}

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {awards.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Awards Yet</h3>
            <p className="text-gray-500">This goalkeeper's achievements will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
}