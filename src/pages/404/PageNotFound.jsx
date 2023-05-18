import React from "react";
import { useTheme } from "hooks";
import { Head } from "layout";

const PageNotFound = () => {
  const { theme } = useTheme();
  return (
    <>
      <Head title={`404 Page Not Found`} />
      <div className={`error-message ${theme}`}>Page Not Found</div>
    </>
  );
};

export { PageNotFound };
