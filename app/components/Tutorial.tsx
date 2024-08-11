'use client';

import { Message, Role } from '../types';
import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import TutorialMessageView from './TutorialMessageView';
import { useInputContext } from './InputContext';

const systemMessage: Message = {
  role: Role.SYSTEM,
  content: `
    You are a helpful assistant. You are going to be part of a Prompt Engineering Tutorial that teaches people how to use a computer to prompt AI. The user is chatting with AI and is to do the following steps, one at a time:

    1. type the word hello in a box on the right
    2. press enter once that is done
    4. receive the AI response

    In the following messages, I will periodically send you the state of the website:
    - inputData: what the user has typed in their text box, prior to submitting
    - submitted: whether the user has submitted a new message
    - responseReceived: whether the AI has responded to the user's newest message
    - messages: a list of all messages. note that there will be a "role" for either the user or the AI assistant as well as the message content

    Send a message back to the user depending on what state they're in, moving along with each step until they are finished. Assume the AI will respond immediately.
      
    When the user gets stuck, offer helpful advice, such as more detailed info on how to use a computer. Do not repeat yourself. Be aware that the user has no way to type messages to you. Make your messages very concise. Do not use markdown.

    To start, welcome them to the tutorial. Once steps 1-4 are completed, congratulate them on finishing. There are no further steps.
    `
};

const initialBotMessage: Message =
  {
    role: Role.BOT,
    content: 'Welcome to this PE tutorial, type the message hello into the box at the right to get started.'
  };

const Tutorial = (): ReactElement => {
  const [tutorialMessages, setTutorialMessages] = useState<Message[]>([systemMessage, initialBotMessage]);
  const [botMessage, setBotMessage] = useState<Message>(initialBotMessage);
  const { inputData, submitted, updateSubmitted, chatMessages, stringFound, 
    updateStringFound, responseReceived, updateResponseReceived } = useInputContext();

  const fetchTutorialMessage = useCallback(async () => {
    const stateMessage: Message = {
      role: Role.USER,
      content: `inputData: ${inputData}, submitted: ${submitted}, responseReceived: ${responseReceived}, chatMessages: ${JSON.stringify(chatMessages)}`
    };

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...tutorialMessages, stateMessage] })
      });

      const botMessage: Message = await response.json();
      setTutorialMessages(prev => [...prev, stateMessage, botMessage]);
      setBotMessage(botMessage);
    } catch (error) {
      console.log('Error in API Call');
    }
  }, [inputData, submitted, responseReceived, chatMessages, tutorialMessages]);

  useEffect(() => {
    if (submitted) {
      fetchTutorialMessage();
      updateSubmitted(false);
    }

    if (stringFound) {
      fetchTutorialMessage();
      updateStringFound(false);
    }

    if (responseReceived) {
      fetchTutorialMessage();
      updateResponseReceived(false);
    }
  }, [submitted, stringFound, fetchTutorialMessage, updateStringFound, updateSubmitted, responseReceived, updateResponseReceived])

  return (
    <TutorialMessageView message={botMessage}/>
  );
};

export default Tutorial;
