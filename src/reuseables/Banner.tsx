import React from 'react';
import card from "../assets/card.png";

const Banner: React.FC = () => {
    return (
    <section className="container py-16 bg-[#ff9500] my-10 sm:my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
          {/* Text Content */}
          <div className="text-white mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">
              Revolutionize Your Crypto Journey with AI Intelligence
            </h2>
            <ul className="list-none space-y-4">
              {[
                "Buy and sell cryptocurrencies directly via chat.",
                "Trade and analyze using voice.",
                "Real-time AI insights on the crypto market.",
                "Manual trading options for experienced traders.",
                "Manual trading Secure transactions powered by Web3 wallets, for experienced traders.",
              ].map((text, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#008080] mr-2 mt-1 text-lg">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard Image/Graphic (Right on desktop, below on mobile) */}
          <div className="w-full md:w-1/2">
            <img
              src={card}
              alt="ChatTrader Trading Interface"
              className="w-full max-w-md mx-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
    );
}


export default Banner;