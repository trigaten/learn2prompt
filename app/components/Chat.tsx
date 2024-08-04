'use client';

import { Role, Message } from '../page';
import { useState, ReactElement } from 'react';
import TextBox from './TextBox';
import ChatMessageView from './ChatMessageView';

const Chat = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (input: string) => {
    if (input.trim()) {
      const userMessage: Message = { role: Role.USER, content: input };

      const messagesToSubmit = [...messages, userMessage];
      setMessages(messagesToSubmit)

      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messagesToSubmit })
        });

        const botMessage: Message = await response.json();
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.log("Error in API Call");
      }
    }
  };

  return (
    <div className={"flex-1 flex flex-col justify-between py-12 px-20"}>
      <ChatMessageView
        messages={messages}
      ></ChatMessageView>
      
      <TextBox
        onSendMessage={handleSendMessage}
      ></TextBox>
    </div>
  );
};

export default Chat;