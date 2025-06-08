import React from 'react';
import { Button } from './button';

export const Cta: React.FC = () => {
    return (
     <section
      id="cta"
      className="bg-[#1E293B80] py-16 my-10 p-8 sm:my-20"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            New in
            <span className="text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text">
              {" "}
              Cryptocurrency?{" "}
            </span>
          </h2>
          <p className="text-[#94A3B8] text-xl mt-4 mb-8 lg:mb-0">
            We’ll show you what crypto is, how it works, and how you can start trading effortlessly with ChattaTrader. No complex charts—just chat, trade, and go. Let’s get started!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            variant="outline"
            className="w-full md:w-auto border text-[#ff9500] bg-[#020817] hover:text-[#008080] hover:bg-[#008080] border-[#ff9500] hover:text-white hover:bg-[#ff9500]"
          >
            View all features
          </Button>
        </div>
      </div>
    </section>
    );
}