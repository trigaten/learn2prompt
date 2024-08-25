import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onPress: () => void;
}

const Button = ({ children, onPress }: ButtonProps): ReactNode => {
    return (
        <button
            className={`px-4 py-2 rounded-3xl text-lg font-medium bg-white text-black`}
            onClick={onPress}
        >
            {children}
        </button>
    );
}

export default Button;