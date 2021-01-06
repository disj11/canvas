import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import PropBoxLayout from "./PropBoxLayout";
import { Range } from "../input";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
    propBox: {
        "& > div": {
            marginBottom: theme.spacing(3),
        }
    }
}))

const TextPropBox = observer(() => {
    const classes = useStyles();
    const { textStore } = useStores();

    return (
        <PropBoxLayout>
            <div className={classes.propBox}>
                <div>
                    <Range
                        label={"폰트 사이즈"}
                        value={textStore.fontSize}
                        onChange={(value: number) => textStore.setFontSize(value)}
                        prefix={"pt"}
                        min={8}
                    />
                </div>
            </div>
        </PropBoxLayout>
    )
})

export default TextPropBox;