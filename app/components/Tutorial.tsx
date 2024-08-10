'use client';

import { Message, Role } from '../types';
import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import TutorialMessageView from './TutorialMessageView';
import { useInputContext } from './InputContext';
import Button from './Button';

const systemMessage: Message = {
  role: Role.SYSTEM,
  content: `
    You are a helpful assistant. You are going to be part of a Prompt Engineering Tutorial that teaches people how to use a computer to prompt AI. The user is chatting with AI and is to do the following steps, one at a time:

    1. type the word hello in a box on the right
    2. press enter once that is done
    3. wait for an AI response
    4. received the AI response

    In the following messages, I will periodically send you the state of the website:
    - inputData: what the user has typed in their text box, prior to submitting
    - submitted: whether the user has submitted
    - responseReceived: whether the AI has responded to the user's message
    - messages: a list of all messages. note that there will be a "role"

    Send a message back to the user depending on what state they're in, moving along with each step until they are finished. Assume the AI will respond immediately.
      
    When the user gets stuck, offer helpful advice, such as more detailed info on how to use a computer. Do not repeat yourself. Be aware that the user has no way to type messages to you at the moment. Make your messages concise. Do not use markdown.

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
  const [botMessages, setBotMessages] = useState<Message[]>([initialBotMessage]);
  const { inputData, submitted, updateSubmitted, chatMessages, stringFound, 
    updateStringFound, responseReceived, updateResponseReceived } = useInputContext();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const initialFetch = useRef<boolean>(true);

  const fetchTutorialMessage = useCallback(async () => {
    const stateMessage: Message = {
      role: Role.USER,
      content: `inputData: ${inputData}, submitted: ${submitted}, responseReceived: ${responseReceived}, chatMessages: ${JSON.stringify(chatMessages)}`
    };

    console.log(stateMessage);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...tutorialMessages, stateMessage] })
      });

      const botMessage: Message = await response.json();
      setTutorialMessages(prev => [...prev, stateMessage, botMessage]);
      setBotMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.log('Error in API Call');
    }
  }, [inputData, submitted, responseReceived, chatMessages, tutorialMessages, botMessages.length]);

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

  const changeStep = (change: number) => {
    setCurrentStep((prevStep) => Math.max(0, Math.min(prevStep + change, botMessages.length - 1)));
  };

  return (
    <div className={`flex-1 flex flex-col justify-between p-12 bg-green rounded-r-3xl`}>
      <TutorialMessageView messages={botMessages} currentStep={currentStep} />

      <div className={'flex-1 flex flex-row justify-between'}>
        {/* <Button highlighted={currentStep !== 0} onPress={() => changeStep(-1)}> Previous </Button> */}
        <Button highlighted={currentStep !== botMessages.length - 1} onPress={() => changeStep(1)}> Continue </ Button>
      </div>
    </div>
  );
};

export default Tutorial;
