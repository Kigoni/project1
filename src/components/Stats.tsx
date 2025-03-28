import React, { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  Laptop,
  Clock,
  Languages,
  ListOrdered,
  FileText,
  BookMarked,
  Building2,
} from "lucide-react";

const statisticsData = [
  { id: 1, icon: <BookOpen />, value: 2004, label: "Journals" },
  { id: 2, icon: <Laptop />, value: 377, label: "Thematic Areas" },
  { id: 3, icon: <Clock />, value: 41, label: "Countries" },
  { id: 4, icon: <Languages />, value: 64, label: "Languages" },
  { id: 5, icon: <ListOrdered />, value: 7692, label: "Volumes" },
  { id: 6, icon: <FileText />, value: 14753, label: "Articles" },
  { id: 7, icon: <BookMarked />, value: 11000, label: "Abstracts" },
  { id: 8, icon: <Building2 />, value: 1000, label: "Publishers" },
];

const Stats: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              newSet.add((entry.target as HTMLElement).dataset.id!);
          });
          return newSet;
        });
      },
      { threshold: 0.3 }
    );

    document
      .querySelectorAll(".stats-item")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white">
      {/* <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6"> */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 justify-items-center">
        {/* {statisticsData.map(({ id, icon, value, label }) => (
          <div
            key={id}
            data-id={id.toString()}
            className={`stats-item w-[256px] h-[152px] flex flex-col items-center justify-center backdrop-blur-lg bg-yellow-300/5 border border-white/20 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out ${
              visibleItems.has(id.toString())
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <div className="text-emerald-500 text-3xl mb-2">{icon}</div>
            <Counter endValue={value} />
            <p className="text-gray-600 font-medium text-lg">{label}</p>
          </div>
        ))} */}
        {statisticsData.map(({ id, icon, value, label }) => (
          <div
            key={id}
            data-id={id.toString()}
            className={`stats-item w-full max-w-[300px] h-[152px] flex flex-col items-center justify-center backdrop-blur-lg bg-yellow-300/5 border border-white/20 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out ${
              visibleItems.has(id.toString())
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <div className="text-emerald-500 text-3xl mb-2">{icon}</div>
            <Counter endValue={value} />
            <p className="text-gray-600 font-medium text-lg">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

interface CounterProps {
  endValue: number;
}

const Counter: React.FC<CounterProps> = ({ endValue }) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = endValue / 100;
          const stepTime = Math.floor(1000 / 100);
          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              clearInterval(timer);
              setCount(endValue);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <div>
      <h2 ref={ref} className="text-3xl font-bold text-gray-800">
        {count.toLocaleString()}
      </h2>
    </div>
  );
};

export default Stats;
