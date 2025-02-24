import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane, FaStop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse } from "../components/ChatBot.ts";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#213555",
            animationDelay: "0ms",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#213575",
            animationDelay: "100ms",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#213595",
            animationDelay: "200ms",
          }}
        ></div>
      </div>
    </div>
  );
};

const Waveform = ({ isRecording, small = false }) => {
  const bars = small ? 15 : 30;
  return (
    <div
      className={`flex items-center justify-center space-x-1 ${
        small ? "h-10" : "h-20"
      }`}
    >
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className={`${small ? "w-0.5" : "w-1"} bg-[#4335A7]`}
          animate={{
            height: isRecording
              ? [small ? 10 : 20, small ? 20 : 40, small ? 10 : 20]
              : small
              ? 10
              : 20,
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

const ScatteringLetter = ({ children, index, onComplete }) => {
  const randomDirection = () => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * 1000,
      y: Math.sin(angle) * 1000,
    };
  };

  const direction = randomDirection();

  return (
    <motion.span
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        x: direction.x,
        y: direction.y,
        transition: {
          duration: 0.5,
          delay: index * 0.01,
        },
      }}
      onAnimationComplete={onComplete}
      style={{
        display: "inline-block",
        pointerEvents: "none",
        marginRight: "0.25rem",
      }}
    >
      {children}
    </motion.span>
  );
};

const TypingMessage = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, onComplete]);

  return <div>{displayText}</div>;
};

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isScattering, setIsScattering] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [, setRecordingComplete] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const [randomQuote, setRandomQuote] = useState(null);
  

  const quotes = [
    {
      text: "Owning our story and loving ourselves through that process is the bravest thing that we'll ever do.",
      author: "Brené Brown",
    },
    {
      text: "The journey of healing begins with a single conversation. You're not alone.",
      author: "NeuroVerse",
    },
    {
      text: "Healing is not linear.",
      author: "Unknown",
    },
    {
      text: "Self-care is how you take your power back.",
      author: "Lalah Delia",
    },
    {
      text: "You are enough just as you are.",
      author: "Meghan Markle",
    },
    {
      text: "The greatest wealth is health.",
      author: "Virgil",
    },
    {
      text: "Health is not just about what you're eating. It's also about what you're thinking and saying.",
      author: "Unknown",
    },
    {
      text: "Take care of your body, it’s the only place you have to live.",
      author: "Jim Rohn",
    },
    {
      text: "The best way to predict your future is to create it.",
      author: "Abraham Lincoln",
    },
    {
      text: "Let your joy be in your journey, not in some distant goal.",
      author: "Tim Cahill",
    },
    {
      text: "Self-love is not selfish; you cannot truly love another until you know how to love yourself.",
      author: "RuPaul",
    },
    {
      text: "It’s not the load that breaks you, it’s the way you carry it.",
      author: "Lou Holtz",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setInputText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopRecording();
      };

      recognitionRef.current.onend = () => {
        stopRecording();
      };
    } else {
      console.error("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        setInputText("");
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingComplete(true);
    }
  };

  const handleSend = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (inputText.trim()) {
        if (showWelcome) {
          setIsScattering(true);
          setTimeout(() => {
            setShowWelcome(false);
            setIsScattering(false);
            addMessage();
          }, 2000);
        } else {
          addMessage();
        }
        setRecordingComplete(false);
      }
    }
  };

  const addMessage = () => {
    const userMessageId = Date.now();
    const botMessageId = userMessageId + 1;

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: inputText,
        sender: "user",
      },
    ]);
    setInputText("");

    const response = generateResponse(inputText);

    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        text: "",
        sender: "bot",
        isLoading: true,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                id: botMessageId,
                text: response.text,
                sender: "bot",
                isLoading: false,
                isTyping: true,
                onComplete: () => {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, isTyping: false }
                        : msg
                    )
                  );

                  if (response.followUp) {
                    const followUpId = botMessageId + 1;
                    setTimeout(() => {
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: followUpId,
                          text: response.followUp,
                          sender: "bot",
                          isLoading: false,
                          isTyping: true,
                          onComplete: () => {
                            setMessages((prev) =>
                              prev.map((msg) =>
                                msg.id === followUpId
                                  ? { ...msg, isTyping: false }
                                  : msg
                              )
                            );
                          },
                        },
                      ]);
                    }, 200);
                  }
                },
              }
            : msg
        )
      );
    }, 1000);
  };
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <div className="min-h-[calc(100vh-90px)] mt-[90px] bg-[#e6e4da82] flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col h-[calc(100vh-90px)] pt-4 px-4">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-auto rounded-lg p-6 relative scrollbar-hide"
          style={{
            overflow: showWelcome && isScattering ? "hidden" : "auto",
            overscrollBehavior: "none",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1 }}
              >
                {isScattering ? (
                  <div
                    className="text-4xl font-bold text-gray-700 mb-4 font-dancing"
                    style={{
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    {randomQuote.text.split("").map((letter, index) => (
                      <ScatteringLetter key={index} index={index}>
                        {letter}
                      </ScatteringLetter>
                    ))}
                  </div>
                ) : (
                  <>
                    {randomQuote && (
                      <>
                        <div className="text-6xl font-bold text-gray-700 mb-4 font-dancing">
                          {randomQuote.text}
                        </div>
                        <div className="text-2xl text-gray-500">
                          - {randomQuote.author}
                        </div>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {message.isLoading ? (
                <Loader />
              ) : (
                <div
                  className={`rounded-lg p-3 max-w-[70%] text-2xl ${
                    message.sender === "user"
                      ? "bg-[#e0ded3] text-[#434037]"
                      : "bg-[#fdfcfb] text-[#76746c]"
                  }`}
                >
                  {message.isTyping ? (
                    <TypingMessage
                      text={message.text}
                      onComplete={message.onComplete}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="w-full mx-auto bg-white rounded-lg p-5 flex items-center gap-3 mt-4 shadow-lg border border-gray-300">
          <button
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
            className={`p-2 ${
              isRecording
                ? "text-[#4335A7] animate-pulse"
                : "text-gray-600 hover:text-[#4335A7]"
            }`}
          >
            {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
          </button>

          {isRecording && (
            <div className="flex-1">
              <Waveform isRecording={true} small={true} />
            </div>
          )}

          {!isRecording && (
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
              placeholder="Share how you're feeling..."
              className="flex-1 outline-none text-xl bg-white p-2"
            />
          )}

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded ${
              inputText.trim()
                ? "text-[#4335A7] hover:text-[#4335A7]"
                : "text-gray-400"
            }`}
          >
            <FaPaperPlane size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
