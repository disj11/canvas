import React from "react";
import {FabricContext, FabricContextModel} from "../contexts/FabricContext";

export const useFabric = (): FabricContextModel => React.useContext(FabricContext);