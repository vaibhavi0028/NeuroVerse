import React, { useState, useEffect } from "react";
import {
  Brain,
  Heart,
  ShieldCheck,
  Zap,
  Book,
  Globe,
  Target,
  Layers,
  MessageCircle,
} from "lucide-react";

const NeuroVerseAboutUs = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTypingForward, setIsTypingForward] = useState(true);

  const titleText = "NeuroVerse";

  useEffect(() => {
    let timeout;
    if (isTypingForward) {
      if (typedTitle.length < titleText.length) {
        timeout = setTimeout(() => {
          setTypedTitle(titleText.slice(0, typedTitle.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTypingForward(false);
        }, 2000);
      }
    } else {
      if (typedTitle.length > 0) {
        timeout = setTimeout(() => {
          setTypedTitle(typedTitle.slice(0, -1));
        }, 100);
      } else {
        setIsTypingForward(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isTypingForward]);

  const challengeItems = [
    {
      icon: <Brain className="w-12 h-12 text-[#3F72AF]" />,
      title: "Immersive Experience",
      description:
        "Creating a seamless, emotionally responsive AR/VR environment",
    },
    {
      icon: <Heart className="w-12 h-12 text-[#3F72AF]" />,
      title: "Emotional Intelligence",
      description: "Balancing deep emotional analysis with user privacy",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#3F72AF]" />,
      title: "Empathetic AI",
      description: "Developing human-like, non-judgmental counselor responses",
    },
  ];

  const featuresData = [
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      title: "Rapid Response",
      description: "Instant emotional support and real-time analysis.",
    },
    {
      icon: <Book className="w-12 h-12 text-white" />,
      title: "Immersive Environments",
      description:
        "AR/VR technology creates personalized, calming therapeutic spaces.",
    },
    {
      icon: <Globe className="w-12 h-12 text-white" />,
      title: "Global Accessibility",
      description:
        "Breaking barriers with multilingual and cross-cultural support.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#112d4e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white font-orbitron">
            {typedTitle}
            <span className="animate-ping">|</span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-gray-200 font-smooch">
            No judgment, just understanding. NeuroVerse listens
          </p>
        </div>
      </div>

      <div className="container mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-6 font-orbitron">
              Our Mission
            </h2>
            <p className="text-black-700 font-bold mb-6 font-smooch">
              NeuroVerse is revolutionizing mental health support by creating an
              immersive, empathetic environment where individuals can share
              their feelings without hesitation.
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#3F72AF] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors font-lilita"
            >
              Watch Our Story
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 col-span-2">
            {challengeItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[250px] w-full sm:w-auto flex flex-col bg-white shadow-lg rounded-lg p-6 justify-center items-center py-10 group relative overflow-hidden"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="transform group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-smooch text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[0.9rem] font-orbitron">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 font-orbitron">
              NeuroVerse: No judgment, just understanding
            </h2>
            <div className="aspect-video bg-gray-200 flex items-center justify-center"></div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-[#3F72AF] to-[#213555] text-white pt-16 pb-12 pb-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-orbitron">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-[1.2rem] font-smooch">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#213555] text-white py-4 bottom-0 w-full">
        <div className="container mx-auto px-4 text-center font-medium">
          <p>Made with ❤️ by Bug Slayers</p>
        </div>
      </footer>
    </div>
  );
};

export default NeuroVerseAboutUs;
