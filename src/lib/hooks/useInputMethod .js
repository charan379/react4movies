import React, { useEffect, useState } from 'react';

export function useInputMethod() {
    const [inputMethod, setInputMethod] = useState('');

    useEffect(() => {
        const handleInputMethod = (event) => {
            const { type } = event;

            console.log(type)
            if (type.startsWith('mouse')) {
                setInputMethod('Mouse');
            } else if (type.startsWith('touch')) {
                setInputMethod('Touch');
            } else if (type.startsWith('key')) {
                setInputMethod('Keyboard');
            }
        };

        window.addEventListener('mousedown', handleInputMethod);
        window.addEventListener('touchstart', handleInputMethod);
        window.addEventListener('keydown', handleInputMethod);

        return () => {
            window.removeEventListener('mousedown', handleInputMethod);
            window.removeEventListener('touchstart', handleInputMethod);
            window.removeEventListener('keydown', handleInputMethod);
        };
    }, []);

    return { inputMethod };
};