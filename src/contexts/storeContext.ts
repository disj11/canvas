import React from "react";
import { RootStore } from "stores/rootStore";

export const StoreContext = React.createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;