'use client'

import { useRef, useEffect, ReactElement } from 'react';
import { Message, Role } from '../types';
import Image from 'next/image';
import pfp from '../images/pfp.jpg';

interface ChatMessageViewProps {
    messages: Message[];
}

const ChatMessageView = ( {messages}: ChatMessageViewProps ): ReactElement => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

      return (
        <div className="flex flex-col overflow-auto h-full mb-2 hide-scrollbar">
            {messages.map((message: Message, index: number) => (
                message.role === Role.USER ? (
                    <h1 key={index} className="font-medium self-end mb-5 text-lg bg-gray-100 rounded-3xl px-4 py-2"> 
                        {message.content} 
                    </h1>
                ) : (
                    <div key={index} className="flex items-start mb-5">
                        <div className="w-10 h-10 flex-shrink-0 mr-3 relative">
                            <Image 
                                src={pfp}
                                alt="AI Pfp"
                                layout="fill" 
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <h1 className="font-medium text-lg px-4 py-2 rounded-3xl flex-grow"> 
                            {message.content} 
                        </h1>
                    </div>
                )
            ))}
            <div ref={messagesEndRef} />   
        </div>    
    )
}

export default ChatMessageView;