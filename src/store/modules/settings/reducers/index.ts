import {SET_AREA, SET_LAT, SET_LNG, SET_PERIMETER, SET_POINT, SET_TYPE, SET_ZOOM} from "../../types.ts";
import {IArea, IPerimeter, IPoint} from "../../../../shared/types";

export enum SettingsActionTypes {
    INITIALIZE = 'INITIALIZE',
    NEW_POINT = 'NEW_POINT',
    NEW_AREA = 'NEW_AREA',
    NEW_PERIMETER = 'NEW_PERIMETER',
    EDIT_POINT = 'EDIT_POINT',
    EDIT_AREA = 'EDIT_AREA',
    EDIT_PERIMETER = 'EDIT_PERIMETER',
    VIEW_IN_MAP = 'VIEW_IN_MAP',
}

export interface SettingsState {
    type: SettingsActionTypes;
    lat: number | null;
    lng: number | null;
    zoom: number;
    point: IPoint;
    area: IArea;
    perimeter: IPerimeter
}

export const initialState: SettingsState = {
    type: SettingsActionTypes.INITIALIZE,
    lat: null,
    lng: null,
    zoom: 16,

    point: {
        id: '',
        description: '',
        lat: 0,
        lng: 0,
    },
    area: {
        id: '',
        description: '',
        lat: 0,
        lng: 0,
        radius: 0,
    },
    perimeter: {
        id: '',
        description: '',
        initial: {
            lat: 0,
            lng: 0,
        },
        final: {
            lat: 0,
            lng: 0,
        },
    }
};

export const settings = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LAT:
            return {
                ...state,
                lat: action.payload
            };
        case SET_LNG:
            return {
                ...state,
                lng: action.payload
            };
        case SET_ZOOM:
            return {
                ...state,
                zoom: action.payload
            };
        case SET_POINT:
            return {
                ...state,
                point: action.payload,
                area: initialState.area,
                perimeter: initialState.perimeter
            };
        case SET_AREA:
            return {
                ...state,
                area: action.payload,
                point: initialState.point,
                perimeter: initialState.perimeter
            };
        case SET_PERIMETER:
            return {
                ...state,
                perimeter: action.payload,
                point: initialState.point,
                area: initialState.area
            };
        case SET_TYPE:
            if (
                action.payload === SettingsActionTypes.INITIALIZE ||
                action.payload === SettingsActionTypes.NEW_POINT ||
                action.payload === SettingsActionTypes.NEW_AREA ||
                action.payload === SettingsActionTypes.NEW_PERIMETER
            ) {
                return {
                    ...state,
                    type: action.payload,
                    point: initialState.point,
                    area: initialState.area,
                    perimeter: initialState.perimeter
                }
            }
            return {
                ...state,
                type: action.payload
            };
        default:
            return state;
    }
};
