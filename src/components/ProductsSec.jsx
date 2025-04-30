import React from "react";
import { Link } from "react-router-dom";

import keychain from "../assets/keychain.png";
import amigurumi from "../assets/amigurumi.png";
import flower from "../assets/flower.png";
import coaster from "../assets/coaster.png";
import bag from "../assets/bag.png";

const categories = [
  { img: bag, label: "Bags & Pouches" },
  { img: keychain, label: "Key Chains" },
  { img: amigurumi, label: "Amigurumi" },
  { img: flower, label: "Bouquet" },
  { img: coaster, label: "Mug Coasters" },
];

const ProductsSec = () => (
  <section className="flex flex-col items-center bg-[#ffe3eb] py-16 px-8 my-[10%]">
    <p className="text-3xl md:text-4xl font-bold text-[#FF577F] mb-12">
      Our Products
    </p>

    <div className="flex flex-wrap justify-center gap-8 mb-12">
      {categories.map(({ img, label }) => (
        <div
          key={label}
          className="flex flex-col w-[230px] h-[360px] md:w-[330px] md:h-[460px]"
        >
          <img
            src={img}
            alt={label}
            className="w-full h-[260px] md:h-[270px] object-cover"
          />
          <div className="w-full h-[40px] md:h-[60px] bg-white text-[#ff577f] font-bold flex items-center justify-center text-lg">
            {label}
          </div>
        </div>
      ))}
    </div>

    <Link
      to="/Signup"
      className="inline-block rounded-full bg-white py-4 px-8 text-[#FF577F] font-semibold shadow-[0_6px_18px_rgba(255,87,127,0.2)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(255,87,127,0.35)]"
    >
      Explore More&nbsp; &rarr;
    </Link>
  </section>
);

export default ProductsSec;
