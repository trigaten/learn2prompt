import { ReactNode } from "react";

interface ButtonProps {
    highlighted: boolean;
    children: ReactNode;
    onPress: () => void;
}

const Button = ( {highlighted, children, onPress}: ButtonProps ) => {
    return (
        <button 
            className={`px-4 py-2 rounded-3xl text-lg font-medium ${highlighted ? 'bg-white text-black' : 'bg-light-green text-white'}`}
            onClick={onPress}
        >
            {children}
        </button>
    );
}

export default Button;