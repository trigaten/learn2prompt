'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, Role, TutorialStage, Condition } from '../types';

const firstStage: TutorialStage = {
  index: 0,
  messages: [
    {
      role: Role.BOT,
      content: 'Welcome to this interactive tutorial on prompt engineering.'
    },
    {
      role: Role.BOT,
      content: 'In this lesson, we will learn the very basics of prompting!'
    },
    {
      role: Role.BOT,
      content: 'To get started, just type the word “hello” in the box on the right.'
    }
  ],
  condition: Condition.FIND_STRING,
  string: "hello"
}

const secondStage: TutorialStage = {
  index: 1,
  messages: [
    {
      role: Role.BOT, 
      content: 'Good job, now hit enter to send the message to an AI.'
    }
  ],
  condition: Condition.PRESS_ENTER
}

const thirdStage: TutorialStage = {
  index: 2,
  messages: [
    {
      role: Role.BOT,
      content: 'Nice, you have just sent your first message to an AI!'
    },
    {
      role: Role.BOT,
      content: "After you are done reading this, click the “Continue” button below and I'll show you the AI's response."
    }
  ],
  condition: Condition.CONTINUE_BUTTON
}
const fourthStage: TutorialStage = {
  index: 3,
  messages: [
    {
      role: Role.BOT,
      content: 'What would like to learn today?'
    },
    {
      role: Role.BOT,
      content: "You could ask things like 'What are the basics of prompt engineering?' or 'What are some beginner courses I should take?'."
    }
  ],
  condition: Condition.PRESS_ENTER
}

const stages: TutorialStage[] = [firstStage, secondStage, thirdStage, fourthStage];

type InputContextType = {
  inputData: string;
  updateInputData: (data: string) => void;
  submitted: boolean;
  updateSubmitted: (state: boolean) => void;
  chatMessages: Message[];
  updateChatMessages: (messages: Message) => void;
  stringFound: boolean;
  updateStringFound: (stringFound: boolean) => void;
  responseReceived: boolean;
  updateResponseReceived: (responseReceived: boolean) => void;
  blockResponse: boolean;
  updateBlockResponse: (blockResponse: boolean) => void;
  handleSendMessage: (message: Message) => void;
  handleReceiveMessage: (messages?: Message[]) => void;
  currentStage: TutorialStage;
  updateCurrentStage: () => void;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [stringFound, setStringFound] = useState<boolean>(false);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const [blockResponse, setBlockResponse] = useState<boolean>(false);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<TutorialStage>(firstStage);

  const updateInputData = (data: string) => setInputData(data);

  const updateSubmitted = (submitted: boolean) => setSubmitted(submitted);

  const updateChatMessages = (newMessage: Message) => setChatMessages(prev => [...prev, newMessage]);

  const updateStringFound = (stringFound: boolean) => setStringFound(stringFound);

  const updateResponseReceived = (responseReceived: boolean) => setResponseReceived(responseReceived);

  const updateBlockResponse = (blockResponse: boolean) => setBlockResponse(blockResponse);

  const updateCurrentStage = () => {
    const newIndex = currentStage.index + 1;    
    setStageIndex(newIndex);
    setCurrentStage(stages[newIndex]);
  }

  const handleSendMessage = (message: Message) => {
    updateChatMessages(message);
    updateSubmitted(true);
  }

  const handleReceiveMessage = async (messages?: Message[]) => {
      const messagesToSubmit = messages ? messages : chatMessages;

      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messagesToSubmit })
        });

        const botMessage: Message = await response.json();
        updateChatMessages(botMessage);
        updateResponseReceived(true);
      } catch (error) {
        console.log("Error in API Call");
      }
    }

  return (
    <InputContext.Provider value={{ 
      inputData, updateInputData, 
      submitted, updateSubmitted, 
      chatMessages, updateChatMessages, 
      stringFound, updateStringFound,
      responseReceived, updateResponseReceived,
      blockResponse, updateBlockResponse,
      handleSendMessage, handleReceiveMessage,
      currentStage, updateCurrentStage}}
    >
        {children}
    </InputContext.Provider>
  );
};

export const useInputContext = (): InputContextType => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within a inputContext');
  }
  return context;
};
