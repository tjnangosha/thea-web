import { useCustom } from '@refinedev/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ResponseLocation, ResponseSubjectsLocationLatest } from '../../interfaces';
import { API_URL } from '../../providers';
import { useGetLatestLocations, usePageTitle } from '../../hooks';
import { useRef } from 'react';

const CustomMarker = L.icon({
    iconUrl: "https://static.vecteezy.com/system/resources/previews/010/977/110/non_2x/blue-gradient-circle-free-png.png",
    iconSize: [15, 15], // we could so something like adjust this size on map zoom
})

const ToggleMapFullScreenButton = ({ toggleMapFullScreen }) => {
    return <div style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '0px',
        borderRadius: '4px',
        top: '20px',
        right: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
        <button 
            onClick={toggleMapFullScreen}
            style={{
                padding: '8px 16px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white'
            }}
        >
            Toggle Fullscreen
        </button>
    </div>
}

export const HotspotsPage = () => {
    usePageTitle("Hotspots | Thea");

    const { data } = useGetLatestLocations()
    const mapRef = useRef(null);

    const toggleMapFullScreen = () => {
        if (mapRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                mapRef.current?.requestFullscreen();
            }
        }
    }

    return (
        <div id="map" ref={mapRef} >
            <MapContainer  center={[0.3476, 32.5825]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {/* TODO: this could be a subject for some optimisation.
                    Many markers cause the rendering to be very slow
                    especially when all of them are rendered at once when the map is
                    being drawn the first time.
                    that is obviously not what we want.https://youtu.be/lTRiuFIWV54?si=e8bJSUWT796J0m6G
                 */}
                {data?.data.data.map((position, index) => {
                    return (<Marker key={index} position={[position.latitude, position.longitude]} icon={CustomMarker}>
                        {/* <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> */}
                    </Marker>)
                })}
                <ToggleMapFullScreenButton toggleMapFullScreen={toggleMapFullScreen} />
            </MapContainer>
        </div>
      
    );
}