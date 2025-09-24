import React, { useState, useEffect, useRef } from "react";

const steps = [
  { id: 1, title: "Step 1", description: "upon hitting 'https://clubmatrix.vercel.app' on browser, you are on home page.", image: "/1.png" },
  { id: 2, title: "Step 2", description: "Description for step 2", image: "/2.png" },
  { id: 3, title: "Step 3", description: "Description for step 3", image: "/3.png" },
  { id: 4, title: "Step 4", description: "Description for step 4", image: "/4.png" },
  { id: 5, title: "Step 4", description: "Description for step 5", image: "/7.png" },
  { id: 6, title: "Step 4", description: "Description for step 6", image: "/5.png" },
  { id: 7, title: "Step 4", description: "Description for step 6", image: "/12.png" },
  { id: 8, title: "Step 4", description: "Description for step 7", image: "/6.png" },
  { id: 9, title: "Step 4", description: "Description for step 8", image: "/13.png" },
  { id: 11, title: "Step 4", description: "Description for step 8", image: "/8.png" },
  { id: 12, title: "Step 4", description: "Description for step 8", image: "/14.png" },
  { id: 13, title: "Step 4", description: "Description for step 8", image: "/9.png" },
  { id: 14, title: "Step 4", description: "Description for step 8", image: "/10.png" },
];

const AUTO_SWITCH_INTERVAL = 4000; // 4 seconds

const Tutorial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev === steps.length - 1 ? 0 : prev + 1));
      }, AUTO_SWITCH_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#161b22] text-white px-4">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-wide">
        Tutorials
      </h2>

      <div className="flex flex-col items-center space-y-6 w-full">
        {/* Card */}
        <div className="relative w-full md:w-4/5 lg:w-3/5 bg-[#0d1117] rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-52 md:min-h-80 lg:min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4">{steps[currentIndex].title}</h3>
          {steps[currentIndex].image && (
            <img
              src={steps[currentIndex].image}
              alt={steps[currentIndex].title} 
              className="w-auto max-h-[40vh] md:max-h-[70vh] object-contain rounded-lg shadow mb-4"
            />

          )}
          <p className="text-gray-300 text-lg mb-6 text-center">{steps[currentIndex].description}</p>

          {/* Pause/Resume button (icon) */}
          {/* Pause/Resume button (icon) */}
          <button
            className="flex items-center justify-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
            onClick={handlePauseResume}
          >
            {isPaused ? (
              <span className="material-icons text-white text-2xl">play_arrow</span>
            ) : (
              <span className="material-icons text-white text-2xl">pause</span>
            )}
          </button>

          {/* Next button on right */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow transition"
            onClick={handleNext}
          >
            Next &rarr;
          </button>

        </div>

        {/* Indicator dots */}
        <div className="flex gap-2 justify-center mt-4">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`block w-4 h-4 rounded-full transition-all duration-300 border ${i === currentIndex ? "bg-blue-600 border-blue-600" : "bg-gray-600 border-gray-700"
                }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
