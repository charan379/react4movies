import React from "react";
import useTheme from "../../../hooks/useTheme";

const ToogleTheme = ({ className, children }) => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const changeTheme = (event) => {
    event.preventDefault();
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  document.body.setAttribute("class", theme);
  return (
    <div className={className} onClick={changeTheme}>
      {children}
    </div>
  );
};

export default ToogleTheme;
