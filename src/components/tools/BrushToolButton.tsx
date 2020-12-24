import React from "react";
import ToolButton from "./ToolButton";
import BrushIcon from "@material-ui/icons/Brush";

const BrushToolButton = () => {
    return (
        <ToolButton icon={<BrushIcon/>} text={"브러쉬"} onClick={() => console.log("click")}/>
    )
}

export default BrushToolButton;