import { useEffect } from "react";

/**
 * Custom hook to catch Ctrl + Key
 */
const useCtrlPlusKey = (
    key,
    callbackFunc,
    refToFocus = null,
    reloadTrue = false
) => {
    useEffect(() => {
        // check if the key is "key" with ctrl key
        const keyDown = (event) => {
            if (event.key === key && (event.ctrlKey || event.metaKey)) {
                // prevent the browser from opening the save dialog
                event.preventDefault();

                // call our callbackFunc method
                callbackFunc();

                if (refToFocus) {
                    setTimeout(() => {
                        refToFocus?.current.focus();
                    }, 50);
                }

                if (reloadTrue) {
                    window.location.reload();
                }
            }
        };

        // listen to keydown events
        document.addEventListener("keydown", keyDown);

        // stop listening on component destory
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });
};
export { useCtrlPlusKey };
