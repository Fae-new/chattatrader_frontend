import React from "react";
import { Button } from "./button";
import { buttonVariants } from "./button";
import heroImg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (): void => {
    navigate("/sign-up");
  };

  const handleExploreFeaturesClick = (): void => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate with hash if element not found on current page
      navigate("/#features");
    }
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-5 md:py-10 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="py-10 leading-7 inline">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 text-white mb-4 md:text-5xl inline py-10">
            Your AI-Powered Crypto Companion for Smarter{" "}
            <span className="inline text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text my-5">
              Trading!
            </span>
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Chat, Trade, and Succeed—Whether You're Automating with AI or Taking
          Control Manually.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 
          md:space-y-0 items-center justify-center md:items-start md:justify-start">
          <Button
           className="w-full max-w-xs md:w-1/3 !bg-[#ff9500] text-white hover:!bg-teal-800 hover:!bg-[#ff9500] hover:border-none"
          onClick={handleSignUpClick}>
           Start Trading Now
        </Button>


          <Button
            onClick={handleExploreFeaturesClick}
            className={`${buttonVariants({
              variant: "outline",
            })} w-full max-w-xs md:w-1/3 border border-[#ff9500] text-[#ff9500] hover:text-[#fff] hover:bg-[#ff9500] dark:border-[#ff9500] dark:text-[#ff9500] dark:hover:text-white dark:hover:bg-[#ff9500]`}
          >
            Explore Features
          </Button>
        </div>
      </div>

      {/* Hero image */}
      <div className="z-10">
        <img
          src={heroImg}
          alt="ChatTrader Dashboard"
          className="w-full max-w-4xl mx-auto object-contain"
        />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
