import { useEffect, useState } from "react";

const TypingEffect: React.FC<{ inputText: string }> = ({ inputText }) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (index < inputText.length) {
                setText((prevText) => prevText + inputText[index]);
                setIndex((prevIndex) => prevIndex + 1);
            } else {
                setText('');
                setIndex(0);
            }
        }, 200);

        return () => clearInterval(typingInterval);
    }, [index, inputText]);

    return (
        <div>
            <span>{text}</span>
            <span className="blinking-cursor">|</span>
        </div>
    );
};

export default TypingEffect;
