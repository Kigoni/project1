import { useTranslation } from "react-i18next";
import { BookOpen, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const navigation = {
    pages: [
      { name: "Home", href: "#" },
      { name: "About", href: "#about" },
      { name: "FAQ", href: "#faq" },
    ],
    utility: [
      { name: "Signup", href: "#" },
      { name: "Login", href: "#" },
      { name: "Password Reset", href: "#" },
    ],
    resources: [
      { name: "Support", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Video Guide", href: "#" },
    ],
  };

  return (
    <footer className="bg-primary-500/5 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-black text-xl font-bold">Afrika Journals</span>
            </div>
            <p className="text-gray-700 mb-4">
              Spotlighting African research and fostering global appreciation for the continent’s intellectual diversity.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-700">
              <Mail size={20} />
              <span>info@AfrikaJournals.com</span>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Welcome to Afrika Journals Platform!</h3>
            <p className="text-gray-700">
              Dedicated to amplifying African research, this platform uses AI to aid with journals and articles research.
              While evolving, we invite contributions to refine data accuracy and enrich visibility.
              Together, we’re shaping a trusted hub for African scholarship.
            </p>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-700 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-600">
          <p>© Copyright 2025, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;