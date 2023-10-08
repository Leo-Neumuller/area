import FluxSvg from "../../../assets/logos_flux.svg";
import DashboardSvg from "../../../assets/material-symbols_dashboard.svg"
import AppSvg from "../../../assets/tdesign_app.svg"
import ProfileSvg from "../../../assets/iconamoon_profile-fill.svg"
import { View, Text } from "react-native";

import {Profile} from "../../screens/Profile"
import React from "react";
import {Flux} from "../../screens/Flux";

export const Tmp: React.FC = () => {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>En cours de developpement</Text>
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
export const bottomBarList: { name: string, navigationComponent: React.FC<any>, iconSVG: () => React.ReactNode }[]
= [{name: "Accueil", navigationComponent: Tmp, iconSVG: DashboardSvg},
  {name: "Flux", navigationComponent: Flux, iconSVG: FluxSvg},
  {name: "App", navigationComponent: Tmp, iconSVG: AppSvg},
  {name: "Profile", navigationComponent: Profile, iconSVG: ProfileSvg }];