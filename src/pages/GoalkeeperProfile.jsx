// src/pages/GoalkeeperProfile.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { getData } from "../api/api.service";

// Import child components
import ProfileHeader from "../components/goalkeeper-profile/ProfileHeader";
import PerformanceStats from "../components/goalkeeper-profile/PerformanceStats";
import PerformanceGraphs from "../components/goalkeeper-profile/PerformanceGraphs";
import TrainingLoad from "../components/goalkeeper-profile/TrainingLoad";
import ClubHistory from "../components/goalkeeper-profile/ClubHistory";
import AwardsSection from "../components/goalkeeper-profile/AwardsSection";

export default function GoalkeeperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoalkeeperData();
  }, [id]);

  const fetchGoalkeeperData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getData(`players/${id}/`);
      const responseData = response?.data;
      if (responseData && responseData.player) {
        setData(responseData);
      } else {
        setError("Goalkeeper not found");
      }
    } catch (err) {
      console.error("Error fetching goalkeeper:", err);
      setError("Failed to load goalkeeper profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-orange-500 mx-auto mb-4" size={64} />
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-white mb-2">{error || "Goalkeeper not found"}</h2>
          <p className="text-gray-400 mb-6">The goalkeeper you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/goalkeepers')}
            className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Back to Goalkeepers
          </button>
        </div>
      </div>
    );
  }

  const { player, analytics, clubs, awards } = data;
  const goalkeeperStats = analytics?.goalkeeper || {};

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Back Button */}
      <div className="border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/goalkeepers')}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Goalkeepers</span>
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader 
        player={player} 
        clubs={clubs}
        awards={awards}
        stats={goalkeeperStats.averages}
        matchesPlayed={goalkeeperStats.matches_played}
        cleanSheetRate={goalkeeperStats.clean_sheet_rate}
      />

      {/* Performance Statistics - Current Averages */}
      <PerformanceStats stats={goalkeeperStats.averages} />

      {/* Performance Graphs - Recent 20 Games */}
      {goalkeeperStats.recent && goalkeeperStats.recent.length > 0 && (
        <PerformanceGraphs recentGames={goalkeeperStats.recent} />
      )}

      {/* Training Load */}
      {analytics?.training_load && (
        <TrainingLoad 
          recent={analytics.training_load.recent}
          totals={analytics.training_load.totals}
          averages={analytics.training_load.averages}
          sessions={analytics.training_load.sessions}
        />
      )}

      {/* Club History */}
      {clubs && clubs.length > 0 && (
        <ClubHistory clubs={clubs} />
      )}

      {/* Awards & Achievements */}
      {awards && awards.length > 0 && (
        <AwardsSection awards={awards} />
      )}
    </div>
  );
}