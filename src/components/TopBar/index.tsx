import React, {useEffect, useState} from 'react';
import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/modules/rootReducer.ts';
import {setArea, setLat, setLng, setPerimeter, setPoint, setType, setZoom} from '../../store/modules/settings/actions';
import {SettingsActionTypes} from "../../store/modules/settings/reducers";
import {v4 as uuidv4} from 'uuid';
import {setPoints} from "../../store/modules/points/actions";
import {patchArea, patchPerimeter, patchPoint, postArea, postPerimeter, postPoint} from "../../shared/services";
import {setAreas} from "../../store/modules/areas/actions";
import {setPerimeters} from "../../store/modules/perimeters/actions";
import {IArea, IPerimeter, IPoint} from "../../shared/types";

const LeftBar: React.FC = () => {
    const dispatch = useDispatch();
    const {settings, areas, points, perimeters} = useSelector((state: RootState) => state);

    const [localLat, setLocalLat] = useState<number>(0);
    const [localLng, setLocalLng] = useState<number>(0);
    const [localFinalLat, setLocalFinalLat] = useState<number>(0);
    const [localFinalLng, setLocalFinalLng] = useState<number>(0);
    const [localRadius, setLocalRadius] = useState<number>(0);
    const [localZoom, setLocalZoom] = useState<number>(0);
    const [localDescription, setLocaDescription] = useState("");

    useEffect(() => {
        if (settings.type === SettingsActionTypes.INITIALIZE) {
            setLocalLat(settings.lat);
            setLocalLng(settings.lng);
            setLocalZoom(settings.zoom);
        }
        if (settings.type === SettingsActionTypes.EDIT_POINT || settings.type === SettingsActionTypes.NEW_POINT) {
            setLocalLat(settings.point.lat);
            setLocalLng(settings.point.lng);
            setLocaDescription(settings.point.description);
        }
        if (settings.type === SettingsActionTypes.EDIT_AREA || settings.type === SettingsActionTypes.NEW_AREA) {
            setLocalLat(settings.area.lat);
            setLocalLng(settings.area.lng);
            setLocaDescription(settings.area.description);
            setLocalRadius(settings.area.radius);
        }
        if (settings.type === SettingsActionTypes.EDIT_PERIMETER || settings.type === SettingsActionTypes.NEW_PERIMETER) {
            setLocalLat(settings.perimeter.initial.lat);
            setLocalLng(settings.perimeter.initial.lng);
            setLocalFinalLat(settings.perimeter.final.lat);
            setLocalFinalLng(settings.perimeter.final.lng);
            setLocaDescription(settings.perimeter.description);
        }
    }, [settings]);

    const titleTypes = () => {
        switch (settings.type) {
            case SettingsActionTypes.INITIALIZE:
                return 'Ponto e Zoom iniciais';
            case SettingsActionTypes.NEW_POINT:
                return 'Novo ponto';
            case SettingsActionTypes.EDIT_POINT:
                return 'Editar ponto';
            case SettingsActionTypes.NEW_AREA:
                return 'Nova área';
            case SettingsActionTypes.EDIT_AREA:
                return 'Editar área';
            case SettingsActionTypes.NEW_PERIMETER:
                return 'Novo perímetro';
            case SettingsActionTypes.EDIT_PERIMETER:
                return 'Editar perímetro';
            default:
                return '';
        }
    }

    const handleSave = () => {
        const newPoint:IPoint = {
            description: localDescription,
            lat: localLat,
            lng: localLng
        }
        const newArea:IArea = {
            description: localDescription,
            lat: localLat,
            lng: localLng,
            radius: localRadius
        }
        const newPerimeter:IPerimeter = {
            description: localDescription,
            initial: {
                lat: localLat,
                lng: localLng
            },
            final: {
                lat: localFinalLat,
                lng: localFinalLng
            }
        }
        switch (settings.type) {
            case SettingsActionTypes.INITIALIZE:
                dispatch(setLat(Number(localLat)));
                dispatch(setLng(Number(localLng)));
                dispatch(setZoom(Number(localZoom)));
                break;
            case SettingsActionTypes.NEW_POINT:
                postPoint({
                    ...newPoint,
                    id: uuidv4()
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_POINT))
                    dispatch(setPoint(newPoint))
                    dispatch(setPoints([...points, newPoint]))
                })
                break;
            case SettingsActionTypes.NEW_AREA:
                postArea({
                    ...newArea,
                    id: uuidv4()
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_AREA))
                    dispatch(setArea(newArea))
                    dispatch(setAreas([...areas, newArea]))
                })
                break;
            case SettingsActionTypes.NEW_PERIMETER:
                postPerimeter({
                    ...newPerimeter,
                    id: uuidv4()
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_PERIMETER))
                    dispatch(setPerimeter(newPerimeter))
                    dispatch(setPerimeters([...perimeters, newPerimeter]))
                })
                break;
            case SettingsActionTypes.EDIT_POINT:
                patchPoint({
                    ...newPoint,
                    id: settings.point.id
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_POINT))
                    dispatch(setPoint(newPoint))
                    dispatch(setPoints(points.map((point: IPoint) => {
                        if (point.id === settings.point.id) {
                            return newPoint;
                        }
                        return point;
                    })))
                })
                break;
            case SettingsActionTypes.EDIT_AREA:
                patchArea({
                    ...newArea,
                    id: settings.area.id
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_AREA))
                    dispatch(setArea(newArea))
                    dispatch(setAreas(areas.map((area: IArea) => {
                        if (area.id === settings.area.id) {
                            return newArea;
                        }
                        return area;
                    })))
                })
                break;
            case SettingsActionTypes.EDIT_PERIMETER:
                patchPerimeter({
                    ...newPerimeter,
                    id: settings.perimeter.id
                }).then(() => {
                    dispatch(setType(SettingsActionTypes.EDIT_PERIMETER))
                    dispatch(setPerimeter(newPerimeter))
                    dispatch(setPerimeters(perimeters.map((perimeter: IPerimeter) => {
                        if (perimeter.id === settings.perimeter.id) {
                            return newPerimeter;
                        }
                        return perimeter;
                    })))
                })
                break;
            default:
                break;
        }
    }

    return (
        <section className="top__bar">
            <h1>{titleTypes()}</h1>
            <div className="top__bar__container">
                {settings.type !== SettingsActionTypes.INITIALIZE &&
                    <div className="input__container">
                        <label htmlFor="description">descrição: </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={localDescription}
                            onChange={(event) => setLocaDescription(event.target.value)}
                        />
                    </div>
                }
                <div className="input__container">
                    <label
                        htmlFor="latitude">Latitude {(settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) && 'Superior'}: </label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={localLat}
                        onChange={(event) => setLocalLat(Number(event.target.value))}
                    />
                </div>
                <div className="input__container">
                    <label
                        htmlFor="longitude">Longitude {(settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) && 'Superior'}: </label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={localLng}
                        onChange={(event) => setLocalLng(Number(event.target.value))}
                    />
                </div>

                {(settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) &&
                    <>
                        <div className="input__container">
                            <label htmlFor="latitude">Latitude Inferior: </label>
                            <input
                                type="number"
                                name="latitude"
                                id="latitude"
                                value={localFinalLat}
                                onChange={(event) => setLocalFinalLat(Number(event.target.value))}
                            />
                        </div>
                        <div className="input__container">
                            <label htmlFor="longitude">Longitude Inferior: </label>
                            <input
                                type="number"
                                name="longitude"
                                id="longitude"
                                value={localFinalLng}
                                onChange={(event) => setLocalFinalLng(Number(event.target.value))}
                            />
                        </div>
                    </>
                }

                {(settings.type === SettingsActionTypes.NEW_AREA || settings.type === SettingsActionTypes.EDIT_AREA) &&
                    <div className="input__container">
                        <label htmlFor="radius">Raio (km): </label>
                        <input
                            type="number"
                            name="radius"
                            id="radius"
                            value={localRadius}
                            onChange={(event) => setLocalRadius(Number(event.target.value))}
                        />
                    </div>
                }
                {settings.type === SettingsActionTypes.INITIALIZE &&
                    <div className="input__container">
                        <label htmlFor="zoom">Zoom: </label>
                        <input
                            type="number"
                            name="zoom"
                            id="zoom"
                            value={localZoom}
                            onChange={(event) => setLocalZoom(Number(event.target.value))}
                        />
                    </div>
                }
                <button onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </section>
    );
};

export default LeftBar;