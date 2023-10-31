import type Node from "../components/Editor/Board/NodeInterface";
import type Edge from "../components/Editor/Board/EdgeInterface";

export interface signupProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

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

interface CreateFlux {
    id?: number;
    name: string;
    description: string;
    nodes: Node[];
    edges: Edge[];
}

export async function createFlux(cookie: string, flux: CreateFlux, verify: boolean = false) {
    // formater for api
    for (let node of flux.nodes) {
        for (let inputData of node.inputsData ?? []) {
            if (inputData.inputType === "date") {
                inputData.value = new Date(inputData.value).toISOString();
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

export async function getOauthLink(cookie: string, service: string) {
    const redirect_uri = window.location.origin + "/redirected";
    const res = await fetch(import.meta.env.VITE_API_URL + `/services/` + service + `/authorize_url?redirect_uri=${redirect_uri}`, {
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