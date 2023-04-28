import React from "react";
import useTheme from "../../hooks/useTheme";

const ToogleTheme = ({ className, children }) => {
  const { theme, setTheme } = useTheme();
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

export { ToogleTheme };
