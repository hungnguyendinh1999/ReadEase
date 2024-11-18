import React, {FC, useEffect, useState} from 'react';

interface TypewriterProps {
    value: string;
    speed: number;
}

/**
 * Panel that display text with typing out animation
 * @author Khoa Nguyen
 *
 * @param value entire value to display
 * @param speed speed of the typing
 */
const Typerwriter: FC<TypewriterProps> = ({value, speed}) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        console.log(displayText);

        const step = Math.max(1, Math.ceil(10 / speed));
        let i = 0;
        setDisplayText("");
        const typingInterval = setInterval(() => {
            if (i < value.length) {
                setDisplayText(value.slice(0, i + step));
                i += step;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [value, speed]);

    return (
        <div className="custom-textbox" style={{width: "100%"}}>{displayText}</div>
    );
};

export default Typerwriter;
