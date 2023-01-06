import { useEffect } from "react";

function useOnOutSideClick(dropdownRef, handlerFunc) {
    useEffect(
        () => {
            const listner = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
                    // console.log(dropdownRef.current)
                    // console.log(event.target)
                    return;
                }
                // console.log(event.target)
                handlerFunc();
            }

            document.addEventListener("mousedown", listner);
            document.addEventListener("touchstart", listner)

            return () => {
                document.addEventListener("mousedown", listner);
                document.addEventListener("touchstart", listner)
            }
        }, []
    )
}

export default useOnOutSideClick;