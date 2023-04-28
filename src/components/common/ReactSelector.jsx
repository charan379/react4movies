import React from 'react';
import Select from "react-select";
import useTheme from 'hooks/useTheme';

// Component for a customizable select dropdown using react-select library
const ReactSelector = ({ options, handleSelectChange, selectedOption, name }) => {
    const { theme } = useTheme(); // Get current theme from custom hook useTheme

    // Define custom styles for the select dropdown using object literals
    const styles = {
        // Style for each option in the dropdown
        option: (defaultStyles, { isSelected, isFocused }) => ({
            ...defaultStyles,
            // If an option is selected, apply different color depending on the theme
            // If an option is focused (hovered), apply white color on light theme and black color on dark theme
            // If not selected and not focused, apply different color depending on the theme
            color: isSelected ? (theme === "light" ? "#c8d9ec" : "#020d1a") : (isFocused ? "#FFFFFF" : (theme === "light" ? "#020d1a" : "#c8d9ec")),
            // If an option is selected, apply different background color depending on the theme
            // If an option is focused (hovered), apply blue color on light theme and light blue color on dark theme
            // If not selected and not focused, apply different background color depending on the theme
            backgroundColor: isSelected ? (theme === "light" ? "#020d1a" : "#c8d9ec") : (isFocused ? "#3498db" : (theme === "light" ? "#c8d9ec" : "#020d1a")),
            cursor: "pointer",
        }),

        // Style for the control (container) of the select dropdown
        control: (defaultStyles) => ({
            ...defaultStyles,
            // Apply different background color depending on the theme
            backgroundColor: theme === "light" ? "#c8d9ec" : "#22303c",
            cursor: "pointer",
            border: "none",
            boxShadow: "none",
        }),

        // Style for the selected option in the select dropdown
        singleValue: (defaultStyles) => ({
            ...defaultStyles,
            // Apply different color depending on the theme
            color: theme === "light" ? "#020d1a" : "#c8d9ec",
            cursor: "pointer",
        }),

        // Style for the input element in the select dropdown
        input: (defaultStyles) => ({
            ...defaultStyles,
            // Apply different color depending on the theme
            color: theme === "light" ? "#020d1a" : "#c8d9ec",
            cursor: "pointer",
        }),
    };

    // Render the select dropdown with the custom styles and passed props
    return (
        <Select
            name={name}
            styles={styles}
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            isSearchable
            placeholder="Search..."
        />
    );
};

export { ReactSelector }; // Export the ReactSelector component for reuse