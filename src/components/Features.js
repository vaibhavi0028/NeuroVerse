import React from "react";
import { motion } from "framer-motion";
import Cover1 from "../assets/cover1.png";
import Char1 from "../assets/img1.png";
import Cover2 from "../assets/cover2.png";
import Char2 from "../assets/img2.png";
import Cover3 from "../assets/cover3.png";
import Char3 from "../assets/img3.png";

const cards = [
  { cover: Cover1, character: Char1 },
  { cover: Cover2, character: Char2 },
  { cover: Cover3, character: Char3 },
];

const Features = () => {
  return (
    <section className="flex flex-col items-center py-16">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-[#87ceeb] text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Features
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-28">
        {cards.map((card, index) => (
          <a href="/" key={index} className="w-full sm:w-[280px] md:w-[320px]">
            <div className="card">
              <div className="wrapper">
                <img src={card.cover} alt="Cover" className="cover-image" />
              </div>
              <img src={card.character} alt="Character" className="character" />
            </div>
          </a>
        ))}
      </div>

      <style jsx global>{`
        :root {
          --card-height: 600px;
          --card-width: calc(var(--card-height) / 1.5);
        }
        .card {
          width: var(--card-width);
          height: var(--card-height);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 24px;
          perspective: 2000px;
          margin: 0 auto;
          border-radius: 5px;
        }
        .cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
        .wrapper {
          transition: all 0.5s;
          position: absolute;
          width: 100%;
          z-index: -1;
          border-radius: 5px;
        }
        .card:hover .wrapper {
          transform: perspective(900px) translateY(-5%) rotateX(20deg);
          box-shadow: 2px 30px 28px -8px rgba(0, 0, 0, 0.7);
          border-radius: 5px;
        }
        .wrapper::before,
        .wrapper::after {
          content: "";
          opacity: 0;
          width: 100%;
          height: 80px;
          transition: all 0.5s;
          position: absolute;
          left: 0;
          border-radius: 5px;
        }
        .wrapper::before {
          top: 0;
          height: 100%;
          background-image: linear-gradient(
            to top,
            transparent 46%,
            rgba(12, 13, 19, 0.5) 68%,
            rgba(12, 13, 19) 97%
          );
        }
        .wrapper::after {
          bottom: 0;
          opacity: 1;
          background-image: linear-gradient(
            to bottom,
            transparent 46%,
            rgba(12, 13, 19, 0.5) 68%,
            rgba(12, 13, 19) 97%
          );
        }
        .card:hover .wrapper::before,
        .wrapper::after {
          opacity: 1;
        }
        .card:hover .wrapper::after {
          height: 50px;
        }
        .character {
          width: 100%;
          opacity: 0;
          transition: all 0.5s;
          position: absolute;
          z-index: -1;
        }
        .card:hover .character {
          opacity: 1;
          transform: translate3d(0%, -25%, 80px);
        }
      `}</style>
    </section>
  );
};

export default Features;
