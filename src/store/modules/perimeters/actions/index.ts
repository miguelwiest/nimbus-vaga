import {SET_PERIMETERS} from "../../types.ts";
import {IPerimeter} from "../../../../shared/types";

export const setPerimeters = (perimeters: IPerimeter[]) => ({
    type: SET_PERIMETERS,
    payload: perimeters
})