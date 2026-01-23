import { Search, Filter, SortAsc } from "lucide-react";

export default function ClubsFilters({
  searchTerm,
  setSearchTerm,
  filterCity,
  setFilterCity,
  filterYear,
  setFilterYear,
  sortBy,
  setSortBy,
  uniqueCities,
  uniqueYears,
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
              placeholder="Search by club name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          {/* City Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Years</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <div className="text-gray-400 text-sm">
            Showing <span className="text-orange-400 font-bold">{filteredCount}</span> of <span className="text-white font-bold">{totalCount}</span> clubs
          </div>

          <div className="flex items-center gap-3">
            <SortAsc className="text-gray-400" size={20} />
            <span className="text-gray-400 text-sm">Sort by:</span>
            <div className="flex gap-2">
              {[
                { value: "name", label: "Name" },
                { value: "founded", label: "Founded" },
                { value: "city", label: "City" }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    sortBy === option.value
                      ? "bg-linear-to-r from-orange-500 to-red-500 text-white"
                      : "bg-slate-950 text-gray-400 hover:text-white border border-orange-500/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}