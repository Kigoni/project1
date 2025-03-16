import React from "react";
import {
  BookOpen,
  FileText,
  Search,
  ArrowRight,
  BookPlus,
  FilePlus,
} from "lucide-react";

const JournalSection = () => {
  return (
    <div className="bg-white">
      {/* Journals Section */}
      <section id="journals" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-6 text-primary-600">
              Featured Journals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our curated repository of esteemed African journals across
              diverse academic disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Browse Journals",
                description:
                  "Explore our comprehensive collection of peer-reviewed African journals.",
                image:
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80",
                icon: BookOpen,
                color: "from-blue-600 to-indigo-600",
              },
              {
                title: "Submit Journals",
                description:
                  "Submit your journal for inclusion in our prestigious collection.",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
                icon: BookPlus,
                color: "from-emerald-600 to-teal-600",
              },
              {
                title: "Explore More",
                description:
                  "Discover special issues, upcoming volumes, and research trends.",
                image:
                  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80",
                icon: Search,
                color: "from-purple-600 to-pink-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div className="relative p-6 h-72 flex flex-col justify-end">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${item.color} w-fit mb-3`}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    {item.description}
                  </p>
                  <button
                    className={`flex items-center gap-2 text-white bg-gradient-to-r ${item.color} px-4 py-2 rounded-full w-fit group-hover:gap-3 transition-all text-sm`}
                  >
                    Explore <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-6  text-primary-600">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover groundbreaking research from leading African scholars.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Browse Articles",
                description:
                  "Access a vast collection of research articles across multiple disciplines.",
                image:
                  "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&q=80",
                icon: FileText,
                color: "from-blue-600 to-indigo-600",
              },
              {
                title: "Submit Articles",
                description:
                  "Submit your research for peer review and potential publication.",
                image:
                  "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80",
                icon: FilePlus,
                color: "from-rose-600 to-pink-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div className="relative p-8 h-[400px] flex flex-col justify-end">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${item.color} w-fit mb-4`}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-base mb-6">
                    {item.description}
                  </p>
                  <button
                    className={`flex items-center gap-2 text-white bg-gradient-to-r ${item.color} px-6 py-3 rounded-full w-fit group-hover:gap-3 transition-all`}
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Horizontal Divider */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-300"></div>
    </div>
  );
};

export default JournalSection;
