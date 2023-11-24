import {SET_PERIMETERS} from "../../types.ts";

export interface PerimetersState {
    initial: {
        lat: number;
        lng: number;
    };
    final: {
        lat: number;
        lng: number;
    };
}
export const initialState: PerimetersState[] = []

export const perimeters = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PERIMETERS:
            return action.payload;
        default:
            return state;
    }
};
