import Login from "../../screens/LoginScreens/Login";
import HomeLogin from "../../screens/LoginScreens/HomeLogin";
import Signup from "../../screens/LoginScreens/Signup";
import {FluxEditor} from "../../screens/FluxEditor";

const Routes = [
    {
        name: "Login",
        component: Login,
        options: {
            headerShown: false
        }
    },
    {
        name: "FluxEditor",
        component: FluxEditor,
        options: {
            headerShown: true
        }
    },
    {
        name: "Signup",
        component: Signup,
        options: {
            headerShown: false
        }
    },
    {
        name: "HomeLogin",
        component: HomeLogin,
        options: {
            headerShown: false
        }
    }
]

export default Routes