import { Search, Filter } from "lucide-react";

export default function GoalkeepersFilters({
  
  searchInput,
  setSearchInput,
  onSearch,
  filterClub,
  setFilterClub,
  filterCountry,
  setFilterCountry,
  filterSex,
  setFilterSex,
  filterBirthCountry,
  setFilterBirthCountry,
  uniqueClubs,
  countries,
  filteredCount,
  totalCount
}) {
  return (
    <section className="relative border-b border-orange-500/20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />

          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterSex}
              onChange={(e) => setFilterSex(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterBirthCountry}
              onChange={(e) => setFilterBirthCountry(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Country of Birth</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

          </div>


          {/* Club Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterClub}
              onChange={(e) => setFilterClub(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Clubs</option>
              {uniqueClubs.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-gray-400 text-sm">
          Showing <span className="text-orange-400 font-bold">{filteredCount}</span> of <span className="text-white font-bold">{totalCount}</span> goalkeepers
        </div>
      </div>
    </section>
  );
}