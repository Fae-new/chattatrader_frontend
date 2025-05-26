// src/components/TrendingList.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa"; // Ensure you have react-icons installed

interface TrendingItem {
  id: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
}

interface Props {
  chain: "solana" | "ethereum" | "base";
  loading: boolean;
  onDetails: (item: TrendingItem) => void;
  onTrade: (item: TrendingItem) => void;
}

export const TrendingList: React.FC<Props> = ({
  chain,
  loading,
  onDetails,
  onTrade,
}) => {
  const [items, setItems] = useState<TrendingItem[]>([]);

  useEffect(() => {
    const dummyData: TrendingItem[] = Array.from({ length: 4 }, (_, i) => ({
      id: `${chain}-${i}`,
      name: `${chain.toUpperCase()} Coin ${i + 1}`,
      price: `$${(Math.random() * 100).toFixed(2)}`,
      marketCap: `$${(Math.random() * 1_000_000_000).toFixed(0)}`,
      volume: `$${(Math.random() * 10_000_000).toFixed(0)}`,
    }));

    setItems(dummyData);
  }, [chain]);

  if (loading) {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="h-28 bg-[#1E293B] animate-pulse" />
        ))}
      </div>
    );
  }


  const getChainLogo = (chain: string) => {
    switch (chain) {
      case "solana":
        return "/images/solana.png";
      case "ethereum":
        return "/images/shiba.svg";
      case "base":
        return "/images/shiba.svg"; 
      default:
        return "/images/shiba.svg"; 
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {items.map((item) => (
        <Card key={item.id} className="bg-white text-sm text-gray-700 w-full">
          <CardContent className="flex flex-col gap-3">
            {/* Header: Image, Name, Subtitle */}
            <div className="flex items-center gap-3">
              <img
                src={getChainLogo(chain)}
                alt={`${chain}`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">Top trending asset</div>
              </div>
            </div>

            {/* Volume & Liquidity Row */}
            <div className="flex justify-between text-xs mt-1">
              <div>
                <div className="text-gray-500">Volume 24h</div>
                <div className="text-gray-800 font-medium">$54,278,934.22</div>
              </div>
              <div>
                <div className="text-gray-500">Liquidity</div>
                <div className="text-gray-800 font-medium">$54,278,934.22</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full mt-2">
              <button
                onClick={() => onDetails(item)}
                className="w-1/2 border border-[#334155] text-[#334155] 
                text-xs py-2 rounded-none bg-transparent"
              >
                Details
              </button>
              <button
                onClick={() => onTrade(item)}
                className="w-1/2 border border-[#334155] text-[#334155]
                 text-xs py-2 rounded-none bg-transparent flex 
                 items-center justify-center gap-1"
              >
                Trade Now <FaArrowRight />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};
