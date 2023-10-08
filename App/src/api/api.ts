


const ipAdress = "https://711f-2a01-e0a-4b0-7aa0-2f95-75e5-d328-3418.ngrok-free.app"
import * as SecureStore from 'expo-secure-store';



export async function signupPost (data: {[key: string] : string}) {
    const res = await fetch(ipAdress +  "/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })

    if (res.status !== 201) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function loginPost (data: {[key: string] : string}) {
    const res = await fetch(ipAdress +  "/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })

    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function loadUserData () {
    const jwt = await SecureStore.getItemAsync("userToken")
    const res = await fetch(ipAdress + "/user/me", {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "access-token": jwt,
        }
    })
    console.log(res.status);
    if (res.status !== 200) {
        const error = await res.json();
        console.log(error);
    }
}

