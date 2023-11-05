import type Node from "../components/Editor/Board/NodeInterface";
import type Edge from "../components/Editor/Board/EdgeInterface";

/**
 * Interface for the properties required for user signup.
 * 
 * @interface
 * @property {string} name - The name of the user.
 * @property {string} surname - The surname of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
export interface signupProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

/**
 * Function to post signup information.
 * 
 * @async
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} The response from the server.
 */
export async function signupPost(data: { [key: string]: string }) {
    const res = await fetch(import.meta.env.VITE_API_URL + "/user/signup", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.status !== 201) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res;
}

/**
 * Function to post login information.
 * 
 * @async
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} The response from the server.
 */
export async function loginPost(data: { [key: string]: string }) {
    const res = await fetch(import.meta.env.VITE_API_URL + "/user/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res;
}

/**
 * Function to get services.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @returns {Promise<any>} The response from the server.
 */
export async function getServices(cookie: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + '/services/services', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get sub-services of a service.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {string} service - The service to get sub-services from.
 * @returns {Promise<any>} The response from the server.
 */
export async function getSubServices(cookie: string, service: string, type: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/${service}/${type.toLowerCase()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })

    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get metadata of a sub-service.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {string} service - The service to get metadata from.
 * @param {string} subService - The sub-service to get metadata from.
 * @returns {Promise<any>} The response from the server.
 */
export async function getSubServiceMetadata(cookie: string, AREA_id: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/metadata/${AREA_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        },
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Interface for creating a Flux.
 * 
 * @interface
 * @property {number} id - The ID of the Flux (optional).
 * @property {string} name - The name of the Flux.
 * @property {string} description - The description of the Flux.
 * @property {Node[]} nodes - The nodes of the Flux.
 * @property {Edge[]} edges - The edges of the Flux.
 */
export interface CreateFlux {
    id?: number;
    name: string;
    description: string;
    nodes: Node[];
    edges: Edge[];
}

/**
 * Function to create a Flux.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {CreateFlux} flux - The Flux to be created.
 * @param {boolean} verify - Whether to verify the Flux (default is false).
 * @returns {Promise<any>} The response from the server.
 */
export async function createFlux(cookie: string, flux: CreateFlux, verify: boolean = false) {
    // formater for api
    for (let node of flux.nodes) {
        for (let inputData of node.inputsData ?? []) {
            if (inputData.inputType === "date" && inputData.value["value"]) {
                inputData.value["value"] = new Date(inputData.value).toISOString();
            }
        }
    }
    const res = await fetch(import.meta.env.VITE_API_URL + `/flux?verify=${verify}`, {
        method: 'POST',
        body: JSON.stringify(flux),
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        },
    })
    if (res.status !== 201) {
        return res.json();
    }
    return res.json();
}

/**
 * Function to get the OAuth link for a service.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {string} service - The service for which to get the OAuth link.
 * @returns {Promise<any>} The response from the server. If the status is not 200, an error is thrown.
 */
export async function getOauthLink(cookie: string, service: string) {
    const redirect_uri = window.location.origin + "/redirected";
    const pre_redirect_uri = window.location.origin + "/oauth/" + encodeURI(service);
    console.log(pre_redirect_uri);
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/` + service + `/authorize_url?end_redirect=${redirect_uri}&redirect=${pre_redirect_uri}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie,
            'service': service
        },
    })
    if (res.status !== 200) {
        let err = await res.json();
        console.log(err);
        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to check if a service is connected.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {string} service - The service to check.
 * @returns {Promise<any>} The response from the server. If the status is not 200, an error is thrown.
 */
export async function checkConnected(cookie: string, service: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/` + service + "/is_connected", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie,
            'service': service
        },
    })
    if (res.status !== 200) {
        let err = await res.json();
        console.log(err);
        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get a Flux.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {number} id - The ID of the Flux to get.
 * @returns {Promise<any>} The response from the server.
 */
export async function getFlux(cookie: string, fluxId: any) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/flux/${fluxId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get the current user.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @returns {Promise<any>} The response from the server.
 */
export async function userMe(cookie: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/user/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get all Fluxes.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @returns {Promise<any>} The response from the server.
 */
export async function getAllFlux(cookie: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/flux/fluxs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to toggle a Flux.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {number} id - The ID of the Flux to toggle.
 * @returns {Promise<any>} The response from the server.
 */
export async function toggleFlux(cookie: string, id: number) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/flux/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie,
            'fluxId': `${id}`
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to disconnect a service.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {string} service - The service to disconnect.
 * @returns {Promise<any>} The response from the server.
 */
export async function disconnectService(cookie: string, service: number) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/${service}/disconnect`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie,
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to delete a Flux.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @param {number} id - The ID of the Flux to delete.
 * @returns {Promise<any>} The response from the server.
 */
export async function deleteFlux(cookie: string, fluxId: any) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/flux/${fluxId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

/**
 * Function to get OAuth services.
 * 
 * @async
 * @function
 * @param {string} cookie - The cookie for authentication.
 * @returns {Promise<any>} The response from the server.
 */
export async function getOauthServices(cookie: string) {
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/services/oauth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    if (res.status !== 200) {
        let err = await res.json();

        throw new Error(err.detail);
    }
    return res.json();
}

export async function pushOauthData(service: string,data: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/services/${service}/authorize${data}` , {
        method: 'GET',
    })
    return res;
}