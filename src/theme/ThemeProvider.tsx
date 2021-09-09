import React, {useCallback, useEffect, useState} from "react";
import {MuiThemeProvider, Theme} from "@material-ui/core";

import {darkTheme, lightTheme} from "./theme";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ToggleThemeContext = React.createContext({
    toggleTheme: () => {
        console.log();
    },
    isDark: false,
});

type SelectedTheme = {
    themeName: string;
    appliedTheme: Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}: ThemeProviderProps) => {
    const [selectedTheme, setSelectedTheme] = useState<SelectedTheme>({
        appliedTheme: lightTheme,
        themeName: "lightTheme",
    });

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme && theme === "lightTheme") {
            setSelectedTheme({
                appliedTheme: lightTheme,
                themeName: "lightTheme",
            });
        }
    }, []);

    const toggleTheme = useCallback(() => {
        if (!selectedTheme || selectedTheme.themeName === "darkTheme") {
            setSelectedTheme({
                appliedTheme: lightTheme,
                themeName: "lightTheme",
            });
            localStorage.setItem("theme", "lightTheme");
        } else {
            setSelectedTheme({
                appliedTheme: darkTheme,
                themeName: "darkTheme",
            });
            localStorage.setItem("theme", "darkTheme");
        }
    }, [selectedTheme, setSelectedTheme]);

    return (
        <ToggleThemeContext.Provider
            value={{
                toggleTheme,
                isDark: selectedTheme.themeName !== "lightTheme",
            }}
        >
            <MuiThemeProvider theme={selectedTheme.appliedTheme}>{children}</MuiThemeProvider>
        </ToggleThemeContext.Provider>
    );
};

export default ThemeProvider;
