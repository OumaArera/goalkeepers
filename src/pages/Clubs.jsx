import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getData } from "../api/api.service";

// Import child components
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
  const [filterCategory, setFilterCategory] = useState("");


  useEffect(() => {
    setCurrentPage(1);
    fetchClubs({ page: 1, appendData: false });
  }, [searchTerm, filterCity, filterYear, filterCategory, sortBy]);


  useEffect(() => {
    // Update items per page based on screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 3);
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const buildQueryParams = ({ page = 1 } = {}) => {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("page_size", 60);

    if (searchTerm) params.append("search", searchTerm);
    if (filterCity) params.append("city", filterCity);
    if (filterYear) params.append("founded_year", filterYear);
    if (filterCategory) params.append("category", filterCategory);
    if (sortBy) params.append("ordering", sortBy);

    return `clubs/?${params.toString()}`;
  };


  const fetchClubs = async ({ page = 1, appendData = false } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = buildQueryParams({ page });
      const response = await getData(endpoint);
      const data = response?.data;

      if (!data?.results) {
        setError("No clubs data available");
        return;
      }

      if (appendData) {
        setAllClubs(prev => [...prev, ...data.results]);
      } else {
        setAllClubs(data.results);
        setFetchedPages(new Set([page]));
      }

      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setTotalClubs(data.count || 0);
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
    const neededDataIndex = newPage * itemsPerPage;

    if (neededDataIndex > allClubs.length && nextPageUrl) {
      const urlParams = new URLSearchParams(nextPageUrl.split("?")[1]);
      const pageParam = Number(urlParams.get("page"));

      if (!fetchedPages.has(pageParam)) {
        await fetchClubs({ page: pageParam, appendData: true });
        setFetchedPages(prev => new Set([...prev, pageParam]));
      }
    }

    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* Stats Overview */}
      <ClubsStats 
        clubs={allClubs} 
        totalClubs={totalClubs} 
      />

      {/* Filters */}
      <ClubsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
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