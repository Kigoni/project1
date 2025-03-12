import React, { useState, useEffect } from "react";
import { TrendingUp, LineChart, BarChart } from "lucide-react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container px-8 py-8 mx-auto">
      {" "}
      {/* Container div with 70% width */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Yearly Growth Card */}
        <div className="bg-primary-600 p-6 lg:p-8 rounded-lg relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
          <div className="relative z-10">
            <div className="text-white">
              <h2 className="text-lg lg:text-xl font-bold mb-2 transform transition-transform group-hover:translate-x-1">
                YEARLY GROWTH IN
              </h2>
              <h3 className="text-lg lg:text-xl mb-2 transform transition-transform delay-75 group-hover:translate-x-1">
                AFRICAN RESEARCH
              </h3>
              <h3 className="text-lg lg:text-xl mb-4 transform transition-transform delay-100 group-hover:translate-x-1">
                PUBLICATIONS
              </h3>
            </div>
            <div className="flex items-end gap-2 mt-4 transform transition-all duration-300 group-hover:scale-105">
              <div className="text-[72px] lg:text-[100px] font-bold text-white leading-none">
                73
              </div>
              <div className="text-[36px] lg:text-[50px] font-bold text-white leading-none mb-2">
                %
              </div>
            </div>
            <div className="mt-4 text-white/90 text-sm transform transition-transform delay-150 group-hover:translate-x-1">
              Year-over-Year Growth 2024-2025
            </div>
          </div>
          <div className="absolute top-4 right-4 w-32 h-32 lg:w-40 lg:h-40 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            <TrendingUp className="w-full h-full" />
          </div>
        </div>

        {/* Quarterly Growth Chart */}
        <div className="bg-white rounded-lg p-6 lg:p-8 border-2 border-green-400 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
          <div className="text-primary-600 mb-4">
            <h2 className="text-lg lg:text-xl font-bold transform transition-transform group-hover:translate-x-1">
              PUBLICATION GROWTH
            </h2>
            <div className="text-yellow-500 font-bold mt-2 transform transition-transform delay-75 group-hover:translate-x-1">
              Q1 2025: ALL-TIME HIGH
            </div>
          </div>
          <div className="relative h-[180px] lg:h-[220px] mt-6 transition-transform duration-500 group-hover:scale-[1.02]">
            <svg
              className="w-full h-full"
              viewBox="0 0 460 250"
              preserveAspectRatio="none"
            >
              {/* Background Grid */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="40"
                  y1={50 + i * 40}
                  x2="420"
                  y2={50 + i * 40}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="transition-opacity duration-300 group-hover:opacity-50"
                />
              ))}

              {/* Data Line */}
              <path
                d="M 50,180 L 140,150 L 230,120 L 320,90 L 410,40"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: isVisible ? "0" : "1000",
                }}
              />

              {/* Data Points */}
              {[
                { x: 50, y: 180, value: 250 },
                { x: 140, y: 150, value: 285 },
                { x: 230, y: 120, value: 320 },
                { x: 320, y: 90, value: 345 },
                { x: 410, y: 40, value: 377 },
              ].map((point, i) => (
                <g
                  key={`point-${i}`}
                  className="transform transition-transform duration-300 group-hover:scale-110"
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#4ade80"
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:r-8"
                  />
                  <text
                    x={point.x}
                    y={point.y - 15}
                    textAnchor="middle"
                    className="text-xs font-bold fill-yellow-500 transition-all duration-300 group-hover:font-extrabold"
                  >
                    {point.value}
                  </text>
                </g>
              ))}

              {/* X-Axis Labels */}
              {["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"].map(
                (label, i) => (
                  <text
                    key={`label-${i}`}
                    x={50 + i * 90}
                    y="220"
                    textAnchor="middle"
                    className="text-xs fill-[#34D399] transition-transform duration-300 group-hover:translate-y-1"
                  >
                    {label}
                  </text>
                )
              )}
            </svg>
          </div>
        </div>

        {/* Research Metrics */}
        <div className="grid gap-4">
          {/* Academic Growth Stats */}
          <div className="bg-white p-6 rounded-lg border-2 border-green-400 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <h3 className="text-primary-600 text-lg font-bold mb-6 transform transition-transform group-hover:translate-x-1">
              RESEARCH METRICS
            </h3>
            <div className="space-y-6">
              {/* High Quality Research */}
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-600 font-semibold">
                    High Impact Publications
                  </span>
                  <span className="text-yellow-500 font-bold">73%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "73%" : "0%" }}
                  />
                </div>
              </div>
              {/* Advanced Studies */}
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-600 font-semibold">
                    Peer-Reviewed Articles
                  </span>
                  <span className="text-yellow-500 font-bold">85%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "85%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="bg-primary-600 p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <div className="space-y-6">
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <div className="text-2xl font-bold text-white mb-1">76%</div>
                <div className="text-sm text-white">CITATION GROWTH</div>
                <div className="h-2 bg-white/30 mt-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "76%" : "0%" }}
                  />
                </div>
              </div>
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <div className="text-2xl font-bold text-white mb-1">73%</div>
                <div className="text-sm text-white">
                  INTERNATIONAL COLLABORATION
                </div>
                <div className="h-2 bg-white/30 mt-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "73%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Publications Overview */}
        <div className="bg-primary-600 p-6 lg:p-8 col-span-1 md:col-span-2 lg:col-span-2 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-white text-lg mb-2 transform transition-transform group-hover:translate-x-1">
                TOTAL PUBLISHED
              </h2>
              <div className="text-white text-4xl lg:text-5xl font-bold flex items-baseline gap-2 transform transition-all duration-300 group-hover:scale-105">
                2.3K
                <span className="text-sm font-normal opacity-90">
                  RESEARCH PAPERS
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="text-white/90 text-sm">Monthly Growth</div>
                  <div className="text-white text-xl font-bold">+12.5%</div>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="text-white/90 text-sm">Year-over-Year</div>
                  <div className="text-white text-xl font-bold">+73%</div>
                </div>
              </div>
            </div>
            <div className="relative group-hover:rotate-12 transition-transform duration-500">
              <div className="absolute inset-0 bg-white/10 rounded-full"></div>
              <BarChart className="text-white w-16 h-16 lg:w-20 lg:h-20 relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
