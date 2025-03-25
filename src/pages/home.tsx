import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, MessageSquarePlus } from "lucide-react";
import Navbar from "../components/Navbar";
import ConferenceSection from "../components/Conference/ConferenceSection";
import ReportsSection from "../components/ReportsSection/ReportsSection";
import Worldmap from "../components/WorldMap";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import JournalSection from "../components/JournalSection/JournalSection";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import FeedbackForm from "../components/FeedbackForm";

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="scroll-smooth relative">
      <Navbar />

      {/* Feedback Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => setIsFeedbackOpen(true)}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-indigo-700 hover:to-purple-700 px-6 py-4 rounded-l-xl shadow-lg transition-colors"
        >
          <span
            className="flex items-center gap-2 rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            <MessageSquarePlus size={20} />
            Feedback
          </span>
        </motion.button>
      </div>

      {/* Feedback Form */}
      <FeedbackForm isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <main>
        <Hero />

        {/* Worldmap and Stats Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-4">
          <div className="w-full lg:w-2/3">
            <Worldmap />
          </div>
          <div className="w-full lg:w-1/3">
            <Stats />
          </div>
        </div>

        <About />
        <section id="journals">
          <JournalSection />
        </section>
        <section id="conferences">
          <ConferenceSection />
        </section>
        <ReportsSection />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Home;