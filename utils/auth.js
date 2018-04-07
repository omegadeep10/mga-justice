import decode from 'jwt-decode';
import axios from 'axios';
import Router from 'vue-router';

const ID_TOKEN_KEY = 'access_token';
const BASE_URL = 'http://localhost:3000';

let router = new Router({
   mode: 'history',
});

export function login(email, password) {
    const url = `${BASE_URL}/auth`;
    const credentials = {
        email: email,
        password: password
    };

    return new Promise((resolve, reject) => {
        axios.post(url, credentials)
            .then(response => {
                localStorage.setItem(ID_TOKEN_KEY, response.data[ID_TOKEN_KEY]);
                resolve(response.data[ID_TOKEN_KEY]);
            })
            .catch((err) => {
                console.log(err);
                reject("Invalid credentials");
            });
    });
}


export function logout() {
    localStorage.removeItem(ID_TOKEN_KEY);
    router.go('/');
}

export function requireAuth(to, from, next) {
    console.log("Called");
    if (!isLoggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
}

export function isLoggedIn() {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  return !!token && !isTokenExpired(token);
}

export function jwt() {
    let token = localStorage.getItem(ID_TOKEN_KEY);
    return {
        headers: { 'Authorization': `JWT ${token}` }
    };
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}