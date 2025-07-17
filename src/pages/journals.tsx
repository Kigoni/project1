"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Hero } from "../components/Journals/hero";
import AdvancedSearchBar from "../components/Journals/advanced-search-bar";
import SubmitJournalDialog from "../components/Journals/submit-journal-dialog";
import AIResearchAssistant from "../components/Journals/ai-research-assistant";
import Navbar from "@/components/Navbar2";
import Footer from "@/components/Footer";

export default function JournalsPage() {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: "",
    type: "keyword",
  });

  const [urlSearchParams] = useSearchParams();
  const countryFromURL = urlSearchParams.get("country");

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on load
  }, []);

  useEffect(() => {
    if (countryFromURL) {
      setSearchParams({ query: countryFromURL, type: "country" });
    }
  }, [countryFromURL]);

  const handleSearch = (query: string, type: string) => {
    setSearchParams({ query, type });
  };

  const handleCountrySearch = (country: string) => {
    setSearchParams({ query: country, type: "country" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-300/20 to-green-300/20">
      <Navbar />
      <div className="mt-24">
        <Hero totalJournals={1250} />
      </div>
      <div className="container mx-auto py-10 px-4">
        <div className="space-y-6">
          {/* <Worldmap onCountryClick={handleCountrySearch} /> */}
          <AdvancedSearchBar
  initialQuery={searchParams.query}
  searchType={searchParams.type}
  showFilters={showFilters}
  onAISearchClick={() => setShowAIAssistant(true)}
/>
        </div>

        <SubmitJournalDialog
          open={showSubmitDialog}
          onOpenChange={() => setShowSubmitDialog(!showSubmitDialog)}
        />

        <AIResearchAssistant
          open={showAIAssistant}
          onOpenChange={() => setShowAIAssistant(!showAIAssistant)}
        />

        {/* Floating AI Assistant Button */}
        <button
          onClick={() => setShowAIAssistant(true)}
          className="fixed bottom-6 right-6 bg-green-400 text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Research Assistant"
        >
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 [animation-duration:4s]"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>
        </button>
      </div>
      <Footer />
    </main>
  );
}
