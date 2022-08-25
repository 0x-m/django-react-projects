

const LOCAL_STORAGE_ACCESS_TOKEN = 'access-token';
const LOCAL_STORAGE_REFRESH_TOKEN = 'refresh-token';

function setTokens(access, refresh) {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, access);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, refresh)
}

function getTokens() {
    return {
        access: localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
        refresh: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
    }
}

function clearTokens() {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
}



function isAuthenticated() {
    return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) != null;
}

async function logout() {
    const result = await fetch('http://localhost:8000/api/v1/users/logout/', {
        method: "POST",
        headers: {
            "Authorization": "Bearer" + " " + getTokens()['access'],
            "Content-Type": "application/json"
        }
    }).then(resp => {
        if (resp.ok) {
            clearTokens();
            return true;
        }
        return false;
    });
    console.log(getTokens());
    return result;
}


export { logout, isAuthenticated, setTokens, getTokens, clearTokens }