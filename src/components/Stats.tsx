import React, { useState } from 'react';
import { FiFileText as FileText } from 'react-icons/fi';
import { BsBarChartFill as BarChart, BsAward as Award, BsBook as BookOpen, BsArrowUpRight as ArrowUpRight, BsGlobe2 as Globe2 } from 'react-icons/bs';
import {BiTrendingUp as TrendingUp } from 'react-icons/bi'; // Import the TrendingUp icon
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stats: React.FC = () => {
  const [metric, setMetric] = useState('Publications');

  // Sample data for the chart
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: metric,
        data: metric === 'Publications' ? [100, 150, 200, 377] : [50, 120, 180, 250],
        borderColor: 'rgba(16, 185, 129, 1)', // Complementary green color
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Growth Over Quarters (${metric})`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="bg-slate-50 py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Research Impact Metrics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive analysis of our research output and impact across various academic metrics</p>
          </div>

          {/* Floating Stats Cards */}
          <div className="mb-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <div className="group bg-green-400/10 backdrop-blur-2xl rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-gradient-radial from-yellow-300 to-green-300
">
                  <TrendingUp className="text-black mb-3 group-hover:text-black transition-colors" size={28} />
                  <div className="text-4xl font-bold text-black mb-2 group-hover:text-green-300 transition-colors">73%</div>
                  <div className="text-black-200 group-hover:text-black transition-colors">Yearly Growth</div>
                </div>
                <div className="group bg-green-400/10 backdrop-blur-3xl rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-gradient-radial from-yellow-300 to-green-300
">
                  <Award className="text-black mb-3 group-hover:text-black transition-colors" size={28} />
                  <div className="text-4xl font-bold text-black mb-2 group-hover:text-green-300 transition-colors">2.3K</div>
                  <div className="text-black-200 group-hover:text-black transition-colors">Research Papers</div>
                </div>
                <div className="group bg-green-400/10 backdrop-blur-2xl rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-gradient-radial from-yellow-300 to-green-300
 sm:col-span-2 md:col-span-1">
                  <Globe2 className="text-black mb-3 group-hover:text-black transition-colors" size={28} />
                  <div className="text-4xl font-bold text-black mb-2 group-hover:text-green-300 transition-colors">76%</div>
                  <div className="text-black-200 group-hover:text-black transition-colors">Citation Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Growth Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">Publication Growth</h3>
                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  <FileText className="text-green-600" size={24} />
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setMetric('Publications')}
                  className={`px-4 py-2 mx-1 rounded-full text-sm ${
                    metric === 'Publications' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'
                  }`}
                >
                  Publications
                </button>
                <button
                  onClick={() => setMetric('Citations')}
                  className={`px-4 py-2 mx-1 rounded-full text-sm ${
                    metric === 'Citations' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'
                  }`}
                >
                  Citations
                </button>
              </div>
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-105 transform transition-transform">
                {metric === 'Publications' ? 377 : 250}
              </div>
              <div className="text-gray-600 mb-6">Q1 2025: All-time High</div>
              <div className="relative h-[200px] bg-slate-50 rounded-lg p-4 overflow-hidden group-hover:shadow-inner transition-shadow">
                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-green-500/20 to-transparent rounded-b-lg"></div>
                <Line data={data} options={options} />
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">Research Impact</h3>
                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  <BarChart className="text-green-600" size={24} />
                </div>
              </div>

              <div className="space-y-8">
                <div className="group/item">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 group-hover/item:text-green-700 transition-colors flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      High Impact Publications
                    </span>
                    <span className="text-green-600 font-semibold">73%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transform origin-left transition-transform duration-1000 group-hover/item:scale-x-110"
                      style={{ width: '73%' }}
                    ></div>
                  </div>
                </div>

                <div className="group/item">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 group-hover/item:text-green-700 transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Peer-Reviewed Articles
                    </span>
                    <span className="text-green-600 font-semibold">85%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transform origin-left transition-transform duration-1000 group-hover/item:scale-x-110"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>

                <div className="group/item">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 group-hover/item:text-green-700 transition-colors flex items-center gap-2">
                      <Globe2 className="w-4 h-4" />
                      Collaborative Projects
                    </span>
                    <span className="text-green-600 font-semibold">68%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transform origin-left transition-transform duration-1000 group-hover/item:scale-x-110"
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>

                <div className="group/item">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 group-hover/item:text-green-700 transition-colors flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4" />
                      Grant Awards
                    </span>
                    <span className="text-green-600 font-semibold">90%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transform origin-left transition-transform duration-1000 group-hover/item:scale-x-110"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Stats;
