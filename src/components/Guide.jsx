import React from "react";

const Guide = () => {
  return (
    <div className="relative min-h-screen bg-[#161b22] text-white px-6 py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle, #2a2c38 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl bg-[#0d1117] p-8 rounded-xl shadow-xl border border-[#2a2c38] text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">
          User Guide
        </h1>
        <p className="text-gray-300 leading-relaxed text-lg">
          For more reference, scroll down in the <span className="text-blue-300">Home</span> tab and refer to tutorials. <br />
          For further queries, contact us at{" "}
          <a
            href="mailto:clubmatrix.team@gmail.com"
            className="text-blue-400 underline hover:text-blue-300"
          >
            clubmatrix.team@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Guide;
