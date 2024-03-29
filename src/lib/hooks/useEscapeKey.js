import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

function useEscapeKey(callbackFunc) {
    const handleEscKey = useCallback(
        (event) => {
            if (event.key === KEY_NAME_ESC) {
                callbackFunc();
            }
        },
        [callbackFunc]
    );

    useEffect(() => {

        // listen to esc_key events
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);


        // stop listening when component unmounts
        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}

export { useEscapeKey };
