import React from 'react';
import { Card, CardContent, CardHeader, CardTitle  } from './Card';
import {
  MessageCircleIcon,
  BarChartIcon,
  GlobeIcon,
  WalletIcon,
  AccessibilityIcon,
  LightningBoltIcon,
} from "../data/Icons";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}


const features: Feature[] = [
  {
    icon: <MessageCircleIcon />,
    title: "Trade via Text, Voice & Images",
    description:
      "Swap tokens and execute trades effortlessly using chat, voice commands, or screenshots.",
  },
  {
    icon: <BarChartIcon />,
    title: "Limit & Market Orders",
    description:
      "Set precise entry and exit points for SPL and ERC20 tokens without complex charts.",
  },
  {
    icon: <GlobeIcon />,
    title: "No Language or Technical Barriers",
    description:
      "Designed for everyone—no prior crypto knowledge needed to start trading.",
  },
  {
    icon: <WalletIcon />,
    title: "Seamless Web3 Wallet Integration",
    description:
      "Connect Metamask, Phantom, and other wallets for secure transactions.",
  },
  {
    icon: <AccessibilityIcon />,
    title: "Accessible for All",
    description:
      "Voice-powered trading makes DeFi inclusive, even for visually impaired users.",
  },
  {
    icon: <LightningBoltIcon />,
    title: "Fast & Gas-Efficient",
    description:
      "Optimized for low fees and instant execution on Solana and Ethereum.",
  },
];

export const HowItWorks: React.FC = () => {
    return (
     <section
      id="features"
      className="container text-start py-10 sm:py-20"
      aria-labelledby="how-it-works-title"
    >
      <h2
        id="how-it-works-title"
        className="text-3xl md:text-4xl font-bold text-gray-900 text-white mb-10"
      >
        Why Choose{" "}
        <span className="text-transparent bg-[#ff9500] bg-clip-text">
          ChattaTrader?{" "}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }) => (
          <Card key={title} className="bg-[#1E293B80]">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
    );
}