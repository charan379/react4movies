import React from 'react'
import Select from "react-select";
import useTheme from '../../../utils/hooks/useTheme';


const ReactSelector = ({ options, handleSelectChange, selectedOption, name }) => {

    const { theme } = useTheme();

    const customStyles = {

        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: theme === "light" && state.isSelected
                ? "#DDDDDD"
                : theme === "dark" && state.isSelected
                    ? "#383838"
                    : theme === "light" && state.isFocused
                        ? "#FFFF"
                        : theme === "dark" && state.isFocused
                            ? '#FFFF'
                            : theme === "light"
                                ? "#383838"
                                : "#DDDDDD",

            backgroundColor: theme === "light" && state.isSelected
                ? "#383838"
                : theme === "dark" && state.isSelected
                    ? "#DDDDDD"
                    : theme === "light" && state.isFocused
                        ? "#3498db"
                        : theme === "dark" && state.isFocused
                            ? '#3498db'
                            : theme === "light"
                                ? "#DDDDDD"
                                : "#383838",
            cursor: "pointer",

        }),

        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: theme === "light" ? "#DDDDDD" : "#333333",
            cursor: "pointer",
            border: "none",
            boxShadow: "none",
        }),

        singleValue: (defaultStyles) => ({ ...defaultStyles, color: theme === "light" ? "#383838" : "#DDDDDD", cursor: "pointer", }),

        input: (defaultStyles) => ({ ...defaultStyles, color: theme === "light" ? "#383838" : "#DDDDDD", cursor: "pointer", }),

    }


    return (
        <>
            <Select
                name={name}
                styles={customStyles}
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                isSearchable={true}
                placeholder="Search..."
            />
        </>
    )
}

export default ReactSelector;