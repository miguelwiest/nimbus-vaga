import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {useCallback, useEffect, useState} from "react";
import {LeafletMouseEvent, Map} from "leaflet";
import {setArea, setLat, setLng, setPerimeter, setPoint} from "../../store/modules/settings/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/modules/rootReducer.ts";
import {SettingsActionTypes} from "../../store/modules/settings/reducers";
import {Circle, Marker, Popup, Rectangle} from "react-leaflet";
import {IArea, IPerimeter, IPoint} from "../../shared/types";

const Home = () => {
    const dispatch = useDispatch()
    const {settings, areas, perimeters, points} = useSelector((state: RootState) => state)

    const [map, setMap] = useState<Map | null>(null);

    const calculateHaversineDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number => {
        const R = 6371; // Raio da Terra em quilômetros
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const handleMouseDown = useCallback((event: LeafletMouseEvent) => {
        if (!map) return
        if (settings.type === SettingsActionTypes.NEW_POINT || settings.type === SettingsActionTypes.EDIT_POINT) {
            dispatch(setPoint({
                ...settings.point,
                lat: event.latlng.lat,
                lng: event.latlng.lng
            }))
            return true;
        }
        if (settings.type === SettingsActionTypes.NEW_AREA || settings.type === SettingsActionTypes.EDIT_AREA) {
            dispatch(setArea({
                ...settings.area,
                lat: event.latlng.lat,
                lng: event.latlng.lng,
                radius: 0
            }))
            return true;
        }
        if (settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) {
            dispatch(setPerimeter({
                ...settings.perimeter,
                initial: {
                    lat: event.latlng.lat,
                    lng: event.latlng.lng
                },
                final: {
                    lat: event.latlng.lat,
                    lng: event.latlng.lng
                }
            }))
            return true;
        }
    }, [map, settings.type, settings.point, settings.area, settings.perimeter, dispatch])

    const handleMouseUp = useCallback((event: LeafletMouseEvent) => {
        if (!map) return
        if (settings.type === SettingsActionTypes.NEW_AREA || settings.type === SettingsActionTypes.EDIT_AREA) {
            const distance = calculateHaversineDistance(
                settings.area.lat,
                settings.area.lng,
                event.latlng.lat,
                event.latlng.lng
            );

            dispatch(setArea({
                ...settings.area,
                radius: distance
            }))
        }
        if (settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) {
            dispatch(setPerimeter({
                ...settings.perimeter,
                final: {
                    lat: event.latlng.lat,
                    lng: event.latlng.lng
                }
            }))
            return true;
        }
    }, [map, settings.type, settings.area, settings.perimeter, dispatch])

    useEffect(() => {
        if (map) {
            map.on("mousedown", handleMouseDown)
            map.on("mouseup", handleMouseUp)
            return () => {
                map.off("mousedown", handleMouseDown)
                map.off("mouseup", handleMouseUp)
            }
        }
    }, [map, handleMouseDown, handleMouseUp])

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    dispatch(setLat(latitude));
                    dispatch(setLng(longitude));
                },
                (error) => {
                    console.error("Erro ao obter localização:", error.message);
                }
            );
        }
    }, [dispatch]);

    return (
        <div style={{gridArea: settings.type !== SettingsActionTypes.VIEW_IN_MAP ? "2 / 2 / 6 / 6" : "1 / 2 / 6 / 6"}}>
            {(settings.lat && settings.lng) &&
                <MapContainer
                    key={`${settings.lat}-${settings.lng}-${settings.zoom}-${settings.type}`}
                    center={[settings.lat, settings.lng]}
                    zoom={settings.zoom}
                    style={{width: "100%", height: "100%"}}
                    maxBoundsViscosity={0.8}
                    scrollWheelZoom={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                    dragging={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                    attributionControl={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                    zoomControl={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                    doubleClickZoom={settings.type === SettingsActionTypes.VIEW_IN_MAP}
                    ref={setMap}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        (settings.type === SettingsActionTypes.NEW_POINT || settings.type === SettingsActionTypes.EDIT_POINT) &&
                        <Marker position={[settings.point.lat, settings.point.lng]}>
                            <Popup>
                                {settings.point.description}
                            </Popup>
                        </Marker>
                    }
                    {
                        (settings.type === SettingsActionTypes.NEW_AREA || settings.type === SettingsActionTypes.EDIT_AREA) &&
                        <Circle
                            center={[settings.area.lat, settings.area.lng]}
                            radius={settings.area.radius * 1000}
                            pathOptions={{color: "rgb(0, 0 , 255)", fillColor: "rgba(0, 0 , 255, 0.2)"}}
                        >
                            <Popup>
                                {settings.area.description}
                            </Popup>
                        </Circle>
                    }
                    {
                        (settings.type === SettingsActionTypes.NEW_PERIMETER || settings.type === SettingsActionTypes.EDIT_PERIMETER) &&
                        <Rectangle
                            bounds={[
                                [settings.perimeter.initial.lat, settings.perimeter.initial.lng],
                                [settings.perimeter.final.lat, settings.perimeter.final.lng],
                            ]}
                            pathOptions={{color: "rgb(0, 0 , 0)", opacity: 1, fillColor: "transparent", dashArray: "3, 12"}}
                        >
                            <Popup>
                                {settings.perimeter.description}
                            </Popup>
                        </Rectangle>
                    }

                    {
                        settings.type === SettingsActionTypes.VIEW_IN_MAP &&
                        <>
                            {
                                points.map((point: IPoint) => (
                                    point.viewMap &&
                                    <Marker key={point.id} position={[point.lat, point.lng]}>
                                        <Popup>
                                            {point.description}
                                        </Popup>
                                    </Marker>
                                ))
                            }
                            {
                                areas.map((area: IArea) => (
                                    area.viewMap &&
                                    <Circle
                                        key={area.id}
                                        center={[area.lat, area.lng]}
                                        radius={area.radius * 1000}
                                        pathOptions={{color: "rgb(0, 0 , 255)", fillColor: "rgba(0, 0 , 255, 0.2)"}}
                                    >
                                        <Popup>
                                            {area.description}
                                        </Popup>
                                    </Circle>
                                ))
                            }
                            {
                                perimeters.map((perimeter: IPerimeter) => (
                                    perimeter.viewMap &&
                                    <Rectangle
                                        key={perimeter.id}
                                        bounds={[
                                            [perimeter.initial.lat, perimeter.initial.lng],
                                            [perimeter.final.lat, perimeter.final.lng],
                                        ]}
                                        pathOptions={{color: "rgb(0, 0 , 0)", opacity: 1, fillColor: "transparent", dashArray: "3, 12"}}
                                    >
                                        <Popup>
                                            {perimeter.description}
                                        </Popup>
                                    </Rectangle>
                                ))
                            }
                        </>
                    }
                </MapContainer>
            }
        </div>
    )
}

export default Home
