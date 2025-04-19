"use client";
import Image from "next/image";
import React from "react";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to section when nav link is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "inspiration", "pricing", "about", "support"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-full flex items-center my-4 px-5 justify-between  bg-theme h-[52px] ">
      <Image
        className="w-[269px] h-[16px]"
        src={"/assets/navlogo.svg"}
        alt="logo"
        width={100}
        height={100}
      />
      <div className="flex gap-5 text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("inspiration")}
            className={`font-semibold text-white text-[16px]`}
          >
            Inspiration
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className={`font-semibold text-white text-[16px]`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`font-semibold text-white text-[16px]`}
          >
            About
          </button>

          {/* Support Dropdown */}
          <div className="relative group">
            <button className="       items-center flex      font-semibold text-white text-[16px]">
              Support
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => scrollToSection("faq")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToSection("documentation")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Documentation
              </button>
            </div>
          </div>
        </div>
        <div className=" h-auto  bg-white border-r-2 border-white" />
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-primary font-bold text-[16px]">
            Sign in
          </button>
          <button className="btn-primary">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
