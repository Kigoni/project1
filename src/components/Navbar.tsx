
import React, { useState, useEffect, useCallback } from "react";
import { Menu } from "@headlessui/react";
import { Search, Globe, X, MenuIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [language, setLanguage] = useState<string>("EN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [atTop, setAtTop] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: "en", label: "English" },
    { code: "zu", label: "Zulu" },
    { code: "pt", label: "Portuguese" },
    { code: "fr", label: "French" },
    { code: "sw", label: "Swahili" },
    { code: "ha", label: "Hausa" },
    { code: "es", label: "Spanish" },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos < prevScrollPos || currentScrollPos === 0);
    setAtTop(currentScrollPos === 0);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      id="navbarTop"
      className={`backdrop-blur-sm fixed top-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 lg:px-16 xl:px-56 py-4 flex justify-between items-center ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${atTop ? "" : "bg-primary-600"}`}
    >
      <Link to="/" className="flex items-center gap-x-4 font-semibold text-xl">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-28 w-32 object-contain opacity-75 hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="hidden md:flex items-center space-x-10">
        {["Journals", "Submit Articles", "Conferences", "News & Funding", "Testimonials", "FAQ"].map(
          (item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item.toLowerCase().replace(/\s+/g, "").trim())}
              className="text-yellow-200 font-semibold hover:text-green-400 transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-200 group-hover:w-full" />
            </button>
          )
        )}

        <Menu as="div" className="relative ml-6">
          <Menu.Button className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700">
            <Globe className="h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
            {languages.map((lang) => (
              <Menu.Item key={lang.code}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(lang.label)}
                    className={`${active ? "bg-gray-200" : "text-gray-700"} block px-4 py-2 text-sm`}
                  >
                    {lang.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>

      <div className="flex items-center space-x-6 md:hidden">
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700">
            <Globe className="h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
            {languages.map((lang) => (
              <Menu.Item key={lang.code}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(lang.label)}
                    className={`${active ? "bg-gray-200" : "text-gray-700"} block px-4 py-2 text-sm`}
                  >
                    {lang.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        <button
          onClick={() => document.getElementById("navbar")?.classList.toggle("hidden")}
          className="p-2 md:hidden"
        >
          <MenuIcon size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
