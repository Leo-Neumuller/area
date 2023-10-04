
export interface signupProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export async function signupPost(data: { [key: string]: string }) {
    const res = await fetch("http://127.0.0.1:8000/user/signup", {
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
    const res = await fetch("http://127.0.0.1:8000/user/login", {
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
    return await fetch('http://127.0.0.1:8000/services', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    }).then(res => {
        return res.json();
    });
}
