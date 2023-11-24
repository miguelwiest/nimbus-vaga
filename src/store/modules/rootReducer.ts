import {combineReducers} from 'redux';
import store from '../createStore';
import {settings} from './settings/reducers';
import {areas} from './areas/reducers';
import {points} from './points/reducers';
import {perimeters} from "./perimeters/reducers";

export type RootState = ReturnType<typeof store.getState>;
export default combineReducers({
    settings,
    areas,
    points,
    perimeters
});