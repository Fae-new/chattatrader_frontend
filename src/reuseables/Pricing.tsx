import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import { Check } from 'lucide-react';

interface PricingPlan {
  title: string;
  popular: number;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  buttonText: string;
  benefitList: string[];
}


const pricingList: PricingPlan[] = [
  {
    title: "Lite",
    popular: 0,
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description:
      "Just using this for yourself? Lite is the way to go for the platform.",
    buttonText: "Select Lite",
    benefitList: [
      "Unlimited chats/day",
      "0.5% per transaction",
      "Limited Integrations",
    ],
  },
  {
    title: "Pro",
    popular: 1,
    monthlyPrice: "$X",
    yearlyPrice: "$X",
    description: "Coming Soon!!!",
    buttonText: "Coming Soon!!!",
    benefitList: [
      "Everything in Lite",
      "Transaction Bundles",
      "Advanced Market Analysis",
      "More!!!",
    ],
  },
  {
    title: "Master",
    popular: 0,
    monthlyPrice: "$X",
    yearlyPrice: "$X",
    description: "Coming Soon!!!",
    buttonText: "Coming Soon!!!",
    benefitList: [
      "Everything in Pro",
      "AI launchpad",
      "Token Sniper",
      "Pro Tools & Alerts",
      "More!!!",
    ],
  },
];


export const Pricing: React.FC = () => {
    const [isYearly, setIsYearly] = useState<boolean>(false);

    const handleSelectPlan = (planName: string): void => {
    console.log(`Selected ${planName} plan`);
  };

    return (
     <section id="pricing" className="container py-10 sm:py-20 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 text-white">
        Choose a Plan That Fits Your Crypto Goals
      </h2>
      <h3 className="text-xl text-center text-[#94A3B8] pt-4 pb-8">
        Join millions of other customers on this platform
      </h3>

      <div className="flex justify-center mb-8">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
            className="sr-only peer"
            aria-label="Toggle pricing frequency"
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#008080] peer-checked:bg-[#ff9500]"></div>
          <span className="ml-3 text-gray-600 text-sm font-medium">
            {isYearly ? "Yearly" : "Monthly"}
          </span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing, index) => (
          <Card
            key={pricing.title}
            className="bg-transparent"
           style={{
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            border: "1px solid #202d39",
            backgroundColor: "transparent",
         }}>
            <CardHeader>
              <CardTitle
                className={`flex items-center justify-center w-[70px] p-2 rounded-full ${
                  index === 0
                    ? "bg-blue-100 text-blue-800"
                    : index === 1
                    ? "bg-pink-100 text-pink-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {pricing.title}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">
                  {isYearly ? pricing.yearlyPrice : pricing.monthlyPrice} /{" "}
                  {isYearly ? "year" : "month"}
                </span>
              </div>

              <CardDescription className="text-[#94A3B8]">{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => handleSelectPlan(pricing.title)}
                className="w-full bg-[#008080] text-white hover:bg-teal-800 bg-[#ff9500] hover:bg-[#ff9500] hover:border-none"
                disabled={pricing.buttonText.toLowerCase().includes("coming soon")}
              >
                {pricing.buttonText}
              </Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4 border-[#202d39]" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit) => (
                  <span key={benefit} className="flex">
                    <Check className="text-[#008080] text-[#ff9500]" />
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section> 
    )
}