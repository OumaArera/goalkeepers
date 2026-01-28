import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getData } from "../api/api.service";
import Pagination from "../components/common/Pagination";
import GoalkeepersFilters from "../components/goalkeepers/GoalkeepersFilters";
import GoalkeepersGrid from "../components/goalkeepers/GoalkeepersGrid";
import { COUNTRIES } from "../constants/countries";


export default function Goalkeepers() {
  const [allGoalkeepers, setAllGoalkeepers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [filterClub, setFilterClub] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [fetchedPages, setFetchedPages] = useState(new Set([1]));
  const [filterSex, setFilterSex] = useState("");
  const [filterBirthCountry, setFilterBirthCountry] = useState("");
  const [searchInput, setSearchInput] = useState("");



  useEffect(() => {
    setCurrentPage(1);

    const query = buildQueryParams();
    const endpoint = query
      ? `players/?${query}`
      : "players/";

    fetchGoalkeepers(endpoint, false);
  }, [
    searchTerm,
    filterSex,
    filterBirthCountry,
    filterCountry
  ]);



  useEffect(() => {
    // Update items per page based on screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 3);
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (filterSex) params.append("sex", filterSex);
    if (filterBirthCountry) params.append("country_of_birth", filterBirthCountry);
    if (filterCountry) params.append("country_of_residence", filterCountry);

    return params.toString();
  };


  const fetchGoalkeepers = async (
    url = "players/",
    appendData = false
  ) => {
    setLoading(true);
    try {
      const response = await getData(url);
      const data = response?.data;

      if (appendData) {
        setAllGoalkeepers(prev => [...prev, ...(data?.results || [])]);
      } else {
        setAllGoalkeepers(data?.results || []);
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
    const matchesCountry = !filterCountry || gk.country_of_residence === filterCountry;
    return matchesSearch && matchesClub && matchesCountry;
  });

  // Get unique values for filters from all fetched goalkeepers
  const uniqueClubs = [...new Set(allGoalkeepers.flatMap(gk => gk.clubs?.map(club => club.name) || []))].filter(Boolean).sort();
  // const uniqueCountries = [...new Set(allGoalkeepers.map(gk => gk.country_of_residence).filter(Boolean))].sort();

  // Client-side pagination based on total count
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGoalkeepers = filteredGoalkeepers.slice(startIndex, endIndex);

  const handlePageChange = async (newPage) => {
    const neededDataIndex = newPage * itemsPerPage;
    const currentDataLength = allGoalkeepers.length;

    if (neededDataIndex > currentDataLength && nextPageUrl) {
      const query = buildQueryParams();

      const urlParams = new URLSearchParams(nextPageUrl.split("?")[1]);
      const pageParam = urlParams.get("page");

      const endpoint = query
        ? `players/?page=${pageParam}&${query}`
        : `players/?page=${pageParam}`;

      const newPageNum = parseInt(pageParam, 10);

      if (!fetchedPages.has(newPageNum)) {
        await fetchGoalkeepers(endpoint, true);
        setFetchedPages(prev => new Set([...prev, newPageNum]));
      }
    }

    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* Filters */}
      <GoalkeepersFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={() => setSearchTerm(searchInput)}
        filterClub={filterClub}
        setFilterClub={setFilterClub}
        filterCountry={filterCountry}
        setFilterCountry={setFilterCountry}
        filterSex={filterSex}
        setFilterSex={setFilterSex}
        filterBirthCountry={filterBirthCountry}
        setFilterBirthCountry={setFilterBirthCountry}
        uniqueClubs={uniqueClubs}
        countries={COUNTRIES}
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