import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

import { buttonVariants } from "./button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

interface Route {
  href: string;
  label: string;
}

const routeList: Route[] = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "/trading", label: "Trading" },
];

const LandingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/login");
  };

  return (
  <header className="sticky border-b-[1px] top-0 z-40 w-full bg-[#060b1a] dark:border-b-[#222C3D] text-white">
  <NavigationMenu className="mx-auto">
    <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
      <NavigationMenuItem className="font-bold flex r">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4 pt-4">
          <a
            rel="noreferrer noopener"
            href="/"
            className="ml-2 font-bold text-xl flex items-center space-x-2 text-white hover:text-gray-300"
          >
            <img src={logo} alt="ChattaTrader Logo" />
            <span>ChattaTrader</span>
          </a>
        </div>
      </NavigationMenuItem>

      {/* mobile */}
      <span className="flex md:hidden">
        <ModeToggle />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="px-2">
            <Menu
              className="flex md:hidden h-5 w-5 text-white"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            />
          </SheetTrigger>

          <SheetContent side="left" className="bg-[#060b1a] text-white">
            <SheetHeader>
              <SheetTitle className="font-bold text-xl text-white">
                ChattaTrader
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col justify-center items-center gap-2 mt-4">
              {routeList.map(({ href, label }) => (
                <a
                  rel="noreferrer noopener"
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`${buttonVariants({ variant: "ghost" })} text-white hover:text-gray-300`}
                >
                  {label}
                </a>
              ))}

              <button
                onClick={handleSignUpClick}
                className={`${buttonVariants({
                  variant: "secondary",
                  className: "w-[110px] border",
                })} text-white`}
              >
                Sign Up
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </span>

      {/* desktop */}
      <nav className="hidden md:flex gap-2">
        {routeList.map((route, i) => (
          <a
            rel="noreferrer noopener"
            href={route.href}
            key={i}
            className={`text-[17px] text-white hover:text-gray-300 ${buttonVariants({ variant: "ghost" })}`}
          >
            {route.label}
          </a>
        ))}
      </nav>

      <div className="hidden md:flex gap-2">
        <button
          onClick={handleSignUpClick}
          className={`${buttonVariants({ variant: "secondary", className: "border" })} text-white`}
        >
          Sign In/Up
        </button>

        {/* Uncomment if you want ModeToggle on desktop */}
        {/* <ModeToggle /> */}
      </div>
    </NavigationMenuList>
  </NavigationMenu>
</header>
  );
};

export default LandingNav;
