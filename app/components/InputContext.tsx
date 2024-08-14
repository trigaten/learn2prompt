'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, Role } from '../types';

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
  handleReceiveMessage: () => void;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [stringFound, setStringFound] = useState<boolean>(false);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const [blockResponse, setBlockResponse] = useState<boolean>(false);

  const updateInputData = (data: string) => setInputData(data);

  const updateSubmitted = (submitted: boolean) => setSubmitted(submitted);

  const updateChatMessages = (newMessage: Message) => setChatMessages(prev => [...prev, newMessage]);

  const updateStringFound = (stringFound: boolean) => setStringFound(stringFound);

  const updateResponseReceived = (responseReceived: boolean) => setResponseReceived(responseReceived);

  const updateBlockResponse = (blockResponse: boolean) => setBlockResponse(blockResponse);

  const handleSendMessage = (message: Message) => {
    updateChatMessages(message);
    updateSubmitted(true);
  }

  const handleReceiveMessage = async () => {
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatMessages })
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
      handleSendMessage, handleReceiveMessage}}
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
