import { useTranslation } from "react-i18next";
import { BookOpen, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const navigation = {
    pages: [
      { name: "Home", href: "#" },
      { name: "About", href: "#about" },
      // { name: "Features", href: "#features" },
      { name: "FAQ", href: "#faq" },
    ],
    utility: [
      { name: "Signup", href: "#" },
      { name: "Login", href: "#" },
      { name: "404 Not found", href: "#" },
      { name: "Password Reset", href: "#" },
    ],
    resources: [
      { name: "Support", href: "#" },
      { name: "Privacy policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Video guide", href: "#" },
    ],
  };

  return (
    <footer className="bg-primary-500/5 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-black text-xl font-bold">
                Afrika Journals
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              Spotlight and elevate African journals. We aim to foster a global
              appreciation for the intellectual richness and diversity that
              Africa has to offer.
            </p>
            <div className="flex items-center space-x-2 text-gray-700">
              <Mail size={20} />
              <span>info@AfrikaJournals.com</span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              {navigation.pages.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Utility pages</h3>
            <ul className="space-y-2">
              {navigation.utility.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-600">
          <p>© Copyright 2025, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
