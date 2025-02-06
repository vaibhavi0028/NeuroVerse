import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import docImage from "../assets/doc.png";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const handleClick = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const rowConfigs = [17, 16, 17, 16, 17, 16, 17, 16, 17];

  const calculateDistance = (hexX, hexY) => {
    return Math.hypot(mousePosition.x - hexX, mousePosition.y - hexY);
  };

  const getTitleClasses = () => {
    let baseClasses = "font-bold text-[#983f1f]";
    if (windowWidth >= 1024) return `${baseClasses} text-6xl`;
    if (windowWidth >= 768) return `${baseClasses} text-5xl`;
    if (windowWidth >= 640) return `${baseClasses} text-4xl`;
    return `${baseClasses} text-3xl`;
  };

  const getTaglineClasses = () => {
    let baseClasses = "mt-4 text-[#ba5b38] font-bold";
    if (windowWidth >= 1024) return `${baseClasses} text-2xl`;
    if (windowWidth >= 768) return `${baseClasses} text-xl`;
    return `${baseClasses} text-lg`;
  };

  return (
    <div className="bg-white">
      <section className="relative min-h-[calc(100vh-50px)] bg-white">
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          )}
        </AnimatePresence>

        <div
          className="absolute inset-0 opacity-30"
          style={{ transform: "translateX(-50px) translateY(-100px)" }}
        >
          {rowConfigs.map((hexCount, rowIndex) => (
            <div key={rowIndex} className="row">
              {Array.from({ length: hexCount }).map((_, colIndex) => {
                const hexElement = document.querySelector(
                  `.row:nth-child(${rowIndex + 1}) .hexagon:nth-child(${
                    colIndex + 1
                  })`
                );
                const hexRect = hexElement?.getBoundingClientRect();
                const distance = hexRect
                  ? calculateDistance(
                      hexRect.left + hexRect.width / 2,
                      hexRect.top + hexRect.height / 2
                    )
                  : Infinity;

                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className="hexagon"
                    animate={{
                      backgroundColor:
                        distance < 200 ? "#ff9e3" : "#e6e4da82",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 flex flex-col justify-center">
            <motion.div className="flex flex-wrap justify-center lg:justify-start space-x-2">
              {"NeuroVerse".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={getTitleClasses()}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <motion.p
              className={getTaglineClasses()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              No judgment, just understanding. NeuroVerse listens
            </motion.p>
          </div>

          <div className="w-1/2 flex justify-center items-center hidden md:flex h-full">
            <motion.img
              src={docImage}
              alt="Document illustration"
              className={`w-4/5 h-auto ${
                windowWidth < 768 ? "opacity-0 absolute" : ""
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-center my-12">
        <button onClick={handleClick} className="button">
          <div className="state state--default">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <p>
              {"Let's chat".split(" ").map((char, index) => (
                <span
                  key={index}
                  style={{
                    "--i": index,
                    marginRight: index === 0 ? "0" : "8px",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
          <div className="state state--sent">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p>
              {"Be happy..".split("").map((char, index) => (
                <span key={index} style={{ "--i": index, marginRight: "4px" }}>
                  {char}
                </span>
              ))}
            </p>
          </div>
          <div className="outline"></div>
        </button>
      </div>

      <section className="px-6 mb-10">
        <Features />
      </section>

      <footer className="bg-[#ba5b38] text-white py-4">
        <div className="container mx-auto px-4 text-center font-medium">
          <p>Made with ❤️ by Bug Slayers</p>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --v1: calc(max(4vw, 6vh));
        }

        @media (min-width: 768px) {
          :root {
            --v1: calc(max(6vw, 8vh));
          }
        }

        .hexagon {
          position: relative;
          width: var(--v1);
          height: calc(var(--v1) * 1.1);
          margin: calc(var(--v1) * 0.04) calc(var(--v1) * 0.02);
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          background: #e6e4da82;
          transition: background-color 0.3s ease;
        }

        .row {
          display: inline-flex;
          margin-top: calc(var(--v1) * -0.32);
        }

        .row:nth-child(even) {
          margin-left: calc(var(--v1) * 0.52);
        }

        @media (max-width: 640px) {
          .row {
            margin-top: calc(var(--v1) * -0.28);
          }

          .row:nth-child(even) {
            margin-left: calc(var(--v1) * 0.48);
          }
        }

        .button {
          --primary: #ffffff;
          --neutral-1: #ba5b38;
          --neutral-2: rgb(236, 153, 71);
          --radius: 14px;
          --bg-color: #ba5b38;

          background-color: var(--bg-color);
          color: var(--primary);
          cursor: pointer;
          border-radius: var(--radius);
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
          border: none;
          box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          min-width: 200px;
          padding: 20px;
          height: 68px;
          font-family: "Galano Grotesque", Poppins, Montserrat, sans-serif;
          font-style: normal;
          font-size: 18px;
          font-weight: 600;
        }

        .button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
            0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
        }

        .button:active {
          transform: scale(1);
          box-shadow: 0 0 1px 2px rgba(249, 236, 166, 0.3),
            0 10px 3px -3px rgba(0, 0, 0, 0.2);
        }

        .button:after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(var(--neutral-1), var(--neutral-2))
              padding-box,
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45))
              border-box;
          z-index: 0;
          transition: all 0.4s ease;
        }

        .button:hover::after {
          transform: scale(1.05, 1.1);
          box-shadow: inset 0 -1px 3px 0 rgba(249, 236, 166, 0.3);
        }

        .button::before {
          content: "";
          inset: 7px 6px 6px 6px;
          position: absolute;
          background: linear-gradient(
            to top,
            var(--neutral-1),
            var(--neutral-2)
          );
          border-radius: 30px;
          filter: blur(0.5px);
          z-index: 2;
        }

        .state p {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .state .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: scale(1.25);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .state .icon svg {
          color: white;
          overflow: visible;
        }

        /* Outline */
        .outline {
          position: absolute;
          border-radius: inherit;
          overflow: hidden;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s ease;
          inset: -2px -3.5px;
        }

        .outline::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 180deg,
            transparent 60%,
            white 80%,
            transparent 100%
          );
          animation: spin 2s linear infinite;
          animation-play-state: paused;
        }

        .button:hover .outline::before {
          animation-play-state: running;
        }

        /* Letters */
        .state p span {
          display: block;
          opacity: 0;
          animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
        }

        .button:hover p span {
          opacity: 1;
          animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
        }

        .button:focus p span {
          opacity: 1;
          animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
        }

        @keyframes wave {
          30% {
            opacity: 1;
            transform: translateY(4px) translateX(0) rotate(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) translateX(0) rotate(0);
            color: var(--primary);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px) translateX(5px) rotate(-90deg);
            color: var(--primary);
            filter: blur(5px);
          }
          30% {
            opacity: 1;
            transform: translateY(4px) translateX(0) rotate(0);
            filter: blur(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) translateX(0) rotate(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0);
          }
        }

        @keyframes disapear {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: translateX(5px) translateY(20px);
            color: var(--primary);
            filter: blur(5px);
          }
        }

        /* Plane */
        .state--default .icon svg {
          animation: land 0.6s ease forwards;
        }

        .button:hover .state--default .icon {
          transform: rotate(45deg) scale(1.25);
        }

        .button:focus .state--default svg {
          animation: takeOff 0.8s linear forwards;
        }

        .button:focus .state--default .icon {
          transform: rotate(0) scale(1.25);
        }

        @keyframes takeOff {
          0% {
            opacity: 1;
          }
          60% {
            opacity: 1;
            transform: translateX(70px) rotate(45deg) scale(2);
          }
          100% {
            opacity: 0;
            transform: translateX(160px) rotate(45deg) scale(0);
          }
        }

        @keyframes land {
          0% {
            transform: translateX(-60px) translateY(30px) rotate(-50deg)
              scale(2);
            opacity: 0;
            filter: blur(3px);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Contrail */
        .state--default .icon:before {
          content: "";
          position: absolute;
          top: 50%;
          height: 2px;
          width: 0;
          left: -5px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 0, 0, 0.5)
          );
        }

        .button:focus .state--default .icon:before {
          animation: contrail 0.8s linear forwards;
        }

        @keyframes contrail {
          0% {
            width: 0;
            opacity: 1;
          }
          8% {
            width: 15px;
          }
          60% {
            opacity: 0.7;
            width: 80px;
          }
          100% {
            opacity: 0;
            width: 160px;
          }
        }

        /* States */
        .state {
          padding-left: 29px;
          z-index: 2;
          display: flex;
          position: relative;
        }

        .state--default span:nth-child(4) {
          margin-right: 5px;
        }

        .state--sent {
          display: none;
        }

        .state--sent svg {
          transform: scale(1.25);
          margin-right: 8px;
        }

        .button:focus .state--default {
          position: absolute;
        }

        .button:focus .state--sent {
          display: flex;
        }

        .button:focus .state--sent span {
          opacity: 0;
          animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
        }

        .button:focus .state--sent .icon svg {
          opacity: 0;
          animation: appear 1.2s ease forwards 0.8s;
        }

        @keyframes appear {
          0% {
            opacity: 0;
            transform: scale(4) rotate(-40deg);
            color: var(--primary);
            filter: blur(4px);
          }
          30% {
            opacity: 1;
            transform: scale(0.6);
            filter: blur(1px);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
