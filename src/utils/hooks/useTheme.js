import { useContext } from "react"
import { ThemeContext } from "../store/contextAPI/themeToggler/ThemeContextProvider"




const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;