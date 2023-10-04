import FluxSvg from "../../assets/logos_flux.svg";
import DashboardSvg from "../../assets/material-symbols_dashboard.svg"
import AppSvg from "../../assets/tdesign_app.svg"
import ProfileSvg from "../../assets/iconamoon_profile-fill.svg"
import { View, Text } from "react-native";

export const Tmp: React.FC = () => {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>test</Text>
      </View>
    )
  }
  
  export const Tmp2: React.FC = () => {
      return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>test2</Text>
      </View>
    )
}
export const bottomBarList: { name: string, navigationComponent: React.ComponentType, iconSVG: () => React.ReactNode }[]
= [{name: "Accueil", navigationComponent: Tmp, iconSVG: DashboardSvg},
  {name: "Flux", navigationComponent: Tmp2, iconSVG: FluxSvg},
  {name: "App", navigationComponent: Tmp, iconSVG: AppSvg},
  {name: "Profile", navigationComponent: Tmp2, iconSVG: ProfileSvg }];