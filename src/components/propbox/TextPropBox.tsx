import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import PropBoxLayout from "./PropBoxLayout";
import { AlignButton, ColorPicker, TextStyleButton } from "../input";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import {Box, FormControl, Select, SelectChangeEvent} from "@mui/material";
import { MenuItem } from "@mui/material";
import { FontFaces, fontSizes } from "models/tools/Text";
import PropBoxItem from "./PropBoxItem";

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

    const handleFontSizeChange = (event: SelectChangeEvent) => {
        const fontSize = parseInt(event.target.value, 10);
        textStore.setFontSize(fontSize);
    };

    const handleFontFamilyChange = (event: SelectChangeEvent) => {
        const fontFamily = event.target.value;
        textStore.setFontFamily(fontFamily);
    };

    return (
        <PropBoxLayout>
            <div className={classes.propBox}>
                <PropBoxItem label={"폰트"}>
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
                </PropBoxItem>
                <PropBoxItem label={"폰트 크기"}>
                    <Box display={"flex"}>
                        <Box flex={1} mr={1.5}>
                            <FormControl fullWidth>
                                <Select
                                    value={textStore.fontSize.toString()}
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
                </PropBoxItem>
                <PropBoxItem label={"폰트 스타일"}>
                    <TextStyleButton
                        bold={textStore.isBold()}
                        italic={textStore.isItalic()}
                        underline={textStore.underline}
                        toggleBold={(bold) => textStore.setBold(bold)}
                        toggleItalic={(italic) => textStore.setItalic(italic)}
                        toggleUnderline={(underline) => textStore.setUnderline(underline)}
                    />
                </PropBoxItem>
                <PropBoxItem label={"정렬"}>
                    <AlignButton textAlign={textStore.textAlign} onChange={(textAlign) => textStore.setTextAlign(textAlign)} />
                </PropBoxItem>
            </div>
        </PropBoxLayout>
    )
})

export default TextPropBox;