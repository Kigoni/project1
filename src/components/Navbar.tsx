import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { Search, Globe, X } from "lucide-react";

function Navbar() {
  const [language, setLanguage] = useState<string>("EN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Element[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  interface Language {
    code: string;
    label: string;
  }

  const languages: Language[] = [
    { code: "en", label: "English" },
    { code: "zu", label: "Zulu" },
    { code: "pt", label: "Portuguese" },
    { code: "fr", label: "French" },
    { code: "sw", label: "Swahili" },
    { code: "ha", label: "Hausa" },
    { code: "es", label: "Spanish" },
  ];

  const changeLanguage = (code: string, label: string): void => {
    setLanguage(label);
  };

  const handleSearchClick = (): void => {
    setShowSearch(true);
  };

  const handleCloseSearch = (): void => {
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const elements = Array.from(
      document.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, div")
    );
    const results = elements.filter((element) =>
      element.textContent?.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleResultClick = (element: Element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    setShowSearch(false);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos === 0) {
      setIsVisible(true);
    } else if (currentScrollPos > prevScrollPos) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav
        className={`backdrop-blur-sm fixed w-full top-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a
              href="#"
              className="absolute top-0 left-2 flex items-center space-x-2"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-29 w-36 object-contain"
              />
              <span className="flex flex-col text-2xl font-bold bg-[#047857] bg-clip-text text-transparent">
                <span>Afrika</span>
                <span>Journals</span>
              </span>
            </a>

            <div className="flex items-center space-x-10 absolute right-40">
              {[
                "Conferences & Workshops",
                "Blog & Funding",
                "Journals",
                "Articles",
                "Testimonials",
                "FAQ",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-yellow-600 hover:text-[#4ADE80] font-medium transition-colors duration-200 relative group"
                >
                  {item}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#34D399] transition-all duration-200 group-hover:w-full"
                  />
                </a>
              ))}

              <Menu as="div" className="relative">
                <Menu.Button className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Globe className="h-5 w-5" strokeWidth={2.5} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                  {languages.map((lang: Language) => (
                    <Menu.Item key={lang.code}>
                      {({ active }) => (
                        <button
                          onClick={() => changeLanguage(lang.code, lang.label)}
                          className={`${
                            active
                              ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-600"
                              : "text-gray-700"
                          } flex w-full px-4 py-2 text-sm font-medium transition-colors duration-150`}
                        >
                          {lang.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>

              <button
                onClick={handleSearchClick}
                className="p-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="fixed top-20 left-0 w-full bg-white shadow-lg p-4 z-50 rounded-lg max-w-md mx-auto border">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search the page..."
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleCloseSearch}
                className="ml-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-2 max-h-60 overflow-auto border rounded bg-gray-50">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 border-b hover:bg-gray-100 text-sm text-gray-800"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.textContent?.slice(0, 100)}...
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500 text-center">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      {/* <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button> */}
    </>
  );
}

export default Navbar;

