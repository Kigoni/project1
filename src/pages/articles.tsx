import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  RefreshCw,
  Bookmark,
  Star,
  Link,
  BookOpen,
  Headphones,
  Languages,
  Clock,
  Map,
  MessageSquare,
  Share2,
  Bot,
  BarChart2,
  Download,
  Globe,
  Lightbulb,
  PlusCircle,
  X,
  ChevronDown,
  FileText,
  User,
  Award,
  Hash,
} from "lucide-react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

// Types
interface Article {
  id: number;
  title: string;
  abstract: string;
  authors: string;
  keywords: string | null;
  doi: string;
  citations: number;
  peer_reviewed: boolean;
  publication_date: string;
  language: string;
  country: string;
  thematic_area: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}
interface Country {
  name: string;
}

interface ThematicArea {
  name: string;
}

interface Language {
  name: string;
}

function ArticlesPage() {
  // States
  const [data, setData] = useState<ApiResponse | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"abstract" | "keywords">(
    "keywords"
  );
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedThematicAreas, setSelectedThematicAreas] = useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newArticle, setNewArticle] = useState({
    title: "",
    abstract: "",
    authors: "",
    keywords: "",
    file: null as File | null,
  });
  const [filters, setFilters] = useState({
    Present_on_ISSN: false,
    african_index_medicus: false,
    directory_of_african_journals: false,
    hosted_on_INASPS: false,
    indexed_on_google_scholar: false,
    member_of_Committee_on_publication_Ethics: false,
    online_publisher_in_africa: false,
    open_access_journal: false,
  });

  const [submittedArticles, setSubmittedArticles] = useState<Article[]>([]);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null
  );

  const [articlesPerPage] = useState(15);

  // Mock data for filters
  const africanCountries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Côte d'Ivoire",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ];

  const thematicAreas = [
    "Agriculture",
    "Anthropology",
    "Archaeology",
    "Architecture",
    "Art",
    "Biology",
    "Business",
    "Chemistry",
    "Communication",
    "Computer Science",
    "Economics",
    "Education",
    "Engineering",
    "Environmental Science",
    "Geography",
    "Geology",
    "Health Sciences",
    "History",
    "Law",
    "Linguistics",
    "Literature",
    "Mathematics",
    "Medicine",
    "Music",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Religion",
    "Sociology",
  ];

  const languages = [
    "English",
    "French",
    "Portuguese",
    "Swahili",
    "Arabic",
    "Amharic",
    "Zulu",
    "Yoruba",
    "Hausa",
    "Igbo",
    "Afrikaans",
  ];

 

  const fetchArticles = useCallback(async () => {
    try {
      setShowFilterModal(false);
      setLoading(true);

      // Combine search query with filters
      let combinedQuery = searchQuery;

      const allFilters = [
        ...selectedLanguages,
        ...selectedCountries,
        ...selectedThematicAreas,
      ];

      if (allFilters.length > 0) {
        const filtersString = allFilters.join(" ");
        combinedQuery = combinedQuery
          ? `${combinedQuery} ${filtersString}`
          : filtersString;
      }

      const encodedQuery = combinedQuery.trim();

      const queryParams = new URLSearchParams();
      if (combinedQuery) queryParams.append("query", encodedQuery);
      // queryParams.append("searchBy", searchMode);
      queryParams.append("page", page.toString());
      queryParams.append("page_size", pageSize.toString());

      // Append checkbox filters as query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, "true");
      });

      const response = await axios.get<ApiResponse>(
        `https://backend.afrikajournals.org/journal_api/articles/search?${queryParams.toString()}`
      );

      const data = response.data;

      const mappedArticles = data.results.map((article: Article) => ({
        ...article,
        keywords: article.keywords || "",
        peer_reviewed: true,
        language: selectedLanguages[0] || "English",
        country: selectedCountries[0] || "Kenya",
        thematic_area: article.thematic_area || "",
      }));

      setArticles(mappedArticles);
      setFilteredArticles(mappedArticles);
      setData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch articles. Please try again later.");
      setLoading(false);
      console.error("Error fetching articles:", err);
    }
  }, [
    filters,
    searchQuery,
    // searchMode,
    page,
    pageSize,
    selectedCountries,
    selectedThematicAreas,
    selectedLanguages,
  ]);



  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchArticles();
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(delayDebounce);
  }, [
    searchQuery,
    selectedCountries,
    selectedThematicAreas,
    selectedLanguages,
    filters,
    page,
    pageSize,
    searchMode,
    fetchArticles,
  ]);
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newArticle.title && newArticle.abstract) {
      const submittedArticle = {
        ...newArticle,
        id: submittedArticles.length + 1,
        date: new Date().toISOString().split("T")[0],
        doi: "", // add default value or get from API
        citations: 0, // add default value or get from API
        peer_reviewed: true, // add default value or get from API
        publication_date: "", // add default value or get from API
        language: "", // add default value or get from API
        country: "", // add default value or get from API
        thematic_area: "", // add default value or get from API
      };
      setSubmittedArticles([...submittedArticles, submittedArticle]);
      setNewArticle({
        title: "",
        abstract: "",
        authors: "",
        keywords: "",
        file: null,
      });
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewArticle({
        ...newArticle,
        file: e.target.files[0],
      });
    }
  };

  // Toggle article expansion
  const toggleArticleExpansion = (id: number) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCountries([]);
    setSelectedThematicAreas([]);
    setSelectedLanguages([]);
    setFilters({
      Present_on_ISSN: false,
      african_index_medicus: false,
      directory_of_african_journals: false,
      hosted_on_INASPS: false,
      indexed_on_google_scholar: false,
      member_of_Committee_on_publication_Ethics: false,
      online_publisher_in_africa: false,
      open_access_journal: false,
    });
    setPage(1);
    fetchArticles(); // Re-fetch with cleared filters
  };

  // Pagination logic
  // const indexOfLastArticle = page * articlesPerPage;
  // const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles;

  const totalPages = data?.count ? Math.ceil(data.count / pageSize) : 1;

  return (
    <div className="min-h-screen">
      <Navbar2 />
      <div className="container mx-auto mt-[140px] px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            African Articles Repository
          </h1>
          <p className="text-lg text-gray-600">
            Discover, explore, and contribute to academic research across Africa
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  searchMode === "abstract"
                    ? "bg-yellow-200 text-black"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSearchMode("abstract")}
              >
                Search by Abstract
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  searchMode === "keywords"
                    ? "bg-yellow-200 text-black"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSearchMode("keywords")}
              >
                Search by Keywords, Title, etc.
              </button>
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search by ${
                searchMode === "abstract"
                  ? "abstract"
                  : "keywords, title, discipline..."
              }`}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex space-x-2 ml-4">
              <button
                className="p-3 bg-yellow-200 text-black rounded-lg hover:bg-yellow-400 transition-colors flex items-center"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
              <button
                className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                onClick={() => {
                  // setSearchQuery("");
                  // setSelectedCountries([]);
                  // setSelectedThematicAreas([]);
                  // setSelectedLanguages([]);
                  handleClearFilters();
                }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCountries.length > 0 ||
            selectedThematicAreas.length > 0 ||
            selectedLanguages.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCountries.map((country) => (
                <span
                  key={country}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {country}
                  <button
                    className="ml-2"
                    onClick={() =>
                      setSelectedCountries(
                        selectedCountries.filter((c) => c !== country)
                      )
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedThematicAreas.map((area) => (
                <span
                  key={area}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {area}
                  <button
                    className="ml-2"
                    onClick={() =>
                      setSelectedThematicAreas(
                        selectedThematicAreas.filter((a) => a !== area)
                      )
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedLanguages.map((language) => (
                <span
                  key={language}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {language}
                  <button
                    className="ml-2"
                    onClick={() =>
                      setSelectedLanguages(
                        selectedLanguages.filter((l) => l !== language)
                      )
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Advanced Filters
                </h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setShowFilterModal(false)}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Countries Filter */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />
                    Countries
                  </h3>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {africanCountries
                      .filter((country) =>
                        country
                          .toLowerCase()
                          .includes(countrySearch.toLowerCase())
                      )
                      .map((country) => (
                        <div key={country} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`country-${country}`}
                            checked={selectedCountries.includes(country)}
                            onChange={() => {
                              if (selectedCountries.includes(country)) {
                                setSelectedCountries(
                                  selectedCountries.filter((c) => c !== country)
                                );
                              } else {
                                setSelectedCountries([
                                  ...selectedCountries,
                                  country,
                                ]);
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`country-${country}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {country}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Thematic Areas Filter */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Thematic Areas
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    {thematicAreas.map((area) => (
                      <div key={area} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`area-${area}`}
                          checked={selectedThematicAreas.includes(area)}
                          onChange={() => {
                            if (selectedThematicAreas.includes(area)) {
                              setSelectedThematicAreas(
                                selectedThematicAreas.filter((a) => a !== area)
                              );
                            } else {
                              setSelectedThematicAreas([
                                ...selectedThematicAreas,
                                area,
                              ]);
                            }
                          }}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`area-${area}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages Filter */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Languages className="h-5 w-5 mr-2 text-purple-600" />
                    Languages
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`language-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onChange={() => {
                            if (selectedLanguages.includes(language)) {
                              setSelectedLanguages(
                                selectedLanguages.filter((l) => l !== language)
                              );
                            } else {
                              setSelectedLanguages([
                                ...selectedLanguages,
                                language,
                              ]);
                            }
                          }}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`language-${language}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setSelectedCountries([]);
                    setSelectedThematicAreas([]);
                    setSelectedLanguages([]);
                    setCountrySearch("");
                  }}
                >
                  Clear All
                </button>
                <button
                  className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-400 transition-colors"
                  onClick={() => fetchArticles()}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {loading
                ? "Loading Articles..."
                : `Articles (${filteredArticles.length})`}
            </h2>
            <button
              className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-400 transition-colors flex items-center"
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              {showSubmissionForm ? "Hide Submission Form" : "Submit Article"}
            </button>
          </div>

          {/* Article Submission Form */}
          {showSubmissionForm && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Submit New Article
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Article Title*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={newArticle.title}
                      onChange={(e) =>
                        setNewArticle({ ...newArticle, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Authors (comma separated)*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={newArticle.authors}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          authors: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Abstract*
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg h-32"
                    value={newArticle.abstract}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, abstract: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords (comma separated)*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={newArticle.keywords}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          keywords: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Article (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-green-700 "
                  >
                    Submit Article
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submitted Articles */}
          {submittedArticles.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Your Submitted Articles
              </h3>
              <div className="space-y-4">
                {submittedArticles.map((article, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Authors: {article.authors}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Keywords: {article.keywords}
                    </p>
                    <p className="text-sm text-gray-600">
                      Submitted on: {article.publication_date}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span className="text-yellow-600">Under Review</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Articles List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-lg text-gray-600">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleArticleExpansion(article.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {article.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.keywords?.split(",").map((keyword, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              {keyword.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <User className="h-4 w-4 mr-1" />
                          <span>{article.authors}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center text-gray-600">
                            <Link className="h-4 w-4 mr-1" />
                            <span className="text-sm">{article.citations}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Citations
                          </span>
                        </div>
                        {article.peer_reviewed && (
                          <div className="flex flex-col items-center">
                            <Award className="h-5 w-5 text-green-600" />
                            <span className="text-xs text-gray-500">
                              Peer Reviewed
                            </span>
                          </div>
                        )}
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            expandedArticleId === article.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
                      <div className="flex items-center mr-4">
                        <Hash className="h-4 w-4 mr-1" />
                        <span>DOI: {article.doi}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Globe className="h-4 w-4 mr-1" />
                        <span>{article.country}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Languages className="h-4 w-4 mr-1" />
                        <span>{article.language}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{article.thematic_area}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Article View */}
                  {expandedArticleId === article.id && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          Abstract
                        </h4>
                        <p className="text-gray-700">{article.abstract}</p>
                      </div>

                      {/* Interactive Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <button className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-yellow-200 transition-colors">
                          <Bookmark className="h-5 w-5 mr-2 text-blue-600" />
                          <span>Save to Library</span>
                        </button>
                        <button className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-yellow-200 transition-colors">
                          <Star className="h-5 w-5 mr-2 text-yellow-500" />
                          <span>Highlight & Annotate</span>
                        </button>
                        <button className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-yellow-200 transition-colors">
                          <Link className="h-5 w-5 mr-2 text-green-600" />
                          <span>Cite This Article</span>
                        </button>
                        <button className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-yellow-200 transition-colors">
                          <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                          <span>Reading Mode</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Accessibility & Features
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Headphones className="h-5 w-5 mr-2 text-blue-600" />
                              <span>Text-to-Speech</span>
                            </div>
                            <div className="flex items-center">
                              <Languages className="h-5 w-5 mr-2 text-green-600" />
                              <span>Auto-Translate</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                              <span>Reading Time: ~15 minutes</span>
                            </div>
                            <div className="flex items-center">
                              <Map className="h-5 w-5 mr-2 text-purple-600" />
                              <span>Table of Contents</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Community & Data
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                              <span>Comments & Discussion</span>
                            </div>
                            <div className="flex items-center">
                              <Share2 className="h-5 w-5 mr-2 text-green-600" />
                              <span>Share & Recommend</span>
                            </div>
                            <div className="flex items-center">
                              <Bot className="h-5 w-5 mr-2 text-yellow-600" />
                              <span>AI-Powered Summary</span>
                            </div>
                            <div className="flex items-center">
                              <BarChart2 className="h-5 w-5 mr-2 text-purple-600" />
                              <span>Interactive Data & Figures</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between">
                        <div className="flex space-x-2">
                          <button className="flex items-center px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-blue-700 transition-colors">
                            <Download className="h-5 w-5 mr-2" />
                            Download PDF
                          </button>
                          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <Share2 className="h-5 w-5 mr-2" />
                            Share
                          </button>
                        </div>
                        <div>
                          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Lightbulb className="h-5 w-5 mr-2" />
                            Related Research
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page <strong>{page}</strong> of {totalPages}
            </span>

            <button
              disabled={!data?.next}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg ${
                !data?.next
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Next
            </button>
          </div>

          {/* Page Size Selector */}
          <div className="mt-4 text-center">
            <label htmlFor="pageSize" className="text-gray-700 mr-2">
              Results per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ArticlesPage;
