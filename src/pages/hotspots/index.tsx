import { useCustom } from '@refinedev/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ResponseLocation, ResponseSubjectsLocationLatest } from '../../interfaces';
import { API_URL } from '../../providers';
import { useGetLatestLocations, usePageTitle } from '../../hooks';

const CustomMarker = L.icon({
    iconUrl: "https://static.vecteezy.com/system/resources/previews/010/977/110/non_2x/blue-gradient-circle-free-png.png",
    iconSize: [15, 15], // we could so something like adjust this size on map zoom
})

export const HotspotsPage = () => {
    usePageTitle("Hotspots | Thea");

    const { data } = useGetLatestLocations()

    return (
        <div id="map">
            <MapContainer center={[0.3476, 32.5825]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {/* TODO: this could be a subject for some optimisation.
                    Many markers cause the rendering to be very slow
                    especially when all of them are rendered at once when the map is
                    being drawn the first time.
                    that is obviously not what we want.
                 */}
                {data?.data.data.map((position, index) => {
                    return (<Marker key={index} position={[position.latitude, position.longitude]} icon={CustomMarker}>
                        {/* <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> */}
                    </Marker>)
                })}

            </MapContainer>
        </div>
      
    );
}