import React, { useEffect, useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdCalendarToday,
  MdSearch,
  MdFilterList,
} from "react-icons/md";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setAuthors(data);
        setFilteredAuthors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [token]);

  // Filter and sort authors
  useEffect(() => {
    let result = authors.filter(
      (author) =>
        author.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort results
    result = result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    setFilteredAuthors(result);
  }, [searchTerm, sortBy, authors]);

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  const getRandomColor = (name) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-blue-600",
      "bg-gradient-to-r from-green-500 to-green-600",
      "bg-gradient-to-r from-purple-500 to-purple-600",
      "bg-gradient-to-r from-pink-500 to-pink-600",
      "bg-gradient-to-r from-orange-500 to-orange-600",
      "bg-gradient-to-r from-teal-500 to-teal-600",
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <MdPerson className="text-red-500 text-4xl mx-auto mb-3" />
            <h2 className="text-red-800 text-xl font-semibold mb-2">
              Error Loading Authors
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authors</h1>
          <p className="text-gray-600">
            Manage and view all authors in the system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Authors
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {authors.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <MdPerson className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {authors.length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <MdEmail className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  New This Month
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {
                    authors.filter((author) => {
                      const monthAgo = new Date();
                      monthAgo.setMonth(monthAgo.getMonth() - 1);
                      return new Date(author.createdAt) > monthAgo;
                    }).length
                  }
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <MdCalendarToday className="text-purple-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search authors by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <MdFilterList className="text-gray-400 text-xl" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authors List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <MdPerson className="text-gray-300 text-6xl mx-auto mb-4" />
              <h3 className="text-gray-500 text-lg font-medium mb-2">
                No authors found
              </h3>
              <p className="text-gray-400">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No authors available"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAuthors.map((author) => (
                <div
                  key={author.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`${getRandomColor(
                          author.name
                        )} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {author.image ? (
                          <img
                            src={`${BASE_URL}/uploads/${author.image}`}
                            alt={author.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`${getRandomColor(
                              author.name
                            )} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                          >
                            {getInitials(author.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {author.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-600 mt-1">
                          <MdEmail className="text-gray-400" />
                          <span className="text-sm">{author.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <MdCalendarToday className="text-gray-400" />
                          <span>
                            Joined{" "}
                            {author.createdAt
                              ? new Date(author.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </span>
                        </div>
                        {author.role && (
                          <span
                            className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                              author.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {author.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredAuthors.length > 0 && (
          <div className="mt-4 text-center text-gray-500 text-sm">
            Showing {filteredAuthors.length} of {authors.length} authors
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;
