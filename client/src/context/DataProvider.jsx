import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState(() => {
        const savedUser = localStorage.getItem("quickcart_user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (account) {
            localStorage.setItem(
                "quickcart_user",
                JSON.stringify(account)
            );
        } else {
            localStorage.removeItem("quickcart_user");
        }
    }, [account]);

    return (
        <DataContext.Provider
            value={{
                account,
                setAccount,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;