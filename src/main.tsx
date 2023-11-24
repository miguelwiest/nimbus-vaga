import React from 'react'
import ReactDOM from 'react-dom/client'
import "leaflet/dist/leaflet.css";
import "./shared/styles/global.scss";
import ReduxApp from "./store/ReduxApp.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxApp />
  </React.StrictMode>,
)
