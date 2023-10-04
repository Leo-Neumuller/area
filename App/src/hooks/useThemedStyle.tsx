import useTheme from "./useTheme";
import {ThemeContextType} from "../constants/Theme";

export default function useThemedStyles<T>(styles: (theme: ThemeContextType) => T) {
    const theme = useTheme();
    return styles(theme);
}