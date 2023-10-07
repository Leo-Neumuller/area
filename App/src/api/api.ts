
export async function signupPost (data: {[key: string] : string}) {
    const res = await fetch(process.env.EXPO_PUBLIC_API_URL +  "/user/signup", {
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
    const res = await fetch(process.env.EXPO_PUBLIC_API_URL + "/user/login", {
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

export async function servicesGet (token: string) {
    const res = await fetch(process.env.EXPO_PUBLIC_API_URL + "/services", {
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
