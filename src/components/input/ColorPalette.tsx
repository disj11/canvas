import {ColorResult, TwitterPicker} from "react-color"
import ColorPicker from "./ColorPicker";

interface Props {
    color: string,
    disableAlpha?: boolean,
    onChange: (color: ColorResult) => void;
}

const ColorPalette = (props: Props) => {
    return (
        <div>
            <ColorPicker {...props}/>
            <TwitterPicker width={"100%"} color={props.color} onChangeComplete={props.onChange}/>
        </div>
    )
}

export default ColorPalette;