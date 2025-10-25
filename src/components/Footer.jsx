import React from "react";
import { LOGO } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-6 shadow-inner">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
        {/* 🔹 Logo + Copyright */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="DevTinder logo"
            className="w-6 h-6 object-contain"
          />
          <p className="text-sm">
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
        </div>

        {/* 🔹 Attribution */}
        <div className="text-sm text-neutral-content opacity-80">
          Built by Aneesh Khanna
        </div>
      </div>
    </footer>
  );
};

export default Footer;
