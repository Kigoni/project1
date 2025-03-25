import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Calendar, Globe, MapPin, Users } from "lucide-react";

const ConferenceSection = () => {
  useEffect(() => {
    new Swiper(".progress-slide-carousel", {
      modules: [Autoplay, Pagination],
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".progress-slide-carousel .swiper-pagination",
        type: "progressbar",
      },
    });
  }, []);

  return (
    <div
      id="conferences"
      className=" bg-yellow-500/5 py-16 px-4 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <h4 className="text-indigo-600 font-semibold mb-4 tracking-wide uppercase">
            Global Academic Initiative
          </h4> */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-primary-500">
            Conferences & Workshops
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join the world's leading researchers and practitioners in shaping
            the future of climate health
          </p>
        </div>

        {/* Carousel Section */}
        <div className="swiper progress-slide-carousel swiper-container relative">
          <div className="swiper-wrapper">
            {/* Slide 2 */}
            <div className="swiper-slide px-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 relative">
                  <img
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=2000&q=80"
                    alt="Workshop Session"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                      Workshop
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Advanced Research Methods Workshop
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                      <span>April 15th, 2025</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                      <span>Interactive Online Platform</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-5 h-5 mr-3 text-purple-600" />
                      <span>Limited to 200 Participants</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Globe className="w-5 h-5 mr-3 text-purple-600" />
                      <span>Hands-on Training Sessions</span>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[4, 5, 6].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/40?img=${i}`}
                            alt={`Expert ${i}`}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        +12 Experts
                      </span>
                    </div>
                    <a
                      href="https://hetecon.net/2025/01/17/2025-hybrid-postgraduate-workshop-on-advanced-research-methods/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3bg-[#047857] text-white rounded-lg shadow-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                    >
                      Join Workshop
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="swiper-slide px-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                  <img
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2000&q=80"
                    alt="Research Symposium"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                      Symposium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Global Research Symposium
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                      <span>May 20th, 2025</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Hybrid Format</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-5 h-5 mr-3 text-blue-600" />
                      <span>1000+ Researchers</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Globe className="w-5 h-5 mr-3 text-blue-600" />
                      <span>International Collaboration</span>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[7, 8, 9].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/40?img=${i}`}
                            alt={`Researcher ${i}`}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        +28 Presenters
                      </span>
                    </div>
                    <a
                      href="https://healthpolicy.fsi.stanford.edu/content/2025-rosenkranz-global-health-policy-research-symposium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3bg-[#047857] text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      Submit Abstract
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="swiper-pagination !bottom-0 !top-auto !w-48 !left-1/2 !-translate-x-1/2 !h-1 !bg-gray-200/50 !rounded-full overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceSection;
