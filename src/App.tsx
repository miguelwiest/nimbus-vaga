import Home from "./pages/home";
import LeftBar from "./components/LeftBar";
import TopBar from "./components/TopBar";
import {useEffect} from "react";
import {getAreas, getPerimeters, getPoints} from "./shared/services";
import {useDispatch, useSelector} from "react-redux";
import {setAreas} from "./store/modules/areas/actions";
import {setPoints} from "./store/modules/points/actions";
import {setPerimeters} from "./store/modules/perimeters/actions";
import {RootState} from "./store/modules/rootReducer.ts";
import {SettingsActionTypes} from "./store/modules/settings/reducers";

const App = () => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state: RootState) => state)
    useEffect(() => {
        getAreas().then((data) => {
            dispatch(setAreas(data))
        })
        getPerimeters().then((data) => {
            dispatch(setPerimeters(data))
        })
        getPoints().then((data) => {
            dispatch(setPoints(data))
        })
    }, [dispatch])



    return (
        <main id="main">
            { settings.type !== SettingsActionTypes.VIEW_IN_MAP && <TopBar/>}
            <LeftBar/>
            <Home/>
        </main>
    )
}


export default App
