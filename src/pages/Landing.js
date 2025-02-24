import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import Features from "../components/Features";
import { ClipboardList, HeartHandshake, Frown } from "lucide-react";
import docImage from "../assets/doc.png";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTypingForward, setIsTypingForward] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const handleClick = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
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

  useEffect(() => {
    let timeout;
    if (isTypingForward) {
      if (typedTitle.length < titleText.length) {
        timeout = setTimeout(() => {
          setTypedTitle(titleText.slice(0, typedTitle.length + 1));
        }, 20);
      } else {
        timeout = setTimeout(() => {
          setIsTypingForward(false);
        }, 2000);
      }
    } else {
      if (typedTitle.length > 0) {
        timeout = setTimeout(() => {
          setTypedTitle(typedTitle.slice(0, -1));
        }, 20);
      } else {
        setIsTypingForward(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isTypingForward]);

  const titleText = "No judgment, just understanding. NeuroVerse listens";
  const features = [
    {
      icon: ClipboardList,
      title: "Mental Health Assessment",
      description:
        "Get personalized insights into your mental well-being through our comprehensive assessment tools.",
      bgColor: "#112D4E",
      textColor: "text-white",
      detdesc:
        "Our mental health assessment tools offer a thorough analysis of your mental well-being, providing you with a comprehensive understanding of your emotional state. Through easy-to-use questionnaires and real-time tracking, we help identify areas of concern and suggest personalized recommendations for improving mental health.",
    },
    {
      icon: HeartHandshake,
      title: "Emotional Support",
      description:
        "Access a supportive community and professional resources for emotional guidance.",
      bgColor: "#112D4E",
      textColor: "text-white",
      detdesc:
        "Emotional support is crucial to maintaining mental well-being. Our platform connects you with a caring community where you can share your feelings, experiences, and receive support. You’ll also have access to certified professionals who provide guidance and resources for navigating emotional challenges.",
    },
    {
      icon: Frown,
      title: "Stress Management",
      description:
        "Learn effective strategies to manage stress and build resilience using virtual assistant.",
      bgColor: "#112D4E",
      textColor: "text-white",
      detdesc:
        "Stress is an unavoidable part of life, but with the right techniques, you can manage it effectively. Our virtual assistant offers tools and personalized advice to help you manage stress. Whether it’s mindfulness exercises, breathing techniques, or time management tips, we provide strategies to build resilience and improve your overall mental health.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const getTitleClasses = () => {
    let baseClasses = "font-extrabold text-[#112d4e]";
    if (windowWidth >= 1024) return `${baseClasses} text-7xl`;
    if (windowWidth >= 768) return `${baseClasses} text-6xl`;
    if (windowWidth >= 640) return `${baseClasses} text-5xl`;
    return `${baseClasses} text-3xl`;
  };

  const getTaglineClasses = () => {
    let baseClasses = "mt-4 text-[#213555] font-xl font-orbitron";
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
          className="absolute inset-0 opacity-40"
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
                      backgroundColor: distance < 200 ? "#133E87" : "#e6e4da",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-8 sm:px-12 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 flex flex-col justify-center">
            <motion.div className="flex flex-wrap justify-center lg:justify-start font-neuroverse whitespace-nowrap text-4xl sm:text-5xl lg:text-6xl tracking-wider">
              {"NeuroVerse".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={getTitleClasses()}
                  animate={{ y: [0, -10, 0] }}
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
              className={`${getTaglineClasses()} text-lg sm:text-xl lg:text-2xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {typedTitle}
            </motion.p>

            <div className="flex flex-col justify-left items-start">
              <div className="flex justify-center mb-2 mt-8">
                <button onClick={handleClick} className="animated-button">
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                  <span className="text">Let's Chat</span>
                  <span className="circle"></span>
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center hidden md:flex h-full">
            <motion.img
              src={docImage}
              alt="Document illustration"
              className="w-[80%] max-w-md h-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      <section className="px-6 font-orbitron">
        <div className="container mx-auto py-16">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-[#112D4E]">
            Our Key Features
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {features.map((feature, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  className="group py-12 h-[350px] relative cursor-pointer overflow-hidden rounded-xl shadow-lg flex flex-col justify-center items-center"
                  style={{
                    backgroundColor: feature.bgColor,
                    flex: isExpanded ? 2 : 1,
                  }}
                  initial={{ flex: 1 }}
                  animate={{ flex: isExpanded ? 2 : 1 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <motion.div
                    className="mb-4 flex justify-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon
                      className={`w-16 h-16 ${feature.textColor}`}
                    />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-center text-[#bedaff] transition-colors duration-300 group-hover:text-yellow-200">
                    {feature.title}
                  </h3>
                  {!isExpanded && (
                    <motion.p
                      className="text-center opacity-100 text-2xl text-white px-6 pt-6 font-smooch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {feature.description}
                    </motion.p>
                  )}

                  {isExpanded && (
                    <motion.p
                      className="text-center text-2xl opacity-100 text-white px-6 pb-6 font-smooch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {feature.detdesc}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-[#213555] text-white py-4">
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
          background: rgba(80, 80, 78, 0.93);
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

        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 36px;
          border: 4px solid;
          border-color: transparent;
          font-size: 24px;
          background-color: inherit;
          border-radius: 20px;
          font-weight: 600;
          color: #112d4e;
          box-shadow: 0 0 0 2px #112d4e;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: #112d4e;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
          right: 16px;
        }

        .animated-button .arr-2 {
          left: -25%;
        }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #112d4e;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          color: #ffffff;
          border-radius: 12px;
        }

        .animated-button:hover .arr-1 {
          right: -25%;
        }

        .animated-button:hover .arr-2 {
          left: 16px;
        }

        .animated-button:hover .text {
          transform: translateX(12px);
        }

        .animated-button:hover svg {
          fill: #ffffff;
        }

        .animated-button:active {
          scale: 0.95;
          box-shadow: 0 0 0 4px #112d4e;
        }

        .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Landing;
