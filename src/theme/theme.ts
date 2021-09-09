import {createTheme, ThemeOptions} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

export const paletteColorsDark = {
    primary: "#0f4c75",
    secondary: "#3282b8",
    error: "#E44C65",
    background: "#1b262c",
    text: "#bbe1fa",
};

export const paletteColorsLight = {
    primary: "#B980F0",
    secondary: "#FE9898",
    error: red.A400,
    background: "#f9f9f9",
    text: "#050505",
};

const options = (dark: boolean): ThemeOptions => {
    const paletteColors = dark ? paletteColorsDark : paletteColorsLight;
    return {
        palette: {
            type: dark ? "dark" : "light",
            primary: {
                main: paletteColors.primary,
            },
            secondary: {
                main: paletteColors.secondary,
            },
            error: {
                main: paletteColors.error,
            },
            background: {
                default: paletteColors.background,
            },
            text: {
                primary: paletteColors.text,
            },
        },
    };
};

export const darkTheme = createTheme(options(true));
export const lightTheme = createTheme(options(false));

export default lightTheme;
