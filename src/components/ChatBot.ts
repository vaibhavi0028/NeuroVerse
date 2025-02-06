interface Response {
  text: string;
  followUp?: string;
}

interface Intent {
  patterns: string[];
  responses: Response[];
  context?: string;
}

const intents: Intent[] = [
  {
    patterns: ["hello", "hi", "hey", "greetings"],
    responses: [
      {
        text: "Hello! I'm here to support you. How are you feeling today?",
        followUp: "Feel free to share whatever's on your mind."
      }
    ]
  },
  {
    patterns: ["anxious", "anxiety", "worried", "stress", "stressed"],
    responses: [
      {
        text: "I hear that you're feeling anxious. That's a very normal response to challenging situations. Can you tell me more about what's causing these feelings?",
        followUp: "Remember to take deep breaths - we can work through this together."
      },
      {
        text: "Anxiety can be really overwhelming. Let's break this down together. What specific thoughts are troubling you the most right now?",
        followUp: "We can explore some coping strategies that might help."
      }
    ],
    context: "anxiety"
  },
  {
    patterns: ["sad", "depressed", "depression", "unhappy", "down"],
    responses: [
      {
        text: "I'm sorry you're feeling this way. Depression can make everything feel harder. Would you like to talk about what's contributing to these feelings?",
        followUp: "Your feelings are valid, and you're not alone in this."
      },
      {
        text: "Thank you for sharing that with me. It takes courage to talk about these feelings. Have you been able to talk to anyone else about how you're feeling?",
        followUp: "Remember that seeking help is a sign of strength, not weakness."
      }
    ],
    context: "depression"
  },
  {
    patterns: ["lonely", "alone", "isolated", "no friends"],
    responses: [
      {
        text: "Feeling lonely can be really difficult. Even though I'm an AI, I want you to know that I'm here to listen. What's been making you feel isolated?",
        followUp: "Would you like to explore some ways to connect with others?"
      }
    ],
    context: "loneliness"
  },
  {
    patterns: ["can't sleep", "insomnia", "sleeping problems", "tired"],
    responses: [
      {
        text: "Sleep difficulties can really affect our mental well-being. Have you noticed any patterns in your sleep troubles?",
        followUp: "We could discuss some relaxation techniques that might help."
      }
    ],
    context: "sleep"
  },
  {
    patterns: ["thank you", "thanks", "helpful", "appreciate"],
    responses: [
      {
        text: "You're welcome! Remember, seeking support is a brave step. Is there anything else you'd like to discuss?",
        followUp: "I'm here whenever you need someone to talk to."
      }
    ]
  },
  {
    patterns: ["bye", "goodbye", "see you", "talk later"],
    responses: [
      {
        text: "Take care of yourself! Remember, it's okay to reach out whenever you need support.",
        followUp: "If you're having serious thoughts of harm, please contact emergency services or call a mental health helpline."
      }
    ]
  },
  {
    patterns: ["help", "emergency", "crisis", "suicide", "hurt myself"],
    responses: [
      {
        text: "I'm concerned about your safety. While I'm here to listen, it's important to get professional help immediately. Please contact emergency services (911) or the National Suicide Prevention Lifeline (988).",
        followUp: "Your life has value, and there are people who want to help."
      }
    ],
    context: "crisis"
  }
];

const findIntent = (input: string): Intent | undefined => {
  const normalizedInput = input.toLowerCase();
  return intents.find(intent =>
    intent.patterns.some(pattern => normalizedInput.includes(pattern))
  );
};

const getRandomResponse = (responses: Response[]): Response => {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
};

export const generateResponse = (input: string): Response => {
  const intent = findIntent(input);
  
  if (!intent) {
    return {
      text: "I'm here to listen and support you. Could you tell me more about what's on your mind?",
      followUp: "Sometimes it helps to start with how you're feeling right now."
    };
  }

  return getRandomResponse(intent.responses);
};

export const getCrisisResources = () => ({
  emergency: "911",
  suicidePrevention: "988",
  crisisText: "Text HOME to 741741",
  resources: [
    "National Suicide Prevention Lifeline: 1-800-273-8255",
    "SAMHSA's National Helpline: 1-800-662-4357",
    "National Alliance on Mental Illness: 1-800-950-6264"
  ]
});