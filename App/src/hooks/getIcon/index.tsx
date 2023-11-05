import {ImageSourcePropType} from "react-native/Libraries/Image/Image";

export default function getUrlImg(data: string | undefined): ImageSourcePropType {
    if (data == "Gmail")
        return (require("../../../assets/gmail_icon.png"));
    if (data == "Spotify")
        return (require("../../../assets/spotifyIcon.png"));
    if (data == "Google Calendar")
        return (require("../../../assets/googleCalendarIcon.png"));
    if (data == "Weather")
        return (require("../../../assets/weatherIcon.png"));
    if (data == "Down Detector")
        return (require("../../../assets/downDetectorIcon.png"));
    return (require("../../../assets/inconnuIcon.png"));
}
