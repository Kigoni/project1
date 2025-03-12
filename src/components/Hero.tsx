import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[97.2vh] min-h-[97.2vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center -mt-16">
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
                elevating African academia
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

      {/* Enhanced Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200L60 183.3C120 166.7 240 133.3 360 116.7C480 100 600 100 720 116.7C840 133.3 960 166.7 1080 166.7C1200 166.7 1320 133.3 1380 116.7L1440 100V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
