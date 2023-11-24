import {SET_POINTS} from "../../types.ts";
import {IPerimeter} from "../../../../shared/types";

export const setPoints = (perimeter: IPerimeter[]) => ({
    type: SET_POINTS,
    payload: perimeter
})