'use client';

import { Role, Message } from '../types';
import { ReactElement } from 'react';
import TextBox from './TextBox';
import ChatMessageView from './ChatMessageView';
import { useInputContext } from './InputContext';
import Button from './Button';

const Chat = (): ReactElement => {
  const { chatMessages } = useInputContext(); 

  return (
    <div className={"flex-1 flex flex-col justify-between py-12 px-12"}>
      <ChatMessageView
        messages={chatMessages}
      ></ChatMessageView>
      
      <TextBox></TextBox> <Button onPress={() => alert('thank you!')}>Feedback</Button>
    </div>
  );
};

export default Chat;
