import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userId, setUserId] = useState("");

    return (
        <DataContext.Provider
            value={{
                account,
                setAccount,
                userId,
                setUserId,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;