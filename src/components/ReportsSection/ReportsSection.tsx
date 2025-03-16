import { useState, useEffect, useCallback } from "react";
import {
  Library,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface FeaturedItem {
  type: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  image?: string;
  citations?: number;
  views?: number;
  rating?: number;
  publishedDate?: string;
  impactFactor?: number;
}

const categories = [
  { id: "all", label: "All Resources", icon: Library },
  { id: "writing", label: "Scientific Writing", icon: BookOpen },
  { id: "review", label: "Peer Review", icon: GraduationCap },
  { id: "guides", label: "Research Guides", icon: Library },
  { id: "tools", label: "Publication Tools", icon: BookOpen },
  { id: "funding", label: "Funding", icon: GraduationCap },
];

const featuredItems: FeaturedItem[] = [
  {
    type: "writing",
    icon: "✍️",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    title: "Middlebury Scientific Writing Resources",
    description:
      "Comprehensive guide for academic writing excellence with templates and examples.",
    link: "https://sites.middlebury.edu/middsciwriting/teaching-resources/",
    tags: ["writing", "academic"],
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 156,
    views: 2300,
    rating: 4.8,
    publishedDate: "2024-01-15",
    impactFactor: 8.2,
  },
  {
    title: "Seed Grant for New African Principal Investigators (SG-NAPI)",
    description:
      "Funding opportunity to support early-career African researchers in scientific fields.",
    type: "research",
    tags: ["Funding", "Science", "Africa"],
    image:
      "https://images.unsplash.com/photo-1573496529575-870a6e5cf0c6?auto=format&fit=crop&q=80&w=800",
    link: "https://twas.org/opportunity/seed-grant-new-african-principal-investigators-sg-napi",
    color: "bg-green-100",
    icon: "🌱",
    citations: 85,
    views: 1750,
    rating: 4.6,
    publishedDate: "2024-02-10",
    impactFactor: 7.9,
  },
  {
    title: "Mama Cash's Resilience Fund",
    description:
      "Funding for initiatives that strengthen resilience and sustainability.",
    type: "grant",
    tags: ["Funding", "Resilience"],
    image: "https://example.com/mama-cash-resilience.jpg",
    link: "https://lnkd.in/d7wCyfb4",
    color: "bg-green-100",
    icon: "🌱",

    citations: 50,
    views: 1200,
    rating: 4.2,
    publishedDate: "2023-09-01",
    impactFactor: 6.5,
  },
  {
    title: "FCDO Forest Governance, Markets and Climate Programming Grant",
    description:
      "Funding to support sustainable forest governance and climate initiatives.",
    type: "grant",
    tags: ["Funding", "Forest", "Climate"],
    image: "https://example.com/fcdo-forest-grant.jpg",
    link: "https://lnkd.in/dHfVe7JC",
    color: "bg-blue-100",
    icon: "🌳",
    // fundingSize: "£500,000 to £1,000,000",
    // deadline: "2025-04-16",
    citations: 75,
    views: 1500,
    rating: 4.5,
    publishedDate: "2023-09-15",
    impactFactor: 7.0,
  },
  {
    title: "The Connecting the Unconnected Funding",
    description:
      "Supporting initiatives to provide internet access to unconnected communities.",
    type: "grant",
    tags: ["Funding", "Connectivity"],
    image: "https://example.com/connecting-unconnected.jpg",
    link: "https://lnkd.in/dhNtSUqu",
    color: "bg-yellow-100",
    icon: "🌐",
    // fundingSize: "$5,000 - $40,000",
    // deadline: "2025-03-31",
    citations: 60,
    views: 1300,
    rating: 4.3,
    publishedDate: "2023-09-10",
    impactFactor: 6.8,
  },
  {
    title: "Race Equity Grants",
    description:
      "Funding for projects that promote racial equity and inclusion.",
    type: "grant",
    tags: ["Funding", "Equity"],
    image: "https://example.com/race-equity-grant.jpg",
    link: "https://lnkd.in/dsFsrqRJ",
    color: "bg-red-100",
    icon: "⚖️",
    // fundingSize: "$50,000",
    // deadline: "2025-04-15",
    citations: 80,
    views: 1400,
    rating: 4.6,
    publishedDate: "2023-09-20",
    impactFactor: 7.2,
  },
  {
    title: "Gates Foundation Grant for Reducing Preeclampsia Burden",
    description:
      "Supporting research to reduce the global burden of preeclampsia.",
    type: "grant",
    tags: ["Funding", "Healthcare"],
    image: "https://example.com/gates-preeclampsia.jpg",
    link: "https://lnkd.in/dYZkCWQ9",
    color: "bg-purple-100",
    icon: "🏥",
    // fundingSize: "$500,000",
    // deadline: "2025-03-25",
    citations: 90,
    views: 1600,
    rating: 4.7,
    publishedDate: "2023-09-25",
    impactFactor: 7.5,
  },
  {
    title: "UKRI Responsive Mode Partnership",
    description:
      "Funding opportunity for research partnerships in various disciplines.",
    type: "research",
    tags: ["Funding", "Grants", "Research"],
    image:
      "https://images.unsplash.com/photo-1564865878902-97dfcbe39652?auto=format&fit=crop&q=80&w=800",
    link: "https://www.ukri.org/opportunity/responsive-mode-partnership/",
    color: "bg-blue-100",
    icon: "🔬",
    citations: 120,
    views: 2100,
    rating: 4.5,
    publishedDate: "2023-09-15",
    impactFactor: 7.2,
  },
  {
    title: "Grand Challenges Canada - Funding Opportunities",
    description: "Innovative health solutions for global development.",
    type: "research",
    tags: ["Funding", "Healthcare", "Innovation"],
    image:
      "https://images.unsplash.com/photo-1600255822015-1f3df0e9f84f?auto=format&fit=crop&q=80&w=800",
    link: "https://www.grandchallenges.ca/funding-opportunities/",
    color: "bg-yellow-100",
    icon: "🌍",
    citations: 95,
    views: 1800,
    rating: 4.3,
    publishedDate: "2023-11-05",
    impactFactor: 6.5,
  },
  {
    title: "Wellcome Climate Impacts Grant",
    description: "Research funding for climate-related health challenges.",
    type: "research",
    tags: ["Funding", "Climate", "Health"],
    image:
      "https://images.unsplash.com/photo-1506811873867-9c3ddf7b6945?auto=format&fit=crop&q=80&w=800",
    link: "https://wellcome.org/grant-funding/schemes/climate-impacts",
    color: "bg-green-200",
    icon: "🌱",
    citations: 110,
    views: 1950,
    rating: 4.6,
    publishedDate: "2023-08-22",
    impactFactor: 7.8,
  },
  {
    title: "Horizon Europe EDCTP3 Fellowship",
    description:
      "European research funding for global health and infectious diseases.",
    type: "research",
    tags: ["Funding", "Healthcare", "EDCTP3"],
    image:
      "https://images.unsplash.com/photo-1603209051785-cdabee45d8d3?auto=format&fit=crop&q=80&w=800",
    link: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-JU-GH-EDCTP3-2025-02-FELLOW-01-two-stage?keywords=edctp3&isExactMatch=true&status=31094501,31094502&order=DESC&pageNumber=1&pageSize=50&sortBy=startDate",
    color: "bg-purple-100",
    icon: "🏥",
    citations: 105,
    views: 1700,
    rating: 4.4,
    publishedDate: "2023-10-10",
    impactFactor: 7.1,
  },
  {
    title: "Open Philanthropy - AI Safety Research",
    description: "Funding opportunity for technical AI safety research.",
    type: "research",
    tags: ["Funding", "AI", "Technology"],
    image:
      "https://images.unsplash.com/photo-1581092331583-2a31b4b28a7e?auto=format&fit=crop&q=80&w=800",
    link: "https://www.openphilanthropy.org/request-for-proposals-technical-ai-safety-research/",
    color: "bg-red-100",
    icon: "🤖",
    citations: 130,
    views: 2200,
    rating: 4.7,
    publishedDate: "2024-01-15",
    impactFactor: 8.2,
  },
  {
    title: "AI & Labour Market Research - UNU-WIDER",
    description: "Investigating AI’s impact on firms and labor markets.",
    type: "research",
    tags: ["Funding", "AI", "Economics"],
    image:
      "https://images.unsplash.com/photo-1603791452906-75a539ff1907?auto=format&fit=crop&q=80&w=800",
    link: "https://www.wider.unu.edu/opportunity/effects-artificial-intelligence-firm-and-labour-market-outcomes",
    color: "bg-teal-100",
    icon: "💼",
    citations: 115,
    views: 1750,
    rating: 4.3,
    publishedDate: "2023-12-05",
    impactFactor: 6.9,
  },
  {
    title: "Innovative Data & Women’s Health - Grand Challenges",
    description: "Funding for novel data modeling in women’s health research.",
    type: "research",
    tags: ["Funding", "Women’s Health", "Data Science"],
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800",
    link: "https://gcgh.grandchallenges.org/challenge/innovative-data-and-modeling-approaches-measure-womens-health",
    color: "bg-pink-100",
    icon: "👩‍⚕️",
    citations: 98,
    views: 1600,
    rating: 4.2,
    publishedDate: "2023-11-20",
    impactFactor: 6.4,
  },
  {
    title: "Horizon Europe EDCTP3 - Global Health Challenge",
    description: "Funding for global health research and innovation.",
    type: "research",
    tags: ["Funding", "Global Health", "Innovation"],
    image:
      "https://images.unsplash.com/photo-1612531392393-6509fe5f8987?auto=format&fit=crop&q=80&w=800",
    link: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-JU-GH-EDCTP3-2025-04-CH-01-two-stage?isExactMatch=true&status=31094501,31094502,31094503&callIdentifier=HORIZON-JU-GH-EDCTP3-2025-04-two-stage&order=DESC&pageNumber=1&pageSize=50&sortBy=startDate",
    color: "bg-cyan-100",
    icon: "🌍",
    citations: 112,
    views: 1850,
    rating: 4.5,
    publishedDate: "2024-02-05",
    impactFactor: 7.4,
  },
  {
    title: "GCBC Research Grant Competition 3",
    description: "Funding opportunity for innovative research projects.",
    type: "research",
    tags: ["Funding", "Innovation", "Research"],
    image:
      "https://images.unsplash.com/photo-1580894732930-a41e9da3d69e?auto=format&fit=crop&q=80&w=800",
    link: "https://www.gcbc.org.uk/the-gcbc-research-grant-competition-3-rgc3-is-now-officially-open-for-concept-note-applications/",
    color: "bg-orange-100",
    icon: "📚",
    citations: 125,
    views: 1900,
    rating: 4.6,
    publishedDate: "2024-01-10",
    impactFactor: 7.0,
  },
  {
    type: "writing",
    icon: "📚",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    title: "CSTE Scientific Writing Toolkit",
    description:
      "Professional toolkit with advanced writing techniques and peer review guidelines.",
    link: "https://www.cste.org/page/scientificwriting",
    tags: ["writing", "toolkit"],
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2023-11-20",
    impactFactor: 7.5,
  },

  {
    type: "tools",
    icon: "🔧",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    title: "Equator Network Resources",
    description:
      "Essential guidelines and checklists for health research reporting standards.",
    link: "https://www.equator-network.org/",
    tags: ["tools", "health"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 200,
    views: 3000,
    rating: 4.7,
    publishedDate: "2023-10-10",
    impactFactor: 8.0,
  },

  {
    type: "tools",
    icon: "📖",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    title: "Springer Nature Writing Guide",
    description:
      "Expert insights on manuscript preparation and submission best practices.",
    link: "https://beta.springernature.com/pre-submission/writing-quality",
    tags: ["writing", "publishing"],
    image:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 180,
    views: 2500,
    rating: 4.6,
    publishedDate: "2023-09-05",
    impactFactor: 7.8,
  },
  {
    type: "guides",
    icon: "🔍",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    title: "CASP Research Tools",
    description:
      "Advanced tools for critical analysis and systematic review methodology.",
    link: "https://casp-uk.net/casp-tools-checklists/",
    tags: ["research", "analysis"],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 150,
    views: 2200,
    rating: 4.9,
    publishedDate: "2023-08-22",
    impactFactor: 8.5,
  },
  {
    type: "writing",
    icon: "📝",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    title: "Academic Phrasebank",
    description:
      "Extensive collection of academic phrases and writing structures.",
    link: "https://www.phrasebank.manchester.ac.uk/",
    tags: ["writing", "language"],
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    citations: 130,
    views: 1900,
    rating: 4.4,
    publishedDate: "2023-07-15",
    impactFactor: 7.2,
  },
  {
    type: "review",
    icon: "🔎",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    title: "Wiley Peer Review Guide",
    description:
      "Comprehensive handbook for conducting effective peer reviews.",
    link: "https://authorservices.wiley.com/Reviewers/journal-reviewers/how-to-perform-a-peer-review/index.html",
    tags: ["review", "publishing"],
    image: "https://source.unsplash.com/400x300/?peer,review",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2023-06-30",
    impactFactor: 7.0,
  },
  {
    type: "funding",
    icon: "💡",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    title: "Research Funding Opportunities",
    description:
      "Latest grants and funding programs for innovative research projects.",
    link: "https://grandchallengesnigeria.org/funding-opportunities/",
    tags: ["funding", "grants"],
    image: "https://source.unsplash.com/400x300/?funding,grants",
    citations: 90,
    views: 1500,
    rating: 4.2,
    publishedDate: "2023-05-25",
    impactFactor: 6.8,
  },
  {
    type: "funding",
    icon: "📜",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    title: "AREF Essential Grant-Writing Skills Programme",
    description:
      "The Africa Research Excellence Fund (AREF) Essential Grant-Writing Skills Programme March/May 2025.",
    link: "https://africaresearchexcellencefund.org.uk/funding-calls/the-africa-research-excellence-fund-aref-essential-grant-writing-skills-programme-march-may-2025/",
    tags: ["funding", "grants", "writing"],
    image: "https://source.unsplash.com/400x300/?grant,writing",
    citations: 100,
    views: 1600,
    rating: 4.1,
    publishedDate: "2023-04-10",
    impactFactor: 6.5,
  },
  {
    type: "funding",
    icon: "🌍",
    color: "bg-gradient-to-r from-blue-100 to-blue-200",
    title: "Emanuele Antola Research Hub",
    description:
      "A comprehensive resource for research methodologies and funding opportunities.",
    link: "https://emanueleantola.org/",
    tags: ["funding", "research"],
    image: "https://source.unsplash.com/400x300/?research,methodology",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2023-03-05",
    impactFactor: 7.5,
  },
  {
    type: "funding",
    icon: "📊",
    color: "bg-gradient-to-r from-green-100 to-green-200",
    title: "SGP Nigeria Funding Opportunities",
    description:
      "Explore funding opportunities for sustainable development projects in Nigeria.",
    link: "https://sgpnigeria.org/",
    tags: ["funding", "sustainability"],
    image: "https://source.unsplash.com/400x300/?sustainability,funding",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2023-02-20",
    impactFactor: 7.0,
  },
  {
    type: "funding",
    icon: "🌱",
    color: "bg-gradient-to-r from-purple-100 to-purple-200",
    title: "IGC Agri-SME Evidence Fund",
    description:
      "Funding opportunities for agricultural SMEs to support evidence-based research.",
    link: "https://www.theigc.org/initiatives/agri-sme-evidence-fund/current-funding-opportunities",
    tags: ["funding", "agriculture"],
    image: "https://source.unsplash.com/400x300/?agriculture,funding",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2023-01-15",
    impactFactor: 6.8,
  },
  {
    type: "funding",
    icon: "🌡️",
    color: "bg-gradient-to-r from-red-100 to-red-200",
    title: "ADF Climate Action Window",
    description:
      "Call for proposals under the ADF Climate Action Window for climate-related projects.",
    link: "https://www.afdb.org/en/topics-and-sectors/initiatives-and-partnerships/adf-climate-action-window/call-proposals-climate-action-window",
    tags: ["funding", "climate"],
    image: "https://source.unsplash.com/400x300/?climate,action",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2022-12-30",
    impactFactor: 6.5,
  },
  {
    type: "funding",
    icon: "🎓",
    color: "bg-gradient-to-r from-yellow-100 to-yellow-200",
    title: "Oxford Early Career Funding",
    description:
      "Funding opportunities for early-career researchers in demography and related fields.",
    link: "https://www.demography.ox.ac.uk/early-career-funding",
    tags: ["funding", "early-career"],
    image: "https://source.unsplash.com/400x300/?early-career,research",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2022-11-25",
    impactFactor: 7.5,
  },
  {
    type: "funding",
    icon: "🔬",
    color: "bg-gradient-to-r from-indigo-100 to-indigo-200",
    title: "HFSP Research Grants",
    description: "Funding for innovative research projects in life sciences.",
    link: "https://www.hfsp.org/funding/hfsp-funding/research-grants",
    tags: ["funding", "life-sciences"],
    image: "https://source.unsplash.com/400x300/?life-sciences,research",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2022-10-10",
    impactFactor: 7.0,
  },
  {
    type: "funding",
    icon: "🌐",
    color: "bg-gradient-to-r from-teal-100 to-teal-200",
    title: "Global Health EDCTP3 Funding",
    description:
      "Calls for proposals under the Global Health EDCTP3 initiative.",
    link: "https://www.global-health-edctp3.europa.eu/funding/calls-proposals_en",
    tags: ["funding", "global-health"],
    image: "https://source.unsplash.com/400x300/?global-health,funding",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2022-09-05",
    impactFactor: 6.8,
  },
  {
    type: "funding",
    icon: "💼",
    color: "bg-gradient-to-r from-cyan-100 to-cyan-200",
    title: "Grand Challenges Canada Funding",
    description:
      "Funding opportunities for innovative global health and development projects.",
    link: "https://www.grandchallenges.ca/funding-opportunities/",
    tags: ["funding", "global-health"],
    image: "https://source.unsplash.com/400x300/?global-health,innovation",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2022-08-20",
    impactFactor: 6.5,
  },
  {
    type: "funding",
    icon: "📱",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    title: "GSMA Innovation Fund for AI",
    description: "Funding for impactful AI projects in mobile for development.",
    link: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma-innovation-fund/the-gsma-innovation-fund-for-impactful-ai/",
    tags: ["funding", "AI"],
    image: "https://source.unsplash.com/400x300/?AI,mobile",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2022-07-15",
    impactFactor: 7.5,
  },
  {
    type: "consultancy",
    icon: "📄",
    color: "bg-gradient-to-r from-blue-100 to-blue-200",
    title: "Call for Experts – Research Project in Kenya",
    description:
      "WFD seeks experts for a research project on democratic governance in Kenya.",
    link: "https://www.wfd.org/vacancy-consultant/call-experts-research-project-kenya",
    tags: ["consultancy", "research"],
    image: "https://source.unsplash.com/400x300/?research,Kenya",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2022-06-30",
    impactFactor: 6.8,
  },
  {
    type: "funding",
    icon: "💰",
    color: "bg-gradient-to-r from-purple-100 to-purple-200",
    title: "HPE Project Grants & Calls for Proposals",
    description:
      "Funding opportunities for projects focused on health, policy, and education.",
    link: "https://www.hpeproject.org/grants-cfp",
    tags: ["funding", "grants", "health", "education", "policy"],
    image: "https://source.unsplash.com/400x300/?health,education",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2022-05-25",
    impactFactor: 6.5,
  },
  {
    title: "Advanced Research Methodologies",
    description:
      "Comprehensive guide to modern research methodologies and best practices in academic research.",
    type: "methodology",
    tags: ["Research", "Methods", "Academic"],
    image:
      "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-purple-100",
    icon: "📚",
    citations: 150,
    views: 2200,
    rating: 4.9,
    publishedDate: "2022-04-10",
    impactFactor: 8.5,
  },
  {
    title: "Data Analysis Techniques",
    description:
      "In-depth exploration of statistical analysis methods for research data.",
    type: "analysis",
    tags: ["Statistics", "Data", "Analysis"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-blue-100",
    icon: "📊",
    citations: 130,
    views: 1900,
    rating: 4.4,
    publishedDate: "2022-03-05",
    impactFactor: 7.2,
  },
  {
    title: "Scientific Writing Guide",
    description:
      "Master the art of writing compelling scientific papers and research articles.",
    type: "education",
    tags: ["Writing", "Science", "Publishing"],
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-green-100",
    icon: "✍️",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2022-02-20",
    impactFactor: 7.5,
  },
  {
    title: "Research Ethics Framework",
    description:
      "Essential guidelines for maintaining ethical standards in research.",
    type: "methodology",
    tags: ["Ethics", "Guidelines", "Standards"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-yellow-100",
    icon: "⚖️",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2022-01-15",
    impactFactor: 7.0,
  },
  {
    title: "Experimental Design Principles",
    description:
      "Learn how to design effective experiments for research studies.",
    type: "science",
    tags: ["Experiments", "Design", "Research"],
    image:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-red-100",
    icon: "🔬",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2021-12-30",
    impactFactor: 6.8,
  },
  {
    title: "Literature Review Techniques",
    description:
      "Systematic approaches to conducting comprehensive literature reviews.",
    type: "research",
    tags: ["Literature", "Review", "Research"],
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-indigo-100",
    icon: "📖",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2021-11-25",
    impactFactor: 6.5,
  },
  {
    title: "Quantitative Research Methods",
    description:
      "Advanced techniques for quantitative data collection and analysis.",
    type: "analysis",
    tags: ["Quantitative", "Methods", "Data"],
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-blue-100",
    icon: "📈",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2021-10-10",
    impactFactor: 7.5,
  },
  {
    title: "Qualitative Research Guide",
    description: "Comprehensive guide to qualitative research methodologies.",
    type: "methodology",
    tags: ["Qualitative", "Research", "Methods"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-green-100",
    icon: "🔍",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2021-09-05",
    impactFactor: 7.0,
  },
  {
    title: "Research Publication Strategy",
    description:
      "Strategic approaches to publishing research in high-impact journals.",
    type: "education",
    tags: ["Publishing", "Strategy", "Journals"],
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-purple-100",
    icon: "📰",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2021-08-20",
    impactFactor: 6.8,
  },
  {
    title: "Statistical Analysis Tools",
    description:
      "Overview of essential statistical tools for research analysis.",
    type: "analysis",
    tags: ["Statistics", "Tools", "Analysis"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-blue-100",
    icon: "🔢",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2021-07-15",
    impactFactor: 6.5,
  },
  {
    title: "Research Project Management",
    description:
      "Best practices for managing complex research projects effectively.",
    type: "methodology",
    tags: ["Management", "Projects", "Planning"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-yellow-100",
    icon: "📋",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2021-06-30",
    impactFactor: 7.5,
  },
  {
    title: "Academic Writing Workshop",
    description:
      "Improve your academic writing skills with practical exercises.",
    type: "education",
    tags: ["Writing", "Academic", "Skills"],
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-red-100",
    icon: "✏️",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2021-05-25",
    impactFactor: 7.0,
  },
  {
    title: "Research Funding Guide",
    description: "Comprehensive guide to securing research funding and grants.",
    type: "research",
    tags: ["Funding", "Grants", "Research"],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-green-100",
    icon: "💰",
    citations: 100,
    views: 1600,
    rating: 4.2,
    publishedDate: "2021-04-10",
    impactFactor: 6.8,
  },

  {
    title: "Peer Review Process",
    description:
      "Understanding and navigating the academic peer review process.",
    type: "education",
    tags: ["Peer Review", "Publishing", "Academic"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-indigo-100",
    icon: "👥",
    citations: 90,
    views: 1500,
    rating: 4.1,
    publishedDate: "2021-03-05",
    impactFactor: 6.5,
  },
  {
    title: "Research Data Management",
    description: "Best practices for organizing and managing research data.",
    type: "methodology",
    tags: ["Data", "Management", "Organization"],
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-purple-100",
    icon: "💾",
    citations: 120,
    views: 1800,
    rating: 4.5,
    publishedDate: "2021-02-20",
    impactFactor: 7.5,
  },
  {
    title: "Scientific Communication",
    description: "Effective strategies for communicating research findings.",
    type: "science",
    tags: ["Communication", "Science", "Presentation"],
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    link: "#",
    color: "bg-blue-100",
    icon: "🎯",
    citations: 110,
    views: 1700,
    rating: 4.3,
    publishedDate: "2021-01-15",
    impactFactor: 7.0,
  },
];

function ReportsSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [filteredItems, setFilteredItems] =
    useState<FeaturedItem[]>(featuredItems);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>("all");
  const [minImpactFactor, setMinImpactFactor] = useState<number>(0);

  const filterItems = useCallback(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return featuredItems
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

        const matchesCategory =
          selectedCategories.includes("all") ||
          selectedCategories.some(
            (cat) => item.type === cat || item.tags.includes(cat)
          );

        const matchesImpactFactor = (item.impactFactor || 0) >= minImpactFactor;

        let matchesDate = true;
        if (dateRange !== "all" && item.publishedDate) {
          const itemDate = new Date(item.publishedDate);
          const now = new Date();
          const monthsAgo = new Date(
            now.setMonth(now.getMonth() - parseInt(dateRange))
          );
          matchesDate = itemDate >= monthsAgo;
        }

        return (
          matchesSearch && matchesCategory && matchesImpactFactor && matchesDate
        );
      })
      .sort((a, b) => (b.impactFactor || 0) - (a.impactFactor || 0));
  }, [searchQuery, selectedCategories, dateRange, minImpactFactor]);

  useEffect(() => {
    setFilteredItems(filterItems());
  }, [filterItems]);

  const toggleCategory = (categoryId: string) => {
    if (categoryId === "all") {
      setSelectedCategories(["all"]);
      return;
    }

    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((id) => id !== "all");
      if (prev.includes(categoryId)) {
        const newCategories = withoutAll.filter((id) => id !== categoryId);
        return newCategories.length === 0 ? ["all"] : newCategories;
      }
      return [...withoutAll, categoryId];
    });
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
  const handleShowLess = () => setVisibleCount(6);

  return (
    <div className="">
      <div className="relative overflow-hidden bg-white/30 backdrop-blur-sm border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-primary-600">
              Research Resources Hub
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
              Discover AI-powered recommendations and trending research
              resources
            </p>

            {/* Search Bar */}
            <div className="relative group  mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-slate-400 text-slate-900 text-lg shadow-lg"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-500"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Publication Date
                    </label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200"
                    >
                      <option value="all">All Time</option>
                      <option value="3">Last 3 Months</option>
                      <option value="6">Last 6 Months</option>
                      <option value="12">Last Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Minimum Impact Factor
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={minImpactFactor}
                      onChange={(e) =>
                        setMinImpactFactor(Number(e.target.value))
                      }
                      className="w-full p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Category Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
                      isSelected
                        ? "bg-primary-600 text-black shadow-lg shadow-blue-500/25"
                        : "bg-white/80 text-slate-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Resource Items */}
      <div
        id="blog&funding"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.slice(0, visibleCount).map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 border border-slate-100 hover:border-slate-200 overflow-hidden"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                {item.impactFactor && (
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    IF: {item.impactFactor.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="p-8 relative">
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-[#4ADE80] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  {item.views && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{item.views} views</span>
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More/Less Buttons */}
        <div className="text-center mt-8 space-y-4">
          {visibleCount < filteredItems.length && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full bg-primary-600 text-white text-lg font-medium transition-all duration-300 ease-out transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Load More <ChevronDown className="h-5 w-5" />
            </button>
          )}
          {visibleCount > 6 && (
            <button
              onClick={handleShowLess}
              className="px-6 py-3 rounded-full bg-slate-200 text-slate-700 text-lg font-medium transition-all duration-300 ease-out transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Show Less <ChevronUp className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsSection;
