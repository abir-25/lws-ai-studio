import { useState } from "react";
import { PageContext } from "../context";

const PageProvider = ({ children }) => {
  const [route, setRoute] = useState("create");
  return (
    <PageContext.Provider value={{ route, setRoute }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
