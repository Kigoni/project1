import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[97.2vh] min-h-[97.2vh] overflow-hidden pt-10">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-green-700/90" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <Sparkles className="text-yellow-400 h-8 w-8" />
          </motion.div>

          {/* Title with Gradient Text */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 text-transparent bg-clip-text">
              Spotlighting African Journals
            </span>
          </h1>

          {/* Subtitle with Adjacent Dark Overlay */}
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-yellow-400" />
            <p className="text-xl md:text-2xl text-gray-200 mb-8 pl-6 leading-relaxed">
              Welcome to{" "}
              <span className="text-yellow-400 font-semibold">
                Afrika Journals
              </span>
              , your premier hub for{" "}
              <span className="text-white font-semibold">
                cutting-edge African research
              </span>{" "}
              and scholarly excellence. We are committed to{" "}
              <span className="text-yellow-400 font-semibold">
                elevating African academia{" "}
              </span>
               by showcasing groundbreaking research and fostering global
              visibility for African journals.
            </p>
          </div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <button className="group relative px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#learn-more"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Learn More →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay for Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Enhanced Wave SVG */}
      <svg className="fill-white w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,133.3C672,139,768,117,864,101.3C960,85,1056,75,1152,80C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </section>
  );
};

export default Hero;
