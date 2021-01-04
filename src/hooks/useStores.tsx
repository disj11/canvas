import React from "react";
import {RootStore} from "../stores/rootStore";
import {StoreContext} from "../contexts/storeContext";

export const useStores = (): RootStore => React.useContext(StoreContext);