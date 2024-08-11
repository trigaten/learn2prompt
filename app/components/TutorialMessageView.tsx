import { ReactElement } from 'react';
import { Message } from '../types';

interface TutorialMessageViewProps {
    message: Message;
}

const TutorialMessageView = ({ message }: TutorialMessageViewProps): ReactElement => {
    return (
        <div className="flex-1 flex items-center justify-center p-12 bg-green rounded-r-3xl">
            <h1 className="text-center mb-5 text-2xl px-4 py-2 font-sans font-medium text-white">
                {message.content}
            </h1>
        </div>
    );
}

export default TutorialMessageView;
