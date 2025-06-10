import { useState } from "react";
import { SearchContext } from "../context";

const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    prompt: "",
    height: 1024,
    width: 1024,
    seed: 1234,
    model: "",
  });
  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
