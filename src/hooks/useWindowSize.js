import { useEffect, useState } from "react";
import { debounce } from "lodash";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

export function useWindowSize(delay = 0) {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        const debouncedHandleResize = debounce(handleResize, delay);
        // listen to resize events
        window.addEventListener("resize", debouncedHandleResize);

        // stop listening when component unmounts
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        }
    }, [delay]);

    return windowDimensions;
}