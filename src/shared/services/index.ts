import axios from "axios";
import {IArea, IPerimeter, IPoint} from "../types";

export async function getPoints() {
    const response = await axios.get(`http://localhost:3333/points`);
    return response.data;
}

export async function postPoint(point: IPoint) {
    const response = await axios.post(`http://localhost:3333/points`, point);
    return response.data;
}

export async function patchPoint(point: IPoint) {
    const response = await axios.patch(`http://localhost:3333/points/${point.id}`, point);
    return response.data;
}

export async function deletePoint(id: string) {
    const response = await axios.delete(`http://localhost:3333/points/${id}`);
    return response.data;
}

export async function getAreas() {
    const response = await axios.get(`http://localhost:3333/areas`);
    return response.data;
}

export async function postArea(area: IArea) {
    console.log(area.id)
    const response = await axios.post(`http://localhost:3333/areas`, area);
    return response.data;
}

export async function patchArea(area: IArea) {
    const response = await axios.patch(`http://localhost:3333/areas/${area.id}`, area);
    return response.data;
}

export async function deleteArea(id: string) {
    const response = await axios.delete(`http://localhost:3333/areas/${id}`);
    return response.data;
}

export async function getPerimeters() {
    const response = await axios.get(`http://localhost:3333/perimeters`);
    return response.data;
}

export async function postPerimeter(perimeter: IPerimeter) {
    const response = await axios.post(`http://localhost:3333/perimeters`, perimeter);
    return response.data;
}

export async function patchPerimeter(perimeter: IPerimeter) {
    const response = await axios.patch(`http://localhost:3333/perimeters/${perimeter.id}`, perimeter);
    return response.data;
}

export async function deletePerimeter(id: string) {
    const response = await axios.delete(`http://localhost:3333/perimeters/${id}`);
    return response.data;
}