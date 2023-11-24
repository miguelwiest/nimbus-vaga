import {SET_AREAS} from "../../types.ts";
import {IArea} from "../../../../shared/types";

export const setAreas = (areas: IArea[]) => ({
    type: SET_AREAS,
    payload: areas
})