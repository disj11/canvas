import React from "react";
import {RootStore} from "../stores/RootStore";

const rootStore = new RootStore();
export const StoreContext = React.createContext<RootStore>(rootStore);
export const StoreContextProvider = ({children}: StoreProviderProps) => {
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    )
}

interface StoreProviderProps {
    children: JSX.Element;
}