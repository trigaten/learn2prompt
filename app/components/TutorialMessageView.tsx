'use client'

import { useRef, useEffect, ReactElement } from 'react';
import { Message, Role } from '../page';

interface TutorialMessageViewProps {
    messages: Message[];
    currentStep: number;
}

const TutorialMessageView = ( {messages, currentStep}: TutorialMessageViewProps ): ReactElement => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

      return (
        <div className="flex flex-col overflow-auto h-full mb-2 hide-scrollbar items-start">
            {messages.map((message: Message, index: number) => (
                <h1 key={index} className={`mb-5 text-2xl rounded-3xl px-4 py-2 font-sans font-medium ${currentStep === index ? 'text-white' : 'text-light-green'}`}> 
                    {message.content} 
                </h1>
            ))}
            <div ref={messagesEndRef} />   
        </div>    
    )
}

export default TutorialMessageView;