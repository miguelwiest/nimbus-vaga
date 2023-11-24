import {SET_AREAS} from "../../types.ts";
import {IArea} from "../../../../shared/types";

export const initialState: IArea[] = []

export const areas = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_AREAS:
            return action.payload;
        default:
            return state;
    }
};
