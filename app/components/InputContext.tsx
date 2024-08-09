'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../types';

type InputContextType = {
  inputData: string;
  updateInputData: (data: string) => void;
  submitted: boolean;
  updateSubmitted: (state: boolean) => void;
  chatMessages: Message[];
  updateChatMessages: (messages: Message) => void;
  stringFound: boolean;
  updateStringFound: (stringFound: boolean) => void;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [stringFound, setStringFound] = useState<boolean>(false);

  const updateInputData = (data: string) => setInputData(data);

  const updateSubmitted = (submitted: boolean) => setSubmitted(submitted);

  const updateChatMessages = (newMessage: Message) => setChatMessages(prev => [...prev, newMessage]);

  const updateStringFound = (stringFound: boolean) => setStringFound(stringFound);

  return (
    <InputContext.Provider value={{ 
      inputData, updateInputData, 
      submitted, updateSubmitted, 
      chatMessages, updateChatMessages, 
      stringFound, updateStringFound }}>
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
