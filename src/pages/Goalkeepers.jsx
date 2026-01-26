import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getData } from "../api/api.service";
import Pagination from "../components/common/Pagination";
import GoalkeepersHeader from "../components/goalkeepers/GoalkeepersHeader";
import GoalkeepersFilters from "../components/goalkeepers/GoalkeepersFilters";
import GoalkeepersGrid from "../components/goalkeepers/GoalkeepersGrid";

export default function Goalkeepers() {
  const [goalkeepers, setGoalkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [filterClub, setFilterClub] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    fetchGoalkeepers();
  }, []);

  useEffect(() => {
    // Update items per page based on screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 3);
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const fetchGoalkeepers = async (url = "players/") => {
    setLoading(true);
    try {
      const response = await getData(url);
      const data = response?.data;
      
      setGoalkeepers(data?.results || []);
      setTotalCount(data?.count || 0);
      setNextPageUrl(data?.next);
      setPreviousPageUrl(data?.previous);
    } catch (error) {
      console.error("Error fetching goalkeepers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter goalkeepers
  const filteredGoalkeepers = goalkeepers.filter(gk => {
    const matchesSearch = gk.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = !filterClub || gk.clubs?.some(club => club.name === filterClub);
    const matchesCountry = !filterCountry || gk.country_of_birth === filterCountry;
    return matchesSearch && matchesClub && matchesCountry;
  });

  // Get unique values for filters
  const uniqueClubs = [...new Set(goalkeepers.flatMap(gk => gk.clubs?.map(club => club.name) || []))].filter(Boolean).sort();
  const uniqueCountries = [...new Set(goalkeepers.map(gk => gk.country_of_birth).filter(Boolean))].sort();

  // Client-side pagination
  const totalPages = Math.ceil(filteredGoalkeepers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGoalkeepers = filteredGoalkeepers.slice(startIndex, endIndex);

  const handlePageChange = async (newPage) => {
    // Check if we need to fetch more data from API
    if (newPage > totalPages && nextPageUrl) {
      // Extract the page parameter from the next URL
      const urlParams = new URLSearchParams(nextPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = `players/?page=${pageParam}`;
      
      await fetchGoalkeepers(endpoint);
      setCurrentPage(1); // Reset to first page of new data
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newPage < 1 && previousPageUrl) {
      // Extract the page parameter from the previous URL
      const urlParams = new URLSearchParams(previousPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = pageParam ? `players/?page=${pageParam}` : 'players/';
      
      await fetchGoalkeepers(endpoint);
      setCurrentPage(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterClub, filterCountry]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-orange-500 mx-auto mb-4" size={64} />
          <p className="text-gray-400 text-lg">Loading goalkeepers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <GoalkeepersHeader totalCount={totalCount} />

      {/* Filters */}
      <GoalkeepersFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterClub={filterClub}
        setFilterClub={setFilterClub}
        filterCountry={filterCountry}
        setFilterCountry={setFilterCountry}
        uniqueClubs={uniqueClubs}
        uniqueCountries={uniqueCountries}
        filteredCount={filteredGoalkeepers.length}
        totalCount={totalCount}
      />

      {/* Goalkeepers Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoalkeepersGrid goalkeepers={paginatedGoalkeepers} />
        </div>
      </section>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasNextApiPage={!!nextPageUrl}
        hasPreviousApiPage={!!previousPageUrl}
        loading={loading}
      />
    </div>
  );
}