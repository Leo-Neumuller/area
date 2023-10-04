async function login(email: string, password: string) {
    return await fetch('http://127.0.0.1:8000/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json();
    });
}

export default login;