import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Home";
const KEY_EVENT_TYPE = "keyup";

function useHomeKey(handleFunc) {
  const handleHomeKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC) {
        handleFunc();
      }
    },
    [handleFunc]
  );

  useEffect(() => {
    // listen to Home events
    document.addEventListener(KEY_EVENT_TYPE, handleHomeKey, false);

    // stop listening when component unmounts
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleHomeKey, false);
    };
  }, [handleHomeKey]);
}

export { useHomeKey };
