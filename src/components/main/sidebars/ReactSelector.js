import React from 'react'
import Select from "react-select";
import useTheme from '../../../utils/hooks/useTheme';


const ReactSelector = ({ options, handleSelectChange, selectedOption, name }) => {

    const { theme } = useTheme();

    const customStyles = {

        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: theme === "light" && state.isSelected
                ? "#c8d9ec"
                : theme === "dark" && state.isSelected
                    ? "#020d1a"
                    : theme === "light" && state.isFocused
                        ? "#FFFFFF"
                        : theme === "dark" && state.isFocused
                            ? '#FFFFFF'
                            : theme === "light"
                                ? "#020d1a"
                                : "#c8d9ec",

            backgroundColor: theme === "light" && state.isSelected
                ? "#020d1a"
                : theme === "dark" && state.isSelected
                    ? "#c8d9ec"
                    : theme === "light" && state.isFocused
                        ? "#3498db"
                        : theme === "dark" && state.isFocused
                            ? '#3498db'
                            : theme === "light"
                                ? "#c8d9ec"
                                : "#020d1a",
            cursor: "pointer",

        }),

        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: theme === "light" ? "#c8d9ec" : "#22303c",
            cursor: "pointer",
            border: "none",
            boxShadow: "none",
        }),

        singleValue: (defaultStyles) => ({ ...defaultStyles, color: theme === "light" ? "#020d1a" : "#c8d9ec", cursor: "pointer", }),

        input: (defaultStyles) => ({ ...defaultStyles, color: theme === "light" ? "#020d1a" : "#c8d9ec", cursor: "pointer", }),

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