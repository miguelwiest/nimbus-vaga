import {SET_POINTS} from "../../types.ts";

export interface PointsState {
    lat: number;
    lng: number;
}
export const initialState: PointsState[] = []

export const points = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_POINTS:
            return action.payload;
        default:
            return state;
    }
};
