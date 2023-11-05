
import EncryptedStorage from 'react-native-encrypted-storage';
import IFLUX from "../interfaces/IFLUX";


export async function signupPost (data: {[key: string] : string}) {
    const res = await fetch(process.env.API_URL +  "/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })
    .catch((error) => {
        throw new Error(error);
    })

    if (res.status !== 201) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function loginPost (data: {[key: string] : string}) {

    const res = await fetch(process.env.API_URL + "/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })
    .catch((error) => {
        throw new Error(error);
    })

    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function loadUserData() {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/user/me", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "access-token": token,
        }
    })
    .catch((error) => {
        throw new Error(error);
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
    .catch((error) => {
        throw new Error(error);
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
    .catch((error) => {
        throw new Error(error);
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
    .catch((error) => {
        throw new Error(error);
    })

    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    const data = await res.json();
    data["inputsData"] = data["inputsData"].map((inputData: any) =>({...inputData, value: {value: "", "id": "Rien"}}))
    return new Promise<any>((resolve) => resolve(data));
}

export async function authorizeUrlGet (serviceId: string) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const redirect = "https://sortify.fr/redirect/" + serviceId;
    const end_redirect = "http://localhost:3000/fluxs";

    const res = await fetch(process.env.API_URL + "/services/" + serviceId + `/authorize_url?redirect=${redirect}&end_redirect=${end_redirect}`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }
    })
    .catch((error) => {
        throw new Error(error);
    })

    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function fluxGet() {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/flux/fluxs", {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }})
        .catch((error) => {
            throw new Error(error);
        })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function fluxPost(token: string, flux: IFLUX) {
    const res = await fetch(process.env.API_URL + `/flux?verify=${true}`, {
        method: "POST",
        body: JSON.stringify(flux),
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }})
        .catch((error) => {
            throw new Error(error);
        })

    if (res.status !== 201) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function fluxIdGet(token: string, fluxId: number) {
    const res = await fetch(process.env.API_URL + "/flux/" + fluxId, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }})
        .catch((error) => {
            throw new Error(error);
        })
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function getOauthService() {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/services/services/oauth",{
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).catch((error) => {
            throw new Error(error);
        });
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function getIsConnected(service: string) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/services/" + service + "/is_connected",{
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).catch((error) => {
            throw new Error(error);
        });
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function oauthDisconnect(service: string) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/services/" + service + "/disconnect",{
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).catch((error) => {
            throw new Error(error);
        });
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.detail);
    }
    return res.json();
}

export async function oauthAuthorize(service: string, params: string) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/services/" + service + "/authorize?" + params,{
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).then((res) => {
            console.log("oauthAuthorize", res)
            return res;
        });
    return res
}

export async function changeActive(id: number) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/flux/" + id, {
        method: "PATCH",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).then((res) => {
            console.log("active changed");
            return res;
    });
    return res
}

export async function deleteFlux(id: number) {
    const token = await EncryptedStorage.getItem("userToken") as string;
    const res = await fetch(process.env.API_URL + "/flux/" + id, {
        method: "DELETE",
        headers: {
            "accept" : "application/json",
            "Content-Type" : "application/json",
            "access-token" : token,
        }}).then((res) => {
        console.log("flux deleted");
        return res;
    });
    return res
}
