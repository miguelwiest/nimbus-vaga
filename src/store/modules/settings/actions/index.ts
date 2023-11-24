import {SET_AREA, SET_LAT, SET_LNG, SET_PERIMETER, SET_POINT, SET_TYPE, SET_ZOOM} from "../../types.ts";
import {IArea, IPerimeter, IPoint} from "../../../../shared/types";

export const setLat = (lat: number) => {
    return {
        type: SET_LAT,
        payload: lat
    };
}

export const setLng = (lng: number) => {
    return {
        type: SET_LNG,
        payload: lng
    };
}

export const setZoom = (zoom: number) => {
    return {
        type: SET_ZOOM,
        payload: zoom
    };
}

export const setPoint = (point: IPoint | null) => {
    return {
        type: SET_POINT,
        payload: point
    };
}

export const setArea = (area: IArea | null) => {
    return {
        type: SET_AREA,
        payload: area
    };
}

export const setPerimeter = (perimeter: IPerimeter | null) => {
    return {
        type: SET_PERIMETER,
        payload: perimeter
    };
}

export const setType = (type: string) => {
    return {
        type: SET_TYPE,
        payload: type
    };
}