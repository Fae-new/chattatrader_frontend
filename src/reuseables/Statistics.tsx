import React from "react";

interface Stat {
  quantity: string;
  description: string;
}

export const Statistics: React.FC = () => {
  const stats: Stat[] = [
    {
      quantity: "3",
      description: "Blockchains",
    },
    {
      quantity: "50+",
      description: "Users",
    },
    {
      quantity: "$100K+",
      description: "Volume",
    },
    {
      quantity: "350+",
      description: "Waitlist",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text">
              {quantity}
            </h2>
            <p className="text-xl text-[#94A3B8]">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
