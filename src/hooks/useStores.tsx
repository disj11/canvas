import React from "react";
import {RootStore} from "../stores/RootStore";
import {StoreContext} from "../contexts/StoreContext";

export const useStores = (): RootStore => React.useContext(StoreContext);