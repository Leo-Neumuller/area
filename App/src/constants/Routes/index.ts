import Login from "../../screens/LoginScreens/Login";
import HomeLogin from "../../screens/LoginScreens/HomeLogin";
import Signup from "../../screens/LoginScreens/Signup";
import {FluxEditor} from "../../screens/FluxEditor";


const Routes = [
    {
        name: "Login",
        component: Login
    },
    {
        name: "FluxEditor",
        component: FluxEditor
    },
    {
        name: "Signup",
        component: Signup
    },
    {
        name: "HomeLogin",
        component: HomeLogin
    },
]

export default Routes