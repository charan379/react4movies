import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Home";
const KEY_EVENT_TYPE = "keyup";

function useHomeKey(handleOpen) {
  const handleHomeKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC) {
        handleOpen();
      }
    },
    [handleOpen]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleHomeKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleHomeKey, false);
    };
  }, [handleHomeKey]);
}

export { useHomeKey };
