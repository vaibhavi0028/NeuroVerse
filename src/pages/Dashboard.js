import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane, FaStop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// import ExpandIcon from "../assets/expand2.svg";
// import CloseIcon from "../assets/expand1.svg";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#ba5b38",
            animationDelay: "0ms",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#ba5b38",
            animationDelay: "100ms",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: "#ba5b38",
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
          className={`${small ? "w-0.5" : "w-1"} bg-[#FF7F3E]`}
          animate={{
            height: isRecording
              ? [small ? 10 : 20, small ? 20 : 40, small ? 10 : 20]
              : small
              ? 10
              : 20,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
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

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isScattering, setIsScattering] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLoadingMessageId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [, setRecordingComplete] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const quote = {
    text: "Owning our story and loving ourselves through that process is the bravest thing that we'll ever do.",
    author: "Brené Brown",
  };

  const botResponses = [
    "I'm here to help! What can I do for you?",
    "That's interesting! Tell me more.",
    "I understand. Let me assist you with that.",
  ];

  // const previousChats = [
  //   "Previous conversation 1",
  //   "Previous conversation 2",
  //   "Previous conversation 3",
  // ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        setRecordingComplete(true);
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        setInputText("Please tell"); 
        handleSend({ type: "click" }); 
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleSend = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (inputText.trim() || audioBlob) {
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
        setAudioBlob(null);
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
        isAudio: audioBlob !== null,
        audioBlob: audioBlob,
      },
    ]);
    setInputText("");

    // Add temporary bot message with loading state
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        text: "",
        sender: "bot",
        isLoading: true,
      },
    ]);

    // After 1 second, update the bot message with actual response
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                id: botMessageId,
                text: botResponses[
                  Math.floor(Math.random() * botResponses.length)
                ],
                sender: "bot",
                isLoading: false,
              }
            : msg
        )
      );
      setLoadingMessageId(null);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-90px)] mt-[90px] bg-[#e6e4da82] flex flex-col items-center">
      {/* <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-[90px] left-0 w-64 h-full bg-[#eae8df] text-[#434037] z-50 p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Previous Chats</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-[#434037] text-xl"
          >
            <img
              src={CloseIcon}
              alt="Close"
              className="w-6 h-6 text-[#434037]"
            />
          </button>
        </div>
        {previousChats.map((chat, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer rounded text-[#434037]"
          >
            {chat}
          </div>
        ))}
      </motion.div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-6 top-[100px] p-2 rounded-md text-[#434037]"
      >
        <img
          src={ExpandIcon}
          alt="Expand"
          className="w-6 h-6 text-[#434037]"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(16%) sepia(6%) saturate(1000%) hue-rotate(0deg) brightness(90%) contrast(90%)",
          }}
        />
      </button> */}

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
                transition={{ duration: 1 }}
              >
                {isScattering ? (
                  <div
                    className="text-4xl font-bold text-gray-700 mb-4 font-dancing"
                    style={{
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    {quote.text.split("").map((letter, index) => (
                      <ScatteringLetter key={index} index={index}>
                        {letter}
                      </ScatteringLetter>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-6xl font-bold text-gray-700 mb-4 font-dancing">
                      {quote.text}
                    </div>
                    <div className="text-2xl text-gray-500">
                      - {quote.author}
                    </div>
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
                  {message.text}
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
                setInputText("Please tell"); 
                handleSend({ type: "click" }); 
              } else {
                startRecording(); 
              }
            }}
            className={`p-2 ${
              isRecording
                ? "text-[#FF7F3E] animate-pulse"
                : "text-gray-600 hover:text-[#FF7F3E]"
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
              placeholder="Type your message..."
              className="flex-1 outline-none text-xl bg-white p-2"
            />
          )}

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded ${
              inputText.trim()
                ? "text-[#FF7F3E] hover:text-[#FEEE91]"
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
