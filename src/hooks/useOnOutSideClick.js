import { useEffect } from "react";

function useOnOutSideClick(ref, handlerFunc) {
  useEffect(() => {
    const listner = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handlerFunc();
    };
    // listen to mousedown, touchstart events
    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);

    // stop listening when component unmounts
    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [ref, handlerFunc]);
}

export { useOnOutSideClick };
