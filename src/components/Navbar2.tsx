import React, { useState, useEffect, useCallback } from "react";
import { Listbox, Menu } from "@headlessui/react";
import { Search, Globe, X, MenuIcon } from "lucide-react";

function Navbar2() {
  const [language, setLanguage] = useState<string>("EN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Element[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [atTop, setAtTop] = useState<boolean>(true);
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

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos === 0) {
      setIsVisible(true);
      setAtTop(false); // New state to track when at the top
    } else if (currentScrollPos > prevScrollPos) {
      setIsVisible(false);
      setAtTop(false);
    } else {
      setIsVisible(true);
      setAtTop(false);
    }

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav
        id="navbarTop"
        className={`backdrop-blur-sm bg-primary-600 fixed top-0 z-50 transition-all duration-300 w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-4 lg:px-16 xl:px-56 py-4 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } `} // Remove bg-primary-600 when at the top
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none font-semibold text-xl  focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Prominent Australia"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-32 w-36 object-contain"
            />
          <span
  className={`flex flex-col text-2xl font-bold text-primary-500 ${
    atTop ? "text-primary-500" : "text-yellow-200"
  } text-center leading-tight`}
>
  <span>Afrika</span>
  <span>Journals</span>
</span>





          </a>
          {/* Collapse Button */}
          <div className="md:hidden flex items-center space-x-4">
          <Menu as="div" className="relative mr-4">
  <Menu.Button className="p-2 rounded-full bg-green-500 text-white hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
    <Globe className="h-5 w-5" strokeWidth={2.5} />
  </Menu.Button>
  <Menu.Items className="mt-2 w-40 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
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
              type="button"
              className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-yellow-200 text-yellow-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-header-classic-collapse"
              aria-expanded="false"
              aria-controls="hs-header-classic"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-header-classic"
              onClick={() => {
                const navbar = document.getElementById("navbar");
                if (navbar) {
                  navbar.classList.toggle("hidden");
                }
              }}
            >
              <MenuIcon size={24} />
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
          {/* End Collapse Button */}
        </div>
        {/* End Logo w/ Collapse Button */}
        {/* Collapse */}
        <div
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-header-classic-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="space-x-8 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1 font-semibold">
              {[
                "Journals",
                "Articles",
                "Conferences",
                "Blog & Funding",
                "Testimonials",
                "FAQ",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "").trim()}`}
                  className="text-yellow-200 font-semibold hover:text-[#4ADE80]  transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#34D399] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
              {/* <Menu as="div" className="relative mr-4">
  <Menu.Button className="p-2 rounded-full bg-green-500 text-white hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
    <Globe className="h-5 w-5" strokeWidth={2.5} />
  </Menu.Button>
  <Menu.Items className="mt-2 w-40 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
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
</Menu> */}
<Menu as="div" className="relative inline-block text-left">
  <Menu.Button className="p-2 rounded-full bg-green-500 text-white hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
    <Globe className="h-5 w-5" strokeWidth={2.5} />
  </Menu.Button>
  <Menu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
    <div className="py-4">
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
    </div>
  </Menu.Items>
</Menu>

              <button
                onClick={handleSearchClick}
                className="p-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg relative z-10"
                >
                <Search className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="hidden w-full justify-between rounded-lg max-lg:bg-black max-lg:mt-1 max-lg:px-4 max-lg:py-4 max-lg:h-auto max-lg:overflow-auto  transition-all duration-500 delay-200"
          id="navbar"
        >
          <ul className="flex lg:items-center max-lg:gap-4 max-lg:mb-4  flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row ">
            {[
              "Journals",
              "Articles",
              "Conferences",
              "Blog & Funding",
              "Testimonials",
              "FAQ",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "").trim()}`}
                  className="text-yellow-600 text-lg font-normal hover:text-[#4ADE80] transition-all duration-500 mb-2 block lg:mr-6 lg:text-base"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#34D399] transition-all duration-200 group-hover:w-full" />{" "}
                </a>
              </li>
            ))}
          </ul>
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

export default Navbar2;
