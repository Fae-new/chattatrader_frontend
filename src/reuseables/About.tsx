import React from "react";
import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About: React.FC = () => {
  return (
    <section id="about" className="container py-10 sm:py-20">
      <div className="bg-[#1E293B80] border border-[#1E2C3E] rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Pilot Illustration"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span className="text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text">
                  About{" "}
                </span>
                The Company
              </h2>
              <p className="text-xl text-[#94A3B8] mt-4">
                ChattaTrader makes DeFi trading effortless. Swap tokens, place
                limit orders, and execute trades across several blockchains
                using text, voice, or images—no complex charts or jargon.
                Whether you're a beginner or an expert, ChattaTrader breaks
                technical and language barriers, making crypto accessible to
                all.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
