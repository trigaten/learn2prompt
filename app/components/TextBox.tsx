'use client'

import { useInputContext } from './InputContext'; 
import { Role, Message } from '../types';

const TextBox = () => {
    const { inputData, updateInputData, chatMessages, handleSendMessage, handleReceiveMessage, updateStringFound, blockResponse } = useInputContext();
    const tutorialString = "hello";

    const handleSubmit = () => {
        const userMessage: Message = { role: Role.USER, content: inputData.trim() };
        const messagesToSubmit = [...chatMessages, userMessage];
        handleSendMessage(userMessage);

        if (!blockResponse) {
            handleReceiveMessage(messagesToSubmit);            
        }

        updateInputData("");
    };

    const handleChange = (newInput: string) => {
        updateInputData(newInput);
        if (newInput.includes(tutorialString)) {
            updateStringFound(true)
        }
    };

    return (
        <form className="w-full text-center px-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <input
                className="bg-gray-100 w-full h-10 text-lg px-6 font-medium rounded-2xl"
                type="text"
                placeholder='Type Here'
                value={inputData}
                onChange={(e) => handleChange(e.target.value)}
                />
            <button type="submit" className="hidden">Send</button>
        </form>
    );
}

export default TextBox;
