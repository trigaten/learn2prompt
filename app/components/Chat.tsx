'use client';

import { Role, Message } from '../types';
import { ReactElement } from 'react';
import TextBox from './TextBox';
import ChatMessageView from './ChatMessageView';
import { useInputContext } from './InputContext';

const Chat = (): ReactElement => {
  const { chatMessages, updateChatMessages } = useInputContext(); 

  const handleSendMessage = async (input: string) => {
    if (input.trim()) {
      const userMessage: Message = { role: Role.USER, content: input };

      const messagesToSubmit = [...chatMessages, userMessage];
      updateChatMessages(userMessage)

      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messagesToSubmit })
        });

        const botMessage: Message = await response.json();
        updateChatMessages(botMessage);
      } catch (error) {
        console.log("Error in API Call");
      }
    }
  };

  return (
    <div className={"flex-1 flex flex-col justify-between py-12 px-12"}>
      <ChatMessageView
        messages={chatMessages}
      ></ChatMessageView>
      
      <TextBox
        onSendMessage={handleSendMessage}
      ></TextBox>
    </div>
  );
};

export default Chat;
