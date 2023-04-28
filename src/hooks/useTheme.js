import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContextProvider"


const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;