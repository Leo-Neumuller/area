import useTheme from "../useTheme";
import {ThemeTypeContext} from "../../../constants/Theme";

export default function useThemedStyles<T>(styles: (theme: ThemeTypeContext) => T) {
    const theme = useTheme();
    return styles(theme);
}