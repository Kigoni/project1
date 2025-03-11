import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Search,
  Network,
  Award,
  BarChart as ChartBar,
  Globe2,
} from "lucide-react";

const About = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Research Excellence",
      description:
        "Empowering researchers, scholars, and institutions across Africa through innovative digital publishing solutions and worldwide academic visibility.",
      features: [
        {
          icon: <BookOpen className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Comprehensive Research Repository",
          description:
            "Leveraging advanced analytics and meticulous curation to empower scholars and researchers through cutting-edge indexing and intuitive search frameworks.",
        },
        {
          icon: <Users className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Expert Peer Review Process",
          description:
            "Rigorous evaluation led by distinguished expert reviewers, ensuring only impactful and high-quality research is featured.",
        },
        {
          icon: <Search className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Enhanced Visibility",
          description:
            "Unparalleled access to African journals and research publications, elevating scholars' contributions to global academia.",
        },
        {
          icon: <Network className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Global Collaboration Network",
          description:
            "Fostering meaningful networking opportunities for scholars to collaborate, exchange ideas, and shape academic discourse.",
        },
      ],
    },
    {
      title: "Academic Impact",
      description:
        "Leading the transformation of African academic publishing through technological innovation and global collaboration.",
      features: [
        {
          icon: <Award className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Citation Impact",
          description:
            "Track and enhance your research impact with comprehensive citation metrics and analytics tools.",
        },
        {
          icon: <Globe2 className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "International Reach",
          description:
            "Connect with researchers worldwide and expand the reach of African scholarship across continents.",
        },
        {
          icon: <Network className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Research Networks",
          description:
            "Build and maintain valuable connections within your field through our extensive academic network.",
        },
        {
          icon: <Search className="w-6 h-6 text-yellow-400 mt-1" />,
          title: "Discovery Tools",
          description:
            "Access advanced search and discovery tools to find relevant research and potential collaborators.",
        },
      ],
    },
  ];

  const handlePrevious = () => {
    setCurrentSection((current) =>
      current > 0 ? current - 1 : sections.length - 1
    );
  };

  const handleNext = () => {
    setCurrentSection((current) =>
      current < sections.length - 1 ? current + 1 : 0
    );
  };

  const currentContent = sections[currentSection];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Horizontal Divider */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-300"></div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16">
        <h2 className="text-4xl text-yellow-400 font-medium mb-4">
        <span>WHY</span> {""}
  <span className="underline">AFRIKA</span> {""}
  <span className="underline">JOURNALS</span>{"?"}
</h2>


          <h1 className="text-[2.75rem] leading-tight font-serif text-navy-800 max-w-4xl mx-auto">
            We position African scholarship at the forefront of global academia.
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Features List */}
          <div className="space-y-8">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                {feature.icon}
                <div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Highlight Box */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-4">
              Join Our Academic Community
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Be part of our mission to amplify African voices in academia.
              Explore our platform and discover the wealth of knowledge and
              innovation emerging from the continent.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-700">
                  Internationally recognized publications
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ChartBar className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-700">Impact factor tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-700">
                  Global research visibility
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 bg-[#4ADE80] text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-[#4ADE80] text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Contribute?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers and institutions who are already part
            of our growing academic community.
          </p>
          <button className="bg-[#4ADE80] text-white px-8 py-3 rounded-md hover:bg-yellow-300 transition-colors">
            Submit Your Research
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-300"></div>
    </div>
  );
};

export default About;
