import React, { useEffect, useState } from 'react';

export function useIsTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const handleInputMethod = (event) => {
            const { type } = event;

            if (type === 'touchstart') {
                setIsTouchDevice(true)
            } else {
                setIsTouchDevice(false)
            }

        };

        window.addEventListener('touchstart', handleInputMethod);

        return () => {
            window.removeEventListener('touchstart', handleInputMethod);
        };
    }, []);

    return { isTouchDevice };
};