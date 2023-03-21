import { useEffect } from "react";

function useOnOutSideClick(ref, handlerFunc) {
  useEffect(() => {
    const listner = (event) => {
    //   console.log(ref.current);
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        // console.log(event.target)
        // console.log(ref.current)
        if (ref.current) {
          if (ref.current.contains(event.target) & (event.key === "Escape")) {
            handlerFunc();
          }
        }
        return;
      }
      // console.log(event.target)
      // console.log(ref.current)
      handlerFunc();
    };

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);
    document.onkeydown = function (event) {
      if (event.key === "Escape") {
        listner(event);
      }
    };

    return () => {
        document.addEventListener("mousedown", listner);
        document.addEventListener("touchstart", listner);
    };
  }, [ref, handlerFunc]);
}

export default useOnOutSideClick;
