import React from 'react';
import { Button } from './button';
import { Card, CardDescription, CardHeader, CardTitle } from './Card';
import { AddAccountIcon, CreditCardIcon, CubeIcon } from '../data/Icons';


interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const serviceList: Service[] = [
  {
    title: "Create Your Account",
    description: "Your account and personal identity are guaranteed safe.",
    icon: <AddAccountIcon />,
  },
  {
    title: "Fund Your Wallet",
    description: "Send in native tokens or use our buy feature.",
    icon: <CreditCardIcon />,
  },
  {
    title: "Start Build Portfolio",
    description: "Buy and sell any token by chatting or speaking.",
    icon: <CubeIcon />,
  },
];

export const Services: React.FC = () => {
    const handleGetStarted = (): void => {
    console.log("Get Started clicked");
    // Replace with navigation or modal logic as needed
    // e.g. navigate("/signup");
  };

  return (
    <section className="container py-10 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {/* Left content */}
        <div className="text-center lg:text-start space-y-6">
          <main className="py-10 leading-7">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 md:text-5xl inline py-10">
              <span className="inline text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text my-5">
                How To Get Started
              </span>
            </h1>
          </main>
          <p className="text-xl text-[#94A3B8] md:w-10/12 mx-auto lg:mx-0">
            Simple and easy way to start your investment in cryptocurrency
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3 bg-[#F9F9F9] text-[#324054]" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>

        {/* Right content */}
        <div>
          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }) => (
              <Card 
                key={title}
                className="bg-transparent"
                style={{
                  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                  border:"1px solid #202d39",
                }}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">{icon}</div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2 text-[#94A3B8]">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}