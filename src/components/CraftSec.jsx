import React from "react";
import { Link } from "react-router-dom";
import yarn from "../assets/heavenly_yarn.png";

const CraftSec = () => (
  <section className="flex flex-wrap items-start justify-around">
    <div className="flex-shrink-0">
      <img src={yarn} alt="heavenly yarn" className="w-full max-w-[500px]" />
    </div>

    <div className="flex flex-col items-start justify-center w-full max-w-[700px] p-5 mt-[5%] mb-[5%]">
      <p className="text-[#FF577F] font-bold text-4xl sm:text-5xl mb-[10%]">
        Crafted with care, stitched with style
      </p>

      <Link
        to="/products"
        onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
        className="inline-block rounded-full border border-[#FF577F] text-[#FF577F] font-bold px-6 py-2 hover:bg-[#FF577F] hover:text-white transition mx-auto sm:mx-0"
      >
        Discover our Creation&nbsp; &rarr;
      </Link>
    </div>
  </section>
);

export default CraftSec;
