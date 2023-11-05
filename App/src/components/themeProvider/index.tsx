import React, {useState} from 'react';
import ConstantTheme, {ThemeName} from "../../constants/Theme";

/**
 * Theme context.
 * @type {React.Context<{setTheme: (theme: ThemeName) => void}>} theme context.
 * @constructor
 */
export const ThemeContext = React.createContext({
    ...ConstantTheme["Light"],
    Default: ConstantTheme["Default"],
    setTheme: (theme: ThemeName) => {}
});

type Props = {
    children: React.ReactNode;
}

/**
 * Theme provider.
 * @param children children of the component.
 * @constructor
 */
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
