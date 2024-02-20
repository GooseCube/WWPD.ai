// https://blog.logrocket.com/3-ways-implement-typing-animation-react/

// delay between characters is in milliseconds, can adjust as we see fit
// currently around 20-30 seconds seems to give a good balance

import React, { useState, useEffect } from 'react';

const TypeWriter = ({text, delay}) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text?.length) {
            //if there is still text to append, set a timeout to append the next character to currentText
            //after the specified delay amount, append text, move to next character, repeat.
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    //this returns a <pre> right now, but it can return a <div>, <h1>, really anything.
    return <pre>{currentText}</pre>
};

export default TypeWriter;