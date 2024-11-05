import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Message, Role, TutorialStage, Condition } from '../types';

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
  typing: boolean;
  resetTutorial: () => void;
  handleSendMessage: (message: Message) => void;
  handleReceiveMessage: (messages?: Message[]) => void;
  currentStage: TutorialStage;
  updateCurrentStage: () => void;
  stageProgress: string;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [stringFound, setStringFound] = useState<boolean>(false);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const [blockResponse, setBlockResponse] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
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

  const resetTutorial = () => {
    setStageIndex(0);
    setCurrentStage(stages[0]);
    setChatMessages([]);
    setInputData('');
    setStringFound(false);
    setSubmitted(false);
    setResponseReceived(false);
    setBlockResponse(false);
  };

  const handleSendMessage = (message: Message) => {
    updateChatMessages(message);
    updateSubmitted(true);
  }

  const handleReceiveMessage = async (messages?: Message[]) => {
      setTyping(true); // Show typing indicator
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
        updateChatMessages({ role: Role.BOT, content: "Sorry, there was an error. Please try again." });
      } finally {
        setTyping(false); // Hide typing indicator after receiving response
      }
    }

  const stageProgress = `${stageIndex + 1} / ${stages.length}`;

  return (
    <InputContext.Provider value={{ 
      inputData, updateInputData, 
      submitted, updateSubmitted, 
      chatMessages, updateChatMessages, 
      stringFound, updateStringFound,
      responseReceived, updateResponseReceived,
      blockResponse, updateBlockResponse,
      typing,
      resetTutorial,
      handleSendMessage, handleReceiveMessage,
      currentStage, updateCurrentStage,
      stageProgress
    }}
    >
        {children}
    </InputContext.Provider>
  );
};

export const useInputContext = (): InputContextType => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within a InputContext');
  }
  return context;
};
