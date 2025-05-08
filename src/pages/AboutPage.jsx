import React from "react";
import ratmain from "../assets/ratmain.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-6 py-4 max-w-6xl mx-auto gap-10 mt-[-20px]">
      <div className="max-w-xl text-left">
        <h1 className="text-4xl font-bold text-[#FF4D8B] mb-6">My Story</h1>
        <p className="text-[#FF4D8B] font-semibold text-[1.15rem] mb-5 leading-relaxed">
          It started when my cousin taught me how to hold the yarn and hook to
          make a simple chain. I began with fun little bracelets and necklaces,
          then dove into YouTube tutorials to learn more.
        </p>
        <p className="text-[#FF4D8B] font-semibold text-[1.15rem] leading-relaxed">
          That summer, I crocheted every day, gifting pieces to family. Their
          encouragement made me realize I had something special — so I opened my
          Instagram page, and now, this website.
        </p>
      </div>

      <div className="relative w-full max-w-sm flex-shrink-0">
        <div className="absolute -top-4 -left-4 w-full h-full rounded-full bg-[#FFA84D] opacity-20 scale-110" />
        <img
          src={ratmain}
          alt="Aya standing"
          className="relative w-full object-contain z-10"
        />
      </div>
    </div>
  );
};

export default AboutPage;
