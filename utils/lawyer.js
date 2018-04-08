import axios from 'axios'
import { jwt } from './auth';
const BASE_URL = 'http://localhost:3000';

export function createLawyer(lawyer) {
    console.log(lawyer);
    return axios.post(`${BASE_URL}/lawyers`, lawyer, jwt());
}

export function getLawyers() {
    return axios.get(`${BASE_URL}/lawyers`, jwt());
}

export function deleteLawyer(lawyer) {
    return axios.delete(`${BASE_URL}/lawyers/${lawyer.id}`, jwt());
}

export function updateLawyer(lawyer) {
    return axios.put(`${BASE_URL}/lawyers/${lawyer.id}`, lawyer, jwt());
}