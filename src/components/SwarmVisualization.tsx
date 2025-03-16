// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

// import { SimulationNodeDatum } from 'd3';
// // API Endpoints
// const API_ARTICLES = "https://backend.afrikajournals.org/journal_api/api/article/";
// const API_JOURNALS = "https://backend.afrikajournals.org/journal_api/journals/";

// // TypeScript Interface for Journal Data
// interface JournalData extends d3.SimulationNodeDatum {
//   id: number;
//   name: string;
//   discipline: string;
//   citations: number;
//   x: number;
//   y: number;
// }

// const SwarmVisualization: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const [data, setData] = useState<JournalData[]>([]);
//   const [filter, setFilter] = useState<string>("All");

//   useEffect(() => {
//     Promise.all([
//       fetch(API_ARTICLES).then(res => res.json()),
//       fetch(API_JOURNALS).then(res => res.json())
//     ])
//       .then(([_, journals]) => {
//         if (!Array.isArray(journals)) return;

//         const processedData: JournalData[] = journals.map((journal: any) => ({
//           id: journal.id,
//           name: journal.name || "Unknown Journal",
//           discipline: journal.discipline || "Unknown",
//           citations: Math.random() * 100,
//           x: Math.random() * 800,
//           y: Math.random() * 600,
//         }));

//         setData(processedData);
//       })
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     if (!data.length || !svgRef.current) return;

//     const width = 900;
//     const height = 600;
//     const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
//     const filteredData = filter === "All" ? data : data.filter(d => d.discipline === filter);

//     svg.selectAll("*").remove(); // Clear previous SVG content

//     const simulation = d3.forceSimulation<JournalData>(filteredData)
//       .force("charge", d3.forceManyBody().strength(-50))
//       .force("center", d3.forceCenter(width / 2, height / 2))
//       .force("collision", d3.forceCollide().radius((d: SimulationNodeDatum) => Math.sqrt((d as JournalData).citations) * 2))      .force("x", d3.forceX(width / 2).strength(0.02))
//       .force("y", d3.forceY(height / 2).strength(0.02))
//       .on("tick", ticked);

//     const nodes = svg.selectAll("circle")
//       .data(filteredData)
//       .enter()
//       .append("circle")
//       .attr("r", (d: JournalData) => Math.sqrt(d.citations) * 1.5)
//       .attr("fill", "#3498db")
//       .call(drag(simulation));

//     function ticked() {
//       nodes.attr("cx", d => d.x || 0).attr("cy", d => d.y || 0);
//     }
//   }, [data, filter]);

//   function drag(simulation: d3.Simulation<JournalData, undefined>) {
//     return d3.drag<SVGCircleElement, JournalData>()
//       .on("start", (event, d) => {
//         if (!event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//       })
//       .on("drag", (event, d) => {
//         d.fx = event.x;
//         d.fy = event.y;
//       })
//       .on("end", (event, d) => {
//         if (!event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//       });
//   }

//   return (
//     <div>
//       <div>
//         <button onClick={() => setFilter("All")}>All</button>
//         <button onClick={() => setFilter("Science")}>Science</button>
//         <button onClick={() => setFilter("Arts")}>Arts</button>
//       </div>
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// };

// export default SwarmVisualization;
