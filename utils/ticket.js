import axios from 'axios'
import { jwt } from './auth';
const BASE_URL = 'http://localhost:3000';

export function createTicket(ticket) {
    console.log(ticket);
    return axios.post(`${BASE_URL}/tickets`, ticket);
}

export function getTickets() {
    return axios.get(`${BASE_URL}/tickets`, jwt());
}