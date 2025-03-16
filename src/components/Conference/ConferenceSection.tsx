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
            {/* Slide 1 */}
            <div className="swiper-slide px-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80"
                    alt="Conference Hall"
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
                      Featured Event
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Climate Health Summit 2025
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>March 3rd - 5th, 2025</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>Virtual & Global Hubs</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>5000+ Attendees Expected</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Globe className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>24 Time Zones Covered</span>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/40?img=${i}`}
                            alt={`Speaker ${i}`}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        +42 Speakers
                      </span>
                    </div>
                    <a
                      href="https://climatehealthcafe.org/conference-workshop-info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3bg-[#047857] text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="swiper-slide px-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 relative">
                  <img
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=2000&q=80"
                    alt="Workshop Session"
                    className="w-full h-full object-cover mix-blend-overlay"
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
                      href="https://climatehealthcafe.org/conference-workshop-info"
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
                    className="w-full h-full object-cover mix-blend-overlay"
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
                      href="https://climatehealthcafe.org/conference-workshop-info"
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

// import React, { useEffect } from "react";

// import "swiper/css";
// import "swiper/css/pagination";
// import "./Conference.css";
// import Swiper from "swiper";
// import { Autoplay, Pagination } from "swiper/modules";

// const ConferenceSection = () => {
//   useEffect(() => {
//     new Swiper(".progress-slide-carousel", {
//       modules: [Autoplay, Pagination],
//       loop: true,
//       speed: 1000, // Transition speed in milliseconds (1 second)
//       autoplay: {
//         delay: 3000, // Time before the next slide (3 seconds)
//         disableOnInteraction: false,
//       },
//       pagination: {
//         el: ".progress-slide-carousel .swiper-pagination",
//         type: "progressbar",
//       },
//     });
//   }, []);

//   return (
//     <>
//       <div className="w-full  bg-indigo-50 py-8 relative">
//         <div className="flex justify-center items-center">
//           <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
//             Conferences and Workshops
//           </h1>
//         </div>
//         <div className="swiper progress-slide-carousel swiper-container relative">
//           <div className="swiper-wrapper">
//             {/* Slide 1: Next Conference Card */}
//             <div className="swiper-slide">
//               <div className="bg-indigo-50  h-96 flex justify-center items-center">
//                 <div className="bg-white max-w-md w-3/4 p-6 shadow-md rounded-lg text-center">
//                   <h2 className="text-2xl font-bold text-indigo-600 mb-2">
//                     Pre-Conference Workshop
//                   </h2>
//                   <p className="text-lg text-gray-700">
//                     <strong>Location:</strong> Virtual, Entire world
//                   </p>
//                   <p className="text-lg text-gray-700">
//                     <strong>Date:</strong> March 3rd, 2025
//                   </p>
//                   <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
//                     <a
//                       href="https://climatehealthcafe.org/conference-workshop-info"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block"
//                     >
//                       Explore More
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Slide 2 */}
//             {/* <div className="swiper-slide">
//               <div className="bg-indigo-50  h-96 flex justify-center items-center">
//                 <span className="text-3xl font-semibold text-indigo-600">Slide 2</span>
//               </div>
//             </div> */}
//             <div className="swiper-slide">
//               <div className="bg-indigo-50  h-96 flex justify-center items-center">
//                 <div className="bg-white max-w-md w-3/4 p-6 shadow-md rounded-lg text-center">
//                   <h2 className="text-2xl font-bold text-indigo-600 mb-2">
//                     Pre-Conference Workshop
//                   </h2>
//                   <p className="text-lg text-gray-700">
//                     <strong>Location:</strong> Virtual, Entire world
//                   </p>
//                   <p className="text-lg text-gray-700">
//                     <strong>Date:</strong> March 3rd, 2025
//                   </p>
//                   <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
//                     <a
//                       href="https://climatehealthcafe.org/conference-workshop-info"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block"
//                     >
//                       Explore More
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Slide 3 */}
//             {/* <div className="swiper-slide">
//               <div className="bg-indigo-50  h-96 flex justify-center items-center">
//                 <span className="text-3xl font-semibold text-indigo-600">Slide 3</span>
//               </div>
//             </div> */}
//             <div className="swiper-slide">
//               <div className="bg-indigo-50  h-96 flex justify-center items-center">
//                 <div className="bg-white max-w-md w-3/4 p-6 shadow-md rounded-lg text-center">
//                   <h2 className="text-2xl font-bold text-indigo-600 mb-2">
//                     Pre-Conference Workshop
//                   </h2>
//                   <p className="text-lg text-gray-700">
//                     <strong>Location:</strong> Virtual, Entire world
//                   </p>
//                   <p className="text-lg text-gray-700">
//                     <strong>Date:</strong> March 3rd, 2025
//                   </p>
//                   <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
//                     <a
//                       href="https://climatehealthcafe.org/conference-workshop-info"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block"
//                     >
//                       Explore More
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-100"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConferenceSection;
