import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear sessionStorage when component unmounts or page is unloaded
  useEffect(() => {
    // Cleanup when the page is being unloaded (tab closed)
    const handleUnload = () => {
      sessionStorage.clear(); // Clear session storage (if you're using sessionStorage)
      console.log("Session cleared on page unload");
    };

    window.addEventListener("beforeunload", handleUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post("http://localhost:5001/search", {
        query,
      });
      setResults(response.data.results || []);
      // Save the results to sessionStorage if needed
      sessionStorage.setItem(
        "searchResults",
        JSON.stringify(response.data.results || [])
      );
    } catch (error) {
      console.error("Search error:", error);
      setError("Something went wrong while searching. Please try again later.");
    }
    setLoading(false);
  };

  // Retrieve results from sessionStorage if available
  useEffect(() => {
    const savedResults = sessionStorage.getItem("searchResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
        Search Documents
      </h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full sm:w-2/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full sm:w-1/3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            "Search"
          )}
        </button>
      </div>
      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* No Results Message */}
      {results.length === 0 && !loading && query && (
        <p className="text-gray-500 text-center">
          No results found for "{query}".
        </p>
      )}
    </div>
  );
};

export default SearchComponent;
