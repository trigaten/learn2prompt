'use client';

import { Message, Role } from '../page';
import { useState, useEffect, ReactElement } from 'react';
import MessageView from './MessageView';
import { useInputContext } from './InputContext';

const Tutorial = (): ReactElement => {
  const tutorialSteps: Message[] = [
    {role: Role.BOT, content: "Welcome to this PE tutorial, type the message hello into the box at the right to get started."},
    {role: Role.BOT, content: "Good job, now hit Enter!"},
    {role: Role.BOT, content: "Now read the response of the AI on the right:"}
  ];

  const [ messages, setMessages ] = useState<Message[]>([tutorialSteps[0]]);
  const { inputData, submitted, updateSubmitted } = useInputContext();
  const [ currentStep, setCurrentStep ] = useState<number>(0);

  useEffect(() => {
    const moveSteps = () => {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setMessages([...messages, tutorialSteps[newStep]]);
    }

    if (currentStep === 0 && inputData.toLowerCase() === "hello") {
      moveSteps();
    } else if (currentStep === 1 && submitted) {
      updateSubmitted(false);
      moveSteps();
    };
  }, [inputData, submitted, currentStep]);

  return (
    <div className={`flex-1 flex flex-col justify-between p-3`}>
      <MessageView
        messages={messages}
      />
      
      <form className="w-full text-center" onSubmit={(e) => {e.preventDefault()}} >
        <input
          className="border-2 border-black w-full h-10"
          type="text"
        />
        <button type="submit" className="hidden">Send</button>
      </form>
    </div>
  );
};

export default Tutorial;
