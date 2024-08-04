import { useInputContext } from './InputContext'; 

interface TextBoxProps {
    onSendMessage: (input: string) => void;
}

const TextBox = ( {onSendMessage}: TextBoxProps ) => {
    const { inputData, updateInputData, updateSubmitted } = useInputContext();

    const handleSubmit = () => {
        onSendMessage(inputData);
        updateInputData("");
        updateSubmitted(true);
    };

    const handleChange = (newInput: string) => {
        updateInputData(newInput);
        updateSubmitted(false);
    };

    return (
        <form className="w-full text-center" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <input
                className="border-2 border-black w-full h-10 text-3xl"
                type="text"
                value={inputData}
                onChange={(e) => handleChange(e.target.value)}
                />
            <button type="submit" className="hidden">Send</button>
        </form>
    );
}

export default TextBox;
