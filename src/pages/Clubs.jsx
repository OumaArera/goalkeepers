import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getData } from "../api/api.service";

// Import child components
import ClubsHeader from "../components/clubs/ClubsHeader";
import ClubsFilters from "../components/clubs/ClubsFilters";
import ClubsGrid from "../components/clubs/ClubsGrid";
import ClubsStats from "../components/clubs/ClubsStats";
import Pagination from "../components/common/Pagination";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("name"); 
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    fetchClubs();
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

  const fetchClubs = async (url = "clubs/") => {
    setLoading(true);
    setError(null);
    try {
      const response = await getData(url);
      const data = response?.data;
      
      if (data && data.results) {
        setClubs(data.results);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      } else {
        setError("No clubs data available");
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setError("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  // Filter clubs
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.short_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filterCity || club.city === filterCity;
    const matchesYear = !filterYear || club.founded_year.toString() === filterYear;
    return matchesSearch && matchesCity && matchesYear;
  });

  // Sort clubs
  const sortedClubs = [...filteredClubs].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "founded":
        return a.founded_year - b.founded_year;
      case "city":
        return a.city.localeCompare(b.city);
      default:
        return 0;
    }
  });

  // Client-side pagination
  const totalPages = Math.ceil(sortedClubs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClubs = sortedClubs.slice(startIndex, endIndex);

  const handlePageChange = async (newPage) => {
    // Check if we need to fetch more data from API
    if (newPage > totalPages && nextPageUrl) {
      // Extract the page parameter from the next URL
      const urlParams = new URLSearchParams(nextPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = `clubs/?page=${pageParam}`;
      
      await fetchClubs(endpoint);
      setCurrentPage(1); // Reset to first page of new data
    } else if (newPage < 1 && previousPageUrl) {
      // Extract the page parameter from the previous URL
      const urlParams = new URLSearchParams(previousPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = pageParam ? `clubs/?page=${pageParam}` : 'clubs/';
      
      await fetchClubs(endpoint);
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCity, filterYear, sortBy]);

  // Get unique values for filters
  const uniqueCities = [...new Set(clubs.map(club => club.city))].sort();
  const uniqueYears = [...new Set(clubs.map(club => club.founded_year))].sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-orange-500 mx-auto mb-4" size={64} />
          <p className="text-gray-400 text-lg">Loading clubs...</p>
        </div>
      </div>
    );
  }



  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-white mb-2">{error}</h2>
          <p className="text-gray-400 mb-6">Unable to load clubs data</p>
          <button
            onClick={fetchClubs}
            className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <ClubsHeader totalClubs={clubs.length} />

      {/* Stats Overview */}
      <ClubsStats clubs={clubs} />

      {/* Filters */}
      <ClubsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCity={filterCity}
        setFilterCity={setFilterCity}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        sortBy={sortBy}
        setSortBy={setSortBy}
        uniqueCities={uniqueCities}
        uniqueYears={uniqueYears}
        filteredCount={sortedClubs.length}
        totalCount={clubs.length}
      />

      {/* Clubs Grid */}
      <ClubsGrid clubs={paginatedClubs} />
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