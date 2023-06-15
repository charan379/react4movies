import { useEffect } from "react";

function useOnOutSideClick(ref, callbackFunc, executeOnlyOnTouchDevices = false) {

    useEffect(() => {
        const listner = (event) => {

            // do nothing if event type is not 'touchstart' and executeOnlyOnTouchDevices is true
            if (event?.type !== 'touchstart' && executeOnlyOnTouchDevices) {
                return;
            }

            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callbackFunc();
        };
        // listen to mousedown, touchstart events
        document.addEventListener("mousedown", listner);
        document.addEventListener("touchstart", listner);

        // stop listening when component unmounts
        return () => {
            document.removeEventListener("mousedown", listner);
            document.removeEventListener("touchstart", listner);
        };
    }, [ref, callbackFunc]);
}

export { useOnOutSideClick };
