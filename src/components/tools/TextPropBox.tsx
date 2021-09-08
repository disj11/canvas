import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import PropBoxLayout from "./PropBoxLayout";
import { AlignButton, ColorPicker, TextStyleButton } from "../input";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import { Box, FormControl, Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FontFaces, fontSizes } from "models/tools/Text";

const useStyles = makeStyles(theme => ({
    propBox: {
        "& > *": {
            marginBottom: theme.spacing(3),
        }
    }
}));

const TextPropBox = observer(() => {
    const classes = useStyles();
    const { textStore } = useStores();

    const handleFontSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const fontSize = parseInt(event.target.value as string, 10);
        textStore.setFontSize(fontSize);
    };

    const handleFontFamilyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const fontFamily = event.target.value as string;
        textStore.setFontFamily(fontFamily);
    };

    return (
        <PropBoxLayout>
            <div className={classes.propBox}>
                <div>
                    <FormControl fullWidth>
                        <Select
                            value={textStore.fontFamily}
                            onChange={handleFontFamilyChange}
                        >
                            {FontFaces.values().map(font => (
                                <MenuItem
                                    key={font.value}
                                    value={font.value}
                                    style={{
                                        fontFamily: font.value,
                                    }}
                                >
                                    {font.display}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Box display={"flex"}>
                        <Box flex={1} mr={1.5}>
                            <FormControl fullWidth>
                                <Select
                                    value={textStore.fontSize}
                                    onChange={handleFontSizeChange}
                                >
                                    <MenuItem value={textStore.fontSize}>{textStore.fontSize}</MenuItem>
                                    {fontSizes.map(fontSize => (
                                        textStore.fontSize !== fontSize && <MenuItem key={fontSize} value={fontSize}>{fontSize}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box flexBasis={35}>
                            <ColorPicker color={textStore.fill} onChange={(color) => textStore.setFill(color.hex)} />
                        </Box>
                    </Box>
                </div>
                <div>
                    <TextStyleButton
                        bold={textStore.isBold()}
                        italic={textStore.isItalic()}
                        underline={textStore.underline}
                        toggleBold={(bold) => textStore.setBold(bold)}
                        toggleItalic={(italic) => textStore.setItalic(italic)}
                        toggleUnderline={(underline) => textStore.setUnderline(underline)}
                    />
                </div>
                <div>
                    <AlignButton textAlign={textStore.textAlign} onChange={(textAlign) => textStore.setTextAlign(textAlign)} />
                </div>
            </div>
        </PropBoxLayout>
    )
})

export default TextPropBox;