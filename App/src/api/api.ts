
import EncryptedStorage from 'react-native-encrypted-storage';
import IFLUX from "../interfaces/IFLUX";

/**
 * @description Send a POST request to the API to create a new user
 * @param data - The data of the user to create
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 201
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to login a user
 * @param data - The data of the user to login
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @param area - The area of the service
 * @param service - The name of the service
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @param serviceId - The id of the service
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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
    return res.json();
}

/**
 * @description Send a POST request to the API to logout a user
 * @param serviceId - The id of the service
 * @returns The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @param flux - The flux to create
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 201
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
export async function fluxPost(token: string, flux: IFLUX) {
    const res = await fetch(process.env.API_URL + "/flux", {
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

/**
 * @description Send a POST request to the API to logout a user
 * @param token - The token of the user to logout
 * @param fluxId - The id of the flux to get
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param service - The name of the service
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 200
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param service - The name of the service
 * @return The response of the API as a JSON
 * @throws An error if the request failed
 * @throws An error if the status code is not 201
 * @throws An error if the response is not a JSON
 * @throws An error if the response contains an error
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param service - The name of the service
 * @param params - The params of the request
 * @return The response of the API as a JSON
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param id - The id of the flux
 * @return The response of the API as a JSON
 */
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

/**
 * @description Send a POST request to the API to logout a user
 * @param id - The id of the flux
 * @return The response of the API as a JSON
 */
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
