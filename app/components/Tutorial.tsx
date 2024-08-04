'use client';

import { Message, Role } from '../page';
import { useState, useEffect, ReactElement } from 'react';
import TutorialMessageView from './TutorialMessageView';
import { useInputContext } from './InputContext';
import Button from './Button';


const Tutorial = (): ReactElement => {
  const tutorialSteps: Message[] = [
    {role: Role.BOT, content: "Welcome to this PE tutorial, type the message hello into the box at the right to get started."},
    {role: Role.BOT, content: "Good job, now hit Enter!"},
    {role: Role.BOT, content: "Now read the response of the AI on the right:"}
  ];

  const [ messages, setMessages ] = useState<Message[]>(tutorialSteps);
  const { inputData, submitted, updateSubmitted } = useInputContext();
  const [ currentStep, setCurrentStep ] = useState<number>(0);

  const changeStep = (change: number) => {
    let newStep = currentStep + change
    if (newStep < 0) {
      newStep = 0;
    } else if (newStep >= messages.length) {
      newStep = messages.length - 1;
    }

    setCurrentStep(newStep)
  }

  return (
    <div className={`flex-1 flex flex-col justify-between p-12 bg-green rounded-r-3xl`}>
      <TutorialMessageView
        messages={messages}
        currentStep={currentStep}
      />
      
      <div className={'flex-1 flex flex-row justify-between'}>
        <Button highlighted={false} onPress={() => changeStep(-1)}> Previous </Button>
        <Button highlighted={true} onPress={() => changeStep(1)}> Continue </Button>
      </div>
    </div>
  );
};

export default Tutorial;
