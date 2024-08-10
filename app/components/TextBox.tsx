import { useInputContext } from './InputContext'; 

interface TextBoxProps {
    onSendMessage: (input: string) => void;
}

const TextBox = ( {onSendMessage}: TextBoxProps ) => {
    const { inputData, updateInputData, updateSubmitted, updateStringFound } = useInputContext();
    const tutorialString = "hello";

    const handleSubmit = () => {
        onSendMessage(inputData);
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
