import { CrudFilters, HttpError, useCustom } from '@refinedev/core';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { API_URL } from '../../providers';
import { useGetLatestLocations, usePageTitle } from '../../hooks';
import { useRef, useState } from 'react';
import { Row , Form, Input, Button, DatePicker} from 'antd';
import { FilterOutlined } from "@ant-design/icons";

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

    const [subjectId, setSubjectId] = useState();
    const [coordsStartDate, setcoordsStartDate] = useState()
    const [coordsEndDate, setcoordsEndDate] = useState()
    const { data, showSingleSubjectLocations } = useGetLatestLocations(subjectId, coordsStartDate, coordsEndDate)
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
        <>
            <Row gutter={[16, 16]} style={{ boxSizing: "border-box", marginLeft: 0, marginBottom: 20 }}>
                <Form 
                    layout="inline"
                    onFinish={(values) => {
                        setSubjectId(values.id);
                        if (values.dateRange) {
                            setcoordsStartDate(values.dateRange[0].format("YYYY-MM-DD"));
                            setcoordsEndDate(values.dateRange[1].format("YYYY-MM-DD"));
                        }
                    }}
                >
                    <Form.Item name="id">
                        <Input
                            placeholder="Filter subjects by ID"
                            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                            prefix={<FilterOutlined />} />
                    </Form.Item>
                    <Form.Item name="dateRange">
                        <DatePicker.RangePicker
                            placeholder={['Start date', 'End date']}
                            format="YYYY-MM-DD"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Track
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <div id="map" ref={mapRef}>
                <MapContainer center={[0.3476, 32.5825]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    {
                        showSingleSubjectLocations && 
                        <Polyline 
                            positions={data?.data.data.map((position) => [position.latitude, position.longitude])}
                            color="blue"
                            weight={3}
                            opacity={0.7}
                        />
                    }
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* TODO: this could be a subject for some optimisation.
                        Many markers cause the rendering to be very slow
                        especially when all of them are rendered at once when the map is
                        being drawn the first time.
                        that is obviously not what we want.https://youtu.be/lTRiuFIWV54?si=e8bJSUWT796J0m6G
                    */}
                    {data?.data.data.map((position, index) => {
                        return (<Marker key={index} position={[position.latitude, position.longitude]} icon={CustomMarker}>
                            {/* <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> */}
                        </Marker>);
                    })}
                    <ToggleMapFullScreenButton toggleMapFullScreen={toggleMapFullScreen} />
                </MapContainer>
            </div>
        </>
      
    );
}