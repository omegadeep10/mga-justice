import axios from 'axios'
const BASE_URL = 'http://localhost:3000';

export function createTicket(ticket) {
    console.log(ticket);
    return axios.post(`${BASE_URL}/tickets`, ticket);
}