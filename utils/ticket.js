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

export function submitTicket(ticket, lawyer) {
    return axios.get(`${BASE_URL}/send/${ticket.id}/${lawyer.id}`, jwt());
}

export function deleteTicket(ticket) {
    return axios.delete(`${BASE_URL}/tickets/${ticket.id}`, jwt());
}

export function updateTicket(ticket) {
    return axios.put(`${BASE_URL}/tickets/${ticket.id}`, ticket, jwt());
}