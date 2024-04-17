import React, { createContext, useContext, useEffect, useState } from "react";

const UserSelectionContext = createContext();

export const UserSelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState({
    name: null,
    age: null,
    mask: null,
    face: null,
    voice: null,
  });

  useEffect(() => {
    const storedSelections = localStorage.getItem("userSelections");
    if (storedSelections) {
      setSelections(JSON.parse(storedSelections));
    }
  }, []);

  // Save selections to Local Storage on change
  useEffect(() => {
    localStorage.setItem("userSelections", JSON.stringify(selections));
  }, [selections]);

  const updateSelection = (type, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [type]: value,
    }));
  };

  return (
    <UserSelectionContext.Provider value={{ selections, updateSelection }}>
      {children}
    </UserSelectionContext.Provider>
  );
};

export const useUserSelection = () => useContext(UserSelectionContext);
