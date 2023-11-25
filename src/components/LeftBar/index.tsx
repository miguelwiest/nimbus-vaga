import React from 'react';
import './styles.scss';
import {RootState} from "../../store/modules/rootReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {setArea, setPerimeter, setPoint, setType} from "../../store/modules/settings/actions";
import {SettingsActionTypes} from "../../store/modules/settings/reducers";
import {setPoints} from "../../store/modules/points/actions";
import {setPerimeters} from "../../store/modules/perimeters/actions";
import {setAreas} from "../../store/modules/areas/actions";
import {IArea, IPerimeter, IPoint} from "../../shared/types";
import TrashIcon from "../../assets/trash-2.svg";
import {deleteArea, deletePerimeter, deletePoint} from "../../shared/services";

const LeftBar: React.FC = () => {
    const dispatch = useDispatch()
    const {areas, points, perimeters, settings} = useSelector((state: RootState) => state)

    console.log(settings.perimeter)

    return (
        <section className="left__bar">
            <div className="left__bar__controls"
                 style={{flexDirection: "row", justifyContent: "flex-start", marginBottom: 24}}>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                        onChange={() => {
                            if (settings.type === SettingsActionTypes.VIEW_IN_MAP) {
                                dispatch(setType(SettingsActionTypes.INITIALIZE))
                            } else {
                                dispatch(setType(SettingsActionTypes.VIEW_IN_MAP))
                            }
                        }}
                    />
                    <span className="slider round"></span>
                </label>
                <span>
                    {
                        settings.type !== SettingsActionTypes.VIEW_IN_MAP ?
                            'Clique para visualizar no mapa' :
                            'Clique para editar no mapa'
                    }
                </span>
            </div>
            {
                settings.type !== SettingsActionTypes.VIEW_IN_MAP &&
                <div className="left__bar__controls">
                    <button
                        className={`button__control ${settings.type === SettingsActionTypes.INITIALIZE ? 'active' : ''}`}
                        onClick={() => dispatch(setType(SettingsActionTypes.INITIALIZE))}
                    >
                        Ponto e Zoom iniciais
                    </button>
                </div>
            }

            <div className="left__bar__controls">
                <button
                    className={`button__add ${settings.type === SettingsActionTypes.VIEW_IN_MAP ? 'disabled' : ''}`}
                    onClick={() => {
                        dispatch(setType(SettingsActionTypes.NEW_POINT))
                    }}
                >
                    Pontos {settings.type !== SettingsActionTypes.VIEW_IN_MAP && '+'}
                </button>
                <ul>
                    {points.map((point: IPoint) => (
                        <li key={point.id}>
                            <button
                                className={`button__control ${point.id === settings.point.id || (settings.type === SettingsActionTypes.VIEW_IN_MAP && point.viewMap) ? 'active' : ''}`}
                                onClick={() => {
                                    if (settings.type === SettingsActionTypes.VIEW_IN_MAP) {
                                        const newPoints = points.map((pointItem: IPoint) => {
                                            if (pointItem.id === point.id) {
                                                return {
                                                    ...pointItem,
                                                    viewMap: !pointItem.viewMap
                                                };
                                            }
                                            return pointItem;
                                        })
                                        dispatch(setPoints(newPoints))
                                        return
                                    }
                                    dispatch(setPoint(point))
                                    dispatch(setType(SettingsActionTypes.EDIT_POINT))
                                }}
                            >
                                <strong>
                                    {point.description}
                                </strong>
                                {
                                    settings.type !== SettingsActionTypes.VIEW_IN_MAP &&
                                    <img
                                        src={TrashIcon}
                                        alt="TrashIcon"
                                        onClick={() => {
                                            const newPoints = points.filter((pointItem: IPoint) => pointItem.id !== point.id)
                                            deletePoint(point.id as string).then(() => {
                                                dispatch(setType(SettingsActionTypes.INITIALIZE))
                                                dispatch(setPoints(newPoints))
                                            })
                                        }}
                                    />
                                }

                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="left__bar__controls">
                <button
                    className={`button__add ${settings.type === SettingsActionTypes.VIEW_IN_MAP ? 'disabled' : ''}`}
                    onClick={() => {
                        dispatch(setType(SettingsActionTypes.NEW_AREA))
                    }}
                >
                    Áreas {settings.type !== SettingsActionTypes.VIEW_IN_MAP && '+'}
                </button>
                <ul>
                    {areas.map((area: IArea) => (
                        <li key={area.id}>
                            <button
                                className={`button__control ${area.id === settings.area.id || (settings.type === SettingsActionTypes.VIEW_IN_MAP && area.viewMap) ? 'active' : ''}`}
                                onClick={() => {
                                    if (settings.type === SettingsActionTypes.VIEW_IN_MAP) {
                                        const newPoints = areas.map((areaItem: IArea) => {
                                            if (areaItem.id === area.id) {
                                                return {
                                                    ...areaItem,
                                                    viewMap: !areaItem.viewMap
                                                };
                                            }
                                            return areaItem;
                                        })
                                        dispatch(setAreas(newPoints))
                                        return
                                    }
                                    dispatch(setArea(area))
                                    dispatch(setType(SettingsActionTypes.EDIT_AREA))
                                }}
                            >
                                <strong>
                                    {area.description}
                                </strong>
                                {
                                    settings.type !== SettingsActionTypes.VIEW_IN_MAP &&
                                    <img
                                        src={TrashIcon}
                                        alt="TrashIcon"
                                        onClick={() => {
                                            const newAreas = areas.filter((areaItem: IArea) => areaItem.id !== area.id)
                                            deleteArea(area.id as string).then(() => {
                                                dispatch(setType(SettingsActionTypes.INITIALIZE))
                                                dispatch(setAreas(newAreas))
                                            })
                                        }}
                                    />
                                }

                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="left__bar__controls">
                <button
                    className={`button__add ${settings.type === SettingsActionTypes.VIEW_IN_MAP ? 'disabled' : ''}`}
                    onClick={() => dispatch(setType(SettingsActionTypes.NEW_PERIMETER))}
                >
                    Perímetros {settings.type !== SettingsActionTypes.VIEW_IN_MAP && '+'}
                </button>
                <ul>
                    {perimeters.map((perimeter: IPerimeter) => (
                        <li key={perimeter.id}>
                            <button
                                className={`button__control ${perimeter.id === settings.perimeter.id || (settings.type === SettingsActionTypes.VIEW_IN_MAP && perimeter.viewMap) ? 'active' : ''}`}
                                onClick={() => {
                                    console.log('perimeter', perimeter)
                                    if (settings.type === SettingsActionTypes.VIEW_IN_MAP) {
                                        const newPoints = perimeters.map((perimeterItem: IPerimeter) => {
                                            if (perimeterItem.id === perimeter.id) {
                                                return {
                                                    ...perimeterItem,
                                                    viewMap: !perimeterItem.viewMap
                                                };
                                            }
                                            return perimeterItem;
                                        })
                                        dispatch(setPerimeters(newPoints))
                                        return
                                    }
                                    dispatch(setPerimeter(perimeter))
                                    dispatch(setType(SettingsActionTypes.EDIT_PERIMETER))
                                }}
                            >
                                <strong>
                                    {perimeter.description}
                                </strong>

                                {
                                    settings.type !== SettingsActionTypes.VIEW_IN_MAP &&
                                    <img
                                        src={TrashIcon}
                                        alt="TrashIcon"
                                        onClick={() => {
                                            const newPerimeters = perimeters.filter((perimeterItem: IPerimeter) => perimeterItem.id !== perimeter.id)
                                            deletePerimeter(perimeter.id as string).then(() => {
                                                dispatch(setType(SettingsActionTypes.INITIALIZE))
                                                dispatch(setPerimeters(newPerimeters))
                                            })
                                        }}
                                    />
                                }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default LeftBar;