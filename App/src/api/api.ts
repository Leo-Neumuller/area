
import EncryptedStorage from 'react-native-encrypted-storage';

export async function signupPost (data: {[key: string] : string}) {
    console.log("data", data);
    const res = await fetch(process.env.API_URL +  "/user/signup", {
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
    console.log(process.env.API_URL)
    const res = await fetch(process.env.API_URL + "/user/login", {
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

export async function loadUserData() {
    const token = await EncryptedStorage.getItem("userToken");
    const res = await fetch(process.env.API_URL + "/user/me", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "access-token": "" + token,
        }
    })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function servicesGet (token: string) {
    const res = await fetch(process.env.API_URL + "/services/services", {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }
    })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function servicesAREAGet (token: string, area: string, service: string) {
    const res = await fetch(process.env.API_URL + "/services/" + service + "/" + area, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }
    })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function serviceSchemaGet (token: string, serviceId: string) {
    const res = await fetch(process.env.API_URL + "/services/metadata/" + serviceId, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }
    })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function authorizeUrlGet (token: string, serviceId: string) {
    const res = await fetch(process.env.API_URL + "/services/" + serviceId + "/authorize_url", {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }
    })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function fluxGet() {
    const token = await EncryptedStorage.getItem("userToken");
    const res = await fetch(process.env.API_URL + "/flux/fluxs", {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : "" + token,
        }})
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}
