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
  const [allClubs, setAllClubs] = useState([]);
  const [totalClubs, setTotalClubs] = useState(0);
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
  const [fetchedPages, setFetchedPages] = useState(new Set([1]));

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

  const fetchClubs = async (url = "clubs/", appendData = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getData(url);
      const data = response?.data;
      
      if (data && data.results) {
        if (appendData) {
          // Append new data to existing clubs
          setAllClubs(prev => [...prev, ...data.results]);
        } else {
          // Initial load or reset
          setAllClubs(data.results);
          setFetchedPages(new Set([1]));
        }
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        setTotalClubs(data?.count || 0);
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

  // Filter clubs from all fetched data
  const filteredClubs = allClubs.filter(club => {
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

  // Get unique values for filters from all fetched clubs
  const uniqueCities = [...new Set(allClubs.map(club => club.city))].sort();
  const uniqueYears = [...new Set(allClubs.map(club => club.founded_year))].sort((a, b) => b - a);

  // Client-side pagination based on total count
  const totalPages = Math.ceil(totalClubs / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClubs = sortedClubs.slice(startIndex, endIndex);

  const handlePageChange = async (newPage) => {
    // Calculate if we have the data needed for this page
    const neededDataIndex = newPage * itemsPerPage;
    const currentDataLength = allClubs.length;
    
    // Check if we need to fetch more data from API
    if (neededDataIndex > currentDataLength && nextPageUrl) {
      // Extract the page parameter from the next URL
      const urlParams = new URLSearchParams(nextPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = `clubs/?page=${pageParam}`;
      
      const newPageNum = parseInt(pageParam);
      if (!fetchedPages.has(newPageNum)) {
        await fetchClubs(endpoint, true); // Append new data
        setFetchedPages(prev => new Set([...prev, newPageNum]));
      }
    }
    
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCity, filterYear, sortBy]);

  if (loading && allClubs.length === 0) {
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
            onClick={() => fetchClubs()}
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
      <ClubsHeader totalClubs={totalClubs} />

      {/* Stats Overview */}
      <ClubsStats 
        clubs={allClubs} 
        totalClubs={totalClubs} 
      />

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
        totalCount={totalClubs}
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