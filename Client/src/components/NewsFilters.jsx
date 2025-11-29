import React from "react";

const NewsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedDate,
  setSelectedDate,
  sources = [],
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Source Filter */}
      <select
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All Sources</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default NewsFilters;
