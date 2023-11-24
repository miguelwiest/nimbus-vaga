import axios from "axios";
import {IArea, IPerimeter, IPoint} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL

console.log(BASE_URL)
export async function getPoints() {
    const response = await axios.get(`http://localhost:3333/points`);
    return response.data;
}

export async function postPoint(point: IPoint) {
    const response = await axios.post(`${BASE_URL}/points`, point);
    return response.data;
}

export async function patchPoint(point: IPoint) {
    const response = await axios.patch(`${BASE_URL}/points/${point.id}`, point);
    return response.data;
}

export async function deletePoint(id: string) {
    const response = await axios.delete(`${BASE_URL}/points/${id}`);
    return response.data;
}

export async function getAreas() {
    const response = await axios.get(`${BASE_URL}/areas`);
    return response.data;
}

export async function postArea(area: IArea) {
    console.log(area.id)
    const response = await axios.post(`${BASE_URL}/areas`, area);
    return response.data;
}

export async function patchArea(area: IArea) {
    const response = await axios.patch(`${BASE_URL}/areas/${area.id}`, area);
    return response.data;
}

export async function deleteArea(id: string) {
    const response = await axios.delete(`${BASE_URL}/areas/${id}`);
    return response.data;
}

export async function getPerimeters() {
    const response = await axios.get(`${BASE_URL}/perimeters`);
    return response.data;
}

export async function postPerimeter(perimeter: IPerimeter) {
    const response = await axios.post(`${BASE_URL}/perimeters`, perimeter);
    return response.data;
}

export async function patchPerimeter(perimeter: IPerimeter) {
    const response = await axios.patch(`${BASE_URL}/perimeters/${perimeter.id}`, perimeter);
    return response.data;
}

export async function deletePerimeter(id: string) {
    const response = await axios.delete(`${BASE_URL}/perimeters/${id}`);
    return response.data;
}