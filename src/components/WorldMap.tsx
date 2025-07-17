import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface TooltipState {
  content: string;
  x: number;
  y: number;
  visible: boolean;
}

interface WorldmapProps {
  onCountryClick: (country: string) => void;
}

const INITIAL_TOOLTIP_STATE: TooltipState = {
  content: "",
  x: 0,
  y: 0,
  visible: false,
};

const Worldmap: React.FC<WorldmapProps> = ({ onCountryClick }) => {
  const [tooltip, setTooltip] = useState<TooltipState>(INITIAL_TOOLTIP_STATE);

  const defaultColor = "#4ade80"; // Light Blue (Pale Turquoise)

  const countryHoverColors = {
    Algeria: "#007A3D",
    Egypt: "#C8102E",
    Libya: "#006400",
    Morocco: "#B32D29",
    Sudan: "#D71920",
    Tunisia: "#E70013",
    Benin: "#FFD910",
    "Burkina Faso": "#D21034",
    "Cape Verde": "#003DA5",
    Gambia: "#AB2328",
    Ghana: "#FFB915",
    Guinea: "#E30B17",
    "Guinea-Bissau": "#900020",
    "Ivory Coast": "#FF7E00",
    Liberia: "#002868",
    Mali: "#FFC40C",
    Mauritania: "#007A33",
    Niger: "#E77000",
    Nigeria: "#008753",
    Senegal: "#FCD116",
    "Sierra Leone": "#1EB53A",
    Togo: "#EFCB00",
    Burundi: "#0D9B1E",
    Comoros: "#FFD500",
    Djibouti: "#0099CC",
    Eritrea: "#D82C20",
    Ethiopia: "#008000",
    Kenya: "#0B5A23",
    Madagascar: "#D73814",
    Malawi: "#D21F1B",
    Mauritius: "#E03C31",
    Rwanda: "#00A1DE",
    Seychelles: "#0033A0",
    Somalia: "#4189DD",
    "South Sudan": "#0057B7",
    Tanzania: "#17B169",
    Uganda: "#FFD700",
    Angola: "#C30E2E",
    Cameroon: "#008000",
    "Central African Republic": "#002395",
    Chad: "#002B7F",
    Congo: "#009A00",
    "Democratic Republic of the Congo": "#007FFF",
    "Equatorial Guinea": "#0098DA",
    Gabon: "#009A44",
    "Sao Tome and Principe": "#F4A900",
    Botswana: "#6ECFF6",
    Eswatini: "#9B111E",
    Lesotho: "#00209F",
    Mozambique: "#FFD200",
    Namibia: "#003DA5",
    "South Africa": "#006B3F",
    Zambia: "#007A33",
    Zimbabwe: "#FDC72F",
  };

  const handleCountryClick = (countryName: string) => {
    if (typeof onCountryClick === "function") {
      onCountryClick(countryName);
    } else {
      console.error("onCountryClick is not a function");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center overflow-hidden">
      {/* Glowing Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-yellow-500/5 animate-pulse" />
      </div>

      {/* Header */}
      <header className="mt-10 mb-6 text-center z-10 relative">
        <h1 className="text-4xl font-extrabold">
          <span className="text-primary-600">African Journal Explorer</span>
        </h1>
        <p className="text-lg text-amber mt-4">
          Click on any country to explore its Journals details
        </p>
      </header>

      {/* Map Container */}
      <div className="relative w-4/5 h-[600px] z-10 mb-5">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            scale: 450,
            center: [17, 3],
          }}
          className="w-full h-full"
        >
          <Geographies geography="https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/africa.geojson">
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name as keyof typeof countryHoverColors;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: defaultColor, // Use the light blue color by default
                        stroke: "rgba(255, 165, 0, 0.6)",
                        strokeWidth: 1,
                        filter: "drop-shadow(0 0 2px rgba(255, 165, 0, 0.3))",
                      },
                      hover: {
                        fill: countryHoverColors[countryName] || "#2a2a4e",
                        stroke: "rgba(255, 165, 0, 0.9)",
                        strokeWidth: 1,
                        filter: "drop-shadow(0 0 4px rgba(255, 165, 0, 0.5))",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#3a3a6e",
                        stroke: "rgba(255, 165, 0, 1)",
                        strokeWidth: 1,
                        filter: "drop-shadow(0 0 6px rgba(255, 165, 0, 0.7))",
                      },
                    }}
                    onMouseEnter={(e) => {
                      setTooltip({
                        content: countryName,
                        x: e.clientX,
                        y: e.clientY,
                        visible: true,
                      });
                    }}
                    onMouseMove={(e) => {
                      setTooltip((prev) => ({
                        ...prev,
                        x: e.clientX,
                        y: e.clientY,
                      }));
                    }}
                    onMouseLeave={() => {
                      setTooltip((prev) => ({ ...prev, visible: false }));
                    }}
                    onClick={() => handleCountryClick(countryName)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="fixed bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none z-50 border border-amber-500/30"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 40,
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-amber-200 font-medium">
              {tooltip.content}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Worldmap;
