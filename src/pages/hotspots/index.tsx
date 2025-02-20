import { CrudFilters, HttpError, useCustom } from '@refinedev/core';
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, Popup, LayerGroup } from 'react-leaflet'
import L from 'leaflet'
import { API_URL } from '../../providers';
import { useGetLatestLocations, usePageTitle, useGetLatestSnappedLocations } from '../../hooks';
import { useRef, useState } from 'react';
import { Row , Form, Input, Button, DatePicker} from 'antd';
import { FilterOutlined } from "@ant-design/icons";

const MarkerCoarseLocation = L.divIcon({
    html: `<svg viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#2196F3" opacity="0.8"/>
    </svg>`,
    className: "",
    iconSize: [24, 24],
  });

const MarkerSnappedLocation = L.divIcon({
    html: `<svg viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#12e38c" opacity="0.8"/>
    </svg>`,
    className: "",
    iconSize: [24, 24],
})


const ToggleMapFullScreenButton = ({ toggleMapFullScreen }: any) => {
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

// const calculateMapCenter = (points) => {
//     if (!points || points.length === 0) {
//         return [0.3476, 32.5825]; // Default center coordinates
//     }

//     const sumLat = points.reduce((sum, point) => sum + point.latitude, 0);
//     const sumLng = points.reduce((sum, point) => sum + point.longitude, 0);
    
//     return [sumLat / points.length, sumLng / points.length];
// };

export const HotspotsPage = () => {
    usePageTitle("Hotspots | Thea");

    const [subjectId, setSubjectId] = useState();
    const [coordsStartDate, setcoordsStartDate] = useState()
    const [coordsEndDate, setcoordsEndDate] = useState()
    const { locations, showSingleSubjectLocations } = useGetLatestLocations(subjectId, coordsStartDate, coordsEndDate)
    const { snappedLocations, showSingleSubjectSnappedLocations } = useGetLatestSnappedLocations(subjectId, coordsStartDate, coordsEndDate)
    const mapRef = useRef(null);

    const toggleMapFullScreen = () => {
        if (mapRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                // @ts-expect-error
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
                <MapContainer center={[0.3476, 32.5825]} zoom={20} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LayersControl position="bottomright">
                        <LayersControl.Overlay name="Coarse locations" checked>
                            <LayerGroup>
                                {showSingleSubjectLocations && 
                                    <Polyline 
                                        // @ts-ignore
                                        positions={locations?.data.data.map((position) => [position.latitude, position.longitude])}
                                        color="#2196F3"
                                        weight={3}
                                        opacity={0.7}
                                />}
                                {locations?.data.data.map((position, index) => {
                                    // @ts-ignore
                                    return (<Marker key={index} position={[position.latitude, position.longitude]} icon={MarkerCoarseLocation}>
                                    </Marker>);
                                })}
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="Snapped locations" checked>
                            <LayerGroup>
                                {showSingleSubjectSnappedLocations &&
                                    <Polyline 
                                        // @ts-ignore
                                        positions={snappedLocations?.data.data.map((position) => [position.snapped_latitude, position.snapped_longitude])}
                                        color="#12e38c"
                                        weight={3}
                                        opacity={0.7}
                                />}
                                {snappedLocations?.data.data.map((position, index) => {
                                    // @ts-ignore
                                    return (<Marker key={index} position={[position.snapped_latitude, position.snapped_longitude]} icon={MarkerSnappedLocation}>
                                    </Marker>);
                                })}
                            </LayerGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                    <ToggleMapFullScreenButton toggleMapFullScreen={toggleMapFullScreen} />
                </MapContainer>
            </div>
        </>
      
    );
}
