'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../page';

type InputContextType = {
  inputData: string;
  updateInputData: (data: string) => void;
  submitted: boolean;
  updateSubmitted: (state: boolean) => void;
  chatMessages: Message[];
  updateChatMessages: (messages: Message) => void;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const updateInputData = (data: string) => setInputData(data);

  const updateSubmitted = (submitted: boolean) => setSubmitted(submitted);

  const updateChatMessages = (data: Message) => setChatMessages(prev => [...prev, data]);

  return (
    <InputContext.Provider value={{ inputData, updateInputData, submitted, updateSubmitted, chatMessages, updateChatMessages }}>
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
