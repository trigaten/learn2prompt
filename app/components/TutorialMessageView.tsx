'use client'

import { useRef, useEffect, ReactElement } from 'react';
import { Message } from '../types';

interface TutorialMessageViewProps {
    messages: Message[];
}

const TutorialMessageView = ( {messages}: TutorialMessageViewProps ): ReactElement => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

      return (
        <div className="flex flex-col overflow-auto h-full mb-2 hide-scrollbar items-start">
            {messages.map((message: Message, index: number) => (
                <h1 key={index} className={`mb-5 text-2xl rounded-3xl px-4 py-2 font-sans font-medium text-white`}> 
                    {message.content} 
                </h1>
            ))}
            <div ref={messagesEndRef} />   
        </div>    
    )
}

export default TutorialMessageView;