import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getData } from "../api/api.service";
import Pagination from "../components/common/Pagination";
import GoalkeepersHeader from "../components/goalkeepers/GoalkeepersHeader";
import GoalkeepersFilters from "../components/goalkeepers/GoalkeepersFilters";
import GoalkeepersGrid from "../components/goalkeepers/GoalkeepersGrid";

export default function Goalkeepers() {
  const [goalkeepers, setGoalkeepers] = useState([]);
  const [allGoalkeepers, setAllGoalkeepers] = useState([]); // Store all fetched goalkeepers
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [filterClub, setFilterClub] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [fetchedPages, setFetchedPages] = useState(new Set([1])); // Track fetched API pages

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

  const fetchGoalkeepers = async (url = "players/", appendData = false) => {
    setLoading(true);
    try {
      const response = await getData(url);
      const data = response?.data;
      
      if (appendData) {
        // Append new data to existing goalkeepers
        setAllGoalkeepers(prev => [...prev, ...(data?.results || [])]);
        setGoalkeepers(prev => [...prev, ...(data?.results || [])]);
      } else {
        // Initial load or reset
        setAllGoalkeepers(data?.results || []);
        setGoalkeepers(data?.results || []);
        setFetchedPages(new Set([1]));
      }
      
      setTotalCount(data?.count || 0);
      setNextPageUrl(data?.next);
      setPreviousPageUrl(data?.previous);
    } catch (error) {
      console.error("Error fetching goalkeepers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter goalkeepers from all fetched data
  const filteredGoalkeepers = allGoalkeepers.filter(gk => {
    const matchesSearch = gk.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = !filterClub || gk.clubs?.some(club => club.name === filterClub);
    const matchesCountry = !filterCountry || gk.country_of_birth === filterCountry;
    return matchesSearch && matchesClub && matchesCountry;
  });

  // Get unique values for filters from all fetched goalkeepers
  const uniqueClubs = [...new Set(allGoalkeepers.flatMap(gk => gk.clubs?.map(club => club.name) || []))].filter(Boolean).sort();
  const uniqueCountries = [...new Set(allGoalkeepers.map(gk => gk.country_of_birth).filter(Boolean))].sort();

  // Client-side pagination based on total count
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGoalkeepers = filteredGoalkeepers.slice(startIndex, endIndex);

  const handlePageChange = async (newPage) => {
    // Calculate if we have the data needed for this page
    const neededDataIndex = newPage * itemsPerPage;
    const currentDataLength = allGoalkeepers.length;
    
    // Check if we need to fetch more data from API
    if (neededDataIndex > currentDataLength && nextPageUrl) {
      // Extract the page parameter from the next URL
      const urlParams = new URLSearchParams(nextPageUrl.split('?')[1]);
      const pageParam = urlParams.get('page');
      const endpoint = `players/?page=${pageParam}`;
      
      const newPageNum = parseInt(pageParam);
      if (!fetchedPages.has(newPageNum)) {
        await fetchGoalkeepers(endpoint, true);
        setFetchedPages(prev => new Set([...prev, newPageNum]));
      }
    }
    
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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