'use client';

import { Message, Condition } from '../types';
import { useEffect, useState, ReactElement } from 'react';
import TutorialMessageView from './TutorialMessageView';
import { useInputContext } from './InputContext';
import Button from './Button';

const Tutorial = (): ReactElement => {
  const [continueStage, setContinueStage] = useState<boolean>(false);
  const { inputData, submitted, updateSubmitted, updateBlockResponse, 
    handleReceiveMessage, currentStage, updateCurrentStage } = useInputContext();
  const [botMessages, setBotMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!!currentStage) {
      setBotMessages(currentStage.messages);
    }
  }, [currentStage]);

  useEffect(() => {    
    if (!!currentStage?.condition) {
      switch (currentStage.condition) {
        case Condition.FIND_STRING:
          if (!!currentStage.string && inputData.includes(currentStage.string)) {
            updateCurrentStage();
          }
        case Condition.PRESS_ENTER:
          if (submitted) {
            updateSubmitted(!submitted);
            updateCurrentStage();
          }
        case Condition.CONTINUE_BUTTON:
          updateBlockResponse(true);
          if (continueStage) {
            setContinueStage(false);
            updateBlockResponse(false);
            handleReceiveMessage();
            updateCurrentStage();
          }
      }
    }
  }, [currentStage, inputData, submitted, continueStage]);

  return (
    <div className={`flex-1 flex flex-col justify-between p-12 bg-green rounded-r-3xl`}>
      <TutorialMessageView messages={botMessages} />

      {currentStage?.condition === Condition.CONTINUE_BUTTON && (
        <div className={'flex-1 flex flex-row justify-end'}>
          <Button onPress={() => setContinueStage(true)}> Continue </ Button>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
