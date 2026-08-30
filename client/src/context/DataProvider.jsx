import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    try {
      const savedAccount = localStorage.getItem("quickcart_account");

      return savedAccount
        ? JSON.parse(savedAccount)
        : "";
    } catch (error) {
      console.error("Account restore error:", error);
      return "";
    }
  });

  const updateAccount = (user) => {
    setAccount(user);

    if (user) {
      localStorage.setItem(
        "quickcart_account",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("quickcart_account");
    }
  };

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount: updateAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;