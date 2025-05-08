import React from "react";
import { Link } from "react-router-dom";
import hat from "../assets/hat.png";
import yarn from "../assets/yarnhook.png";
import hook from "../assets/twohooks.png";

const items = [
  { img: hat, label: "Handmade Crochet Goods" },
  { img: yarn, label: "Custom Crochet Creations" },
  { img: hook, label: "1-1 Crochet Sessions" },
];

const ServicesSec = () => (
  <section className="bg-[#ffe3eb] px-4 py-12 text-center">
    {/* title */}
    <h2 className="mb-12 text-2xl font-semibold text-white md:text-3xl">
      Our&nbsp;
      <span className="font-flair text-5xl text-[#ff577f] md:text-6xl">
        Services
      </span>
    </h2>

    {/* cards */}
    <div className="mb-10 flex flex-wrap justify-center gap-8">
      {items.map(({ img, label }) => (
        <div
          key={label}
          className="w-80 max-w-full cursor-default transition-transform duration-300 hover:-translate-y-2"
        >
          <img
            src={img}
            alt={label}
            className="mb-4 w-11/12 rounded-xl object-cover"
          />
          <p className="text-lg font-bold text-[#ff577f]">{label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSec;
