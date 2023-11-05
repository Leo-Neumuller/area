import useTheme from "../useTheme";
import {ThemeTypeContext} from "../../../constants/Theme";

/**
 * Function to return the current theme with context.
 * @param styles The styles to apply to the theme
 * @returns {ThemeTypeContext} The current theme with context.
 */
export default function useThemedStyles<T>(styles: (theme: ThemeTypeContext) => T) {
    const theme = useTheme();
    return styles(theme);
}