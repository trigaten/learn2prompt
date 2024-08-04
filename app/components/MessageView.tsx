'use client'

import { useRef, useEffect, ReactElement } from 'react';
import { Message, Role } from '../page';

interface MessageViewProps {
    messages: Message[];
}

const MessageView = ( {messages}: MessageViewProps ): ReactElement => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

    return (
        <div className="flex flex-col overflow-auto h-full mb-2 hide-scrollbar">
            {messages.map((message: Message, index: number) => (
                <h1 key={index} className={`${message.role === Role.USER ? 'self-end' : ''} mb-5 text-3xl`}>
                {message.content}
                </h1>
            ))}
            <div ref={messagesEndRef} />   
        </div>
    )
}

export default MessageView;