import { ReactNode } from "react";

interface ButtonProps {
    highlighted: boolean;
    children: ReactNode;
    onPress: () => void;
}

const Button = ( {highlighted, children, onPress}: ButtonProps ) => {
    const colors = highlighted ? 'bg-white text-black' : 'bg-light-green text-white';

    return (
        <button 
            className={`px-4 py-2 rounded-3xl text-lg font-medium ${colors}`}
            onClick={onPress}
        >
            {children}
        </button>
    );
}

export default Button;