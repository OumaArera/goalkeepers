import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextApiPage = false,
  hasPreviousApiPage = false,
  loading = false
}) {
  const canGoPrevious = currentPage > 1 || hasPreviousApiPage;
  const canGoNext = currentPage < totalPages || hasNextApiPage;

  const handlePrevious = () => {
    if (canGoPrevious && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1 && !loading) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages && !loading) {
      onPageChange(totalPages);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show current page with context
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className="relative py-12 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="text-gray-400 text-sm">
            Page <span className="text-orange-400 font-bold">{currentPage}</span> of{" "}
            <span className="text-white font-bold">{totalPages || 1}</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={handleFirst}
              disabled={currentPage === 1 || loading}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === 1 || loading
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-orange-500/20 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10"
              }`}
              aria-label="First page"
            >
              <ChevronsLeft size={20} />
            </button>

            {/* Previous Page */}
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious || loading}
              className={`p-2 rounded-lg border transition-all ${
                !canGoPrevious || loading
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-orange-500/20 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-2">
              {pageNumbers.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => !loading && onPageChange(pageNum)}
                  disabled={loading}
                  className={`min-w-10 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                    pageNum === currentPage
                      ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "border border-orange-500/20 text-gray-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10"
                  } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {pageNum}
                </button>
              ))}
              
              {hasNextApiPage && currentPage === totalPages && (
                <span className="text-gray-500 px-2">...</span>
              )}
            </div>

            {/* Next Page */}
            <button
              onClick={handleNext}
              disabled={!canGoNext || loading}
              className={`p-2 rounded-lg border transition-all ${
                !canGoNext || loading
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-orange-500/20 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>

            {/* Last Page */}
            <button
              onClick={handleLast}
              disabled={currentPage === totalPages || loading}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === totalPages || loading
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-orange-500/20 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10"
              }`}
              aria-label="Last page"
            >
              <ChevronsRight size={20} />
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-orange-400 text-sm font-semibold animate-pulse">
              Loading...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}