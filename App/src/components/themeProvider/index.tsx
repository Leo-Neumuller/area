import React, {useState} from 'react';
import ConstantTheme, {ThemeName} from "../../constants/Theme";
export const ThemeContext = React.createContext({
    Default: ConstantTheme["Default"],
});

type Props = {
    children: React.ReactNode;
}

export default function ThemeProvider({ children } : Props) {
    const [theme, setTheme] = useState<ThemeName>('Light');

    const Theme   = {
        ...ConstantTheme[theme],
        Default: ConstantTheme["Default"],
        setTheme: (theme: ThemeName) => setTheme(theme)
    }

    return (
        <ThemeContext.Provider value={Theme}>
            {children}
        </ThemeContext.Provider>
    )
}
