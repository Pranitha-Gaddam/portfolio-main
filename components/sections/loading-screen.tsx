"use client";

import React from "react";

const nameToAnimate: string = "Pranitha Gaddam"; 

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* LAYER 1: CURTAIN (Cream / Dark Slate) */}
      <div 
        className="absolute inset-0 bg-portfolio-cream dark:bg-slate-950 animate-curtain-vanish"
        style={{ animationDelay: "1.8s" }}
      />

      {/* LAYER 2: SLIDE (Amber) */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center 
                   bg-white dark:bg-slate-950
                   animate-loader-slide"
      >
        {/* NAME CONTAINER */}
        <h1 className="
            text-amber-600 dark:text-amber-400 font-playfair
            text-[10vw] md:text-[8vw]
            whitespace-nowrap overflow-visible px-4
        ">
          {nameToAnimate.split("").map((letter, index) => (
            <span
              key={index}
              className={`
                inline-block 
                opacity-0 translate-y-5
                ${letter === " " ? "w-[0.5em]" : "animate-letter-bounce"}
              `}
              style={{
                // Quick ripple effect
                animationDelay: `${0.1 + (index * 0.05)}s`, 
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Loader;