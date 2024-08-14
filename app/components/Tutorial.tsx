'use client';

import { Message, Role } from '../types';
import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import TutorialMessageView from './TutorialMessageView';
import { useInputContext } from './InputContext';
import Button from './Button';

enum condition {
  FIND_STRING = "FIND_STRING",
  PRESS_ENTER = "PRESS_ENTER",
  CONTINUE_BUTTON = "CONTINUE_BUTTON"
}

interface TutorialStage {
  messages: Message[],
  condition: condition 
  string?: string
}

const firstStage: TutorialStage = {
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
  condition: condition.FIND_STRING,
  string: "hello"
}

const secondStage: TutorialStage = {
  messages: [
    {
      role: Role.BOT, 
      content: 'Good job, now hit enter to send the message to an AI.'
    }
  ],
  condition: condition.PRESS_ENTER
}

const thirdStage: TutorialStage = {
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
  condition: condition.CONTINUE_BUTTON
}

const stages: TutorialStage[] = [firstStage, secondStage, thirdStage];

const Tutorial = (): ReactElement => {
  const [stage, setStage] = useState<number>(0);
  const [botMessages, setBotMessages] = useState<Message[]>(firstStage.messages);
  const [continueStage, setContinueStage] = useState<boolean>(false);
  const { inputData, submitted, updateSubmitted, blockResponse, updateBlockResponse, 
    handleReceiveMessage } = useInputContext();

  useEffect(() => {
    if (stage >= stages.length) return;
    setBotMessages(stages[stage].messages);
  }, [stage]);

  useEffect(() => {
    const currentStage = stages[stage];
    
    if (!!currentStage?.condition) {
      switch (currentStage.condition) {
        case condition.FIND_STRING:
          if (!!currentStage.string && inputData.includes(currentStage.string)) {
            setStage(prev => prev + 1);
          }
        case condition.PRESS_ENTER:
          if (submitted) {
            updateSubmitted(!submitted);
            setStage(prev => prev + 1);
          }
        case condition.CONTINUE_BUTTON:
          updateBlockResponse(true);
          if (continueStage) {
            setContinueStage(false);
            updateBlockResponse(false);
            handleReceiveMessage();
            setStage(prev => prev + 1);
          }
      }
    }
  }, [stages, stage, inputData, submitted, continueStage]);

  return (
    <div className={`flex-1 flex flex-col justify-between p-12 bg-green rounded-r-3xl`}>
      <TutorialMessageView messages={botMessages} />

      {stages[stage]?.condition === condition.CONTINUE_BUTTON && (
        <div className={'flex-1 flex flex-row justify-end'}>
          <Button onPress={() => setContinueStage(true)}> Continue </ Button>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
