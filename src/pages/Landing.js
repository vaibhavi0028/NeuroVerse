import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
  >
    <div className="w-16 h-16 bg-[#ba5b38]/10 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-[#ba5b38]" />
    </div>
    <h3 className="text-xl font-bold text-[#983f1f] mb-2">{title}</h3>
    <p className="text-[#ba5b38]">{description}</p>
  </motion.div>
);

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const rowConfigs = [17, 16, 17, 16, 17, 16, 17, 16, 17];

  const calculateDistance = (hexX, hexY) => {
    return Math.hypot(mousePosition.x - hexX, mousePosition.y - hexY);
  };

  return (
    <div className="bg-white">
      <section className="relative min-h-[calc(100vh-50px)] bg-white flex flex-col justify-center">

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
          className="absolute inset-0"
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
                      backgroundColor: distance < 200 ? "#ff9e3d79" : "#e6e4da82",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full" style={{ transform: "translateY(-120px)" }}>
          <motion.div className="flex space-x-2">
            {"NeuroVerse".split("").map((char, index) => (
              <motion.span
                key={index}
                className="text-6xl font-bold text-[#983f1f]"
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
            className="mt-4 text-2xl text-[#ba5b38] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Mental Wellbeing
          </motion.p>
        </div>
      </section>

      <section className=" py-10 px-6 mb-20">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-[#983f1f] text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Brain}
              title="Mental Health Assessment"
              description="Get personalized insights into your mental well-being through our comprehensive assessment tools."
              delay={0.2}
            />
            <FeatureCard
              icon={Heart}
              title="Emotional Support"
              description="Access a supportive community and professional resources for emotional guidance."
              delay={0.4}
            />
            <FeatureCard
              icon={Sparkles}
              title="Mindfulness Exercises"
              description="Practice mindfulness with our guided exercises and meditation sessions."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      <footer className="bg-[#ba5b38] text-white py-4">
        <div className="container mx-auto px-4 text-center font-medium">
          <p>Made with ❤️ by Bug Slayers</p>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --v1: calc(max(6vw, 8vh));
        }

        .hexagon {
          position: relative;
          width: var(--v1);
          height: calc(var(--v1) * 1.1);
          margin: calc(var(--v1) * 0.04) calc(var(--v1) * 0.02);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
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

      `}</style>
    </div>
  );
};

export default Landing;