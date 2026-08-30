import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem("account");

    if (savedAccount) {
      try {
        return JSON.parse(savedAccount);
      } catch (error) {
        console.error("Invalid saved account:", error);
        localStorage.removeItem("account");
      }
    }

    return null;
  });

  const handleSetAccount = (user) => {
    setAccount(user);

    if (user) {
      localStorage.setItem(
        "account",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("account");
    }
  };

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount: handleSetAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;