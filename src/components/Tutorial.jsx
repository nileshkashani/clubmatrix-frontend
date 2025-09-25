import React, { useState, useEffect, useRef } from "react";

const steps = [
  { id: 1, description: "upon hitting 'https://clubmatrix.vercel.app' on browser, you are on home page. Click 3 dots on top right corner.", image: "/1.png" },
  { id: 2, description: "Complete login if you are existing user. Else just signup.", image: "/2.png" },
  { id: 3, description: "Example login page. Enter email and password to login. Else login using Phone no Otp. If not existing user, click on sign up", image: "/3.png" },
  { id: 4, title: "Step 4", description: "Example sign up page. fill all the required fields corrected to successfully signup", image: "/4.png" },
  { id: 5, description: "After successful login/sign up, you must be able to see available clubs by tapping 'Explore Clubs' tab.", image: "/7.png" },
  { id: 6,  description: "After you click on 'Explore Clubs' tab, you will be able to see joined clubs (if any). Also you will be able to see the available clubs you can join. there is a tab for searching club by name and filtering clubs out according to their category.", image: "/5.png" },
  { id: 7,  description: "On home page, you can actualy access the clubs that you joined just by tapping 'Joined Clubs' tab.", image: "/12.png" },
  { id: 8,  description: "you can see the members of joined clubs and announcements which leader of club makes.", image: "/6.png" },
  { id: 9,  description: "You can also add your own club by tapping 'Add your club' tab on home page.", image: "/13.png" },
  { id: 11,  description: "After tapping 'Add your club', just fill out all the required fields correctly to make club.", image: "/8.png" },
  { id: 12,  description: "after club is created, you can see your club option on home screen from where you can have access to your club.", image: "/14.png" },
  { id: 13,  description: "you can manage 4 tabs after you click on 'your club'.", image: "/9.png" },
  { id: 14,  description: "you can manage club join requests which will arrive when any other member tries to join your club. Also you can manage club members under 'Club members' tab. And the most important, you can make announcements that will be visible to Club members by tapping 'Announcement's' tab.", image: "/10.png" },
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
    <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white px-4 mb-10">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-wide mt-10">
        Tutorials
      </h2>

      <div className="flex flex-col items-center space-y-6 w-full">
        {/* Card */}
        <div className="relative w-full md:w-4/5 lg:w-3/5 bg-[#161b22] rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-52 md:min-h-80 lg:min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4">{steps[currentIndex].title}</h3>
          {steps[currentIndex].image && (
            <img
              src={steps[currentIndex].image}
              alt={steps[currentIndex].title}
              className="w-auto max-h-[40vh] md:max-h-[70vh] object-contain rounded-lg shadow mb-4"
            />
          )}
          <p className="text-gray-300 text-lg mb-6 text-center">{steps[currentIndex].description}</p>

          {/* Pause/Resume button */}
          <button
            className="flex items-center justify-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
            onClick={handlePauseResume}
          >
            {isPaused ? (
              <span className="material-icons text-white text-2xl">play</span>
            ) : (
              <span className="material-icons text-white text-2xl">pause</span>
            )}
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow transition"
            onClick={() =>
              setCurrentIndex(prev => (prev === 0 ? steps.length - 1 : prev - 1))
            }
          >
            &larr; Prev
          </button>

          {/* Next button */}
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
              className={`block w-4 h-4 rounded-full transition-all duration-300 border ${
                i === currentIndex ? "bg-blue-600 border-blue-600" : "bg-gray-600 border-gray-700"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
