import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import NewsFilters from "../NewsFilters";

const News = () => {
  const [visibleCount, setVisibleCount] = useState(9);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedSource, setSelectedSource] = useState("All");
   const [selectedDate, setSelectedDate] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=d5a0199405b14a238fa1a8e3e4030c67"
      );
      return res.json();
    },
  });

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const resetArticles = () => {
    setVisibleCount(9);
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading News
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );

if (!data?.articles || data.articles.length === 0)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">No articles found</p>
    </div>
  );

// Prepare source list for filter
const sources = Array.from(new Set(data.articles.map((a) => a.source?.name)));

// Filter articles
const filteredArticles = data.articles
  .filter((article) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        article.title?.toLowerCase().includes(q) ||
        article.description?.toLowerCase().includes(q) ||
        article.content?.toLowerCase().includes(q)
      );
    }
    return true;
  })
  .filter((article) => {
    if (selectedSource !== "All")
      return article.source?.name === selectedSource;
    return true;
  })
  .filter((article) => {
    if (selectedDate) {
      const articleDate = new Date(article.publishedAt)
        .toISOString()
        .split("T")[0];
      return articleDate === selectedDate;
    }
    return true;
  });

const displayedArticles = filteredArticles.slice(0, visibleCount);
const hasMoreArticles = visibleCount < filteredArticles.length;
const totalResults = filteredArticles.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest News from WSJ
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest articles from Wall Street Journal
          </p>
        </div>
        {/* Filters */}
        <NewsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          sources={sources}
        />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              {/* Article Image */}
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
                    {article.source?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500 truncate max-w-[120px]">
                    By {article.author || "Unknown Author"}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                  >
                    Read More
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Count and Load More Button */}
        <div className="mt-12 text-center space-y-6">
          <div className="text-gray-600">
            <p className="text-lg">
              Showing{" "}
              <span className="font-semibold text-blue-600">
                {displayedArticles.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {totalResults}
              </span>{" "}
              articles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {hasMoreArticles ? (
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Load More Articles
                <span className="ml-2 bg-white text-blue-600 rounded-full w-6 h-6 inline-flex items-center justify-center text-sm">
                  +6
                </span>
              </button>
            ) : (
              <p className="text-green-600 font-semibold text-lg">
                🎉 All articles loaded!
              </p>
            )}

            {visibleCount > 9 && (
              <button
                onClick={resetArticles}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
