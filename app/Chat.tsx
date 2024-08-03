'use client';

import { Sender, Message } from './page';
import { useState, useEffect, useRef } from 'react';

interface ChatProps {
  starter: Sender;
  color?: string;
}

const Chat = ({ starter, color }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: Message = { sender: Sender.USER, text: input };
      const botMessage: Message = { sender: Sender.BOT, text: 'How can I help you?' };

      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
      setInput("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`flex-1 flex flex-col justify-between p-3 ${color ? 'bg-gray-200' : ''}`}>
      <div className="flex flex-col overflow-auto h-full mb-2 hide-scrollbar">
        {messages.map((message: Message, index: number) => (
          <h1 key={index} className={`${message.sender === starter ? 'self-end' : ''} mb-3`}>
            {message.text}
          </h1>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="w-full text-center" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        <input
          className="border-2 border-black w-full h-10"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="hidden">Send</button>
      </form>
    </div>
  );
};

export default Chat;
