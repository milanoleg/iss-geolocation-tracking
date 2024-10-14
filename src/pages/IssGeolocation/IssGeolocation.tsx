import { MapContainer, TileLayer, Marker, LayerGroup, Circle } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';

import useGetCurrentGeolocation from 'hooks/useGetCurrentGeolocation';

import issMarker from 'assets/images/iss-marker.png';

import 'leaflet/dist/leaflet.css';
import './IssGeolocation.scss';

const icon = L.icon({
    iconUrl: issMarker,
    iconSize: [45, 30],
});

const IssGeolocation = () => {
    const { issGeolocation, isGeolocationLoading, refetch } = useGetCurrentGeolocation();
    const refetchPosition = () => refetch();


    if (isGeolocationLoading) {
        return (
            <div>Loading...</div>
        );
    }

    const { issPosition, timestamp } = issGeolocation;
    const position = [+issPosition.latitude, +issPosition.longitude] as LatLngTuple;
    const rawDate = new Date(timestamp * 1000);
    const lastUpdatedDate = rawDate.toLocaleString();

    return (
        <div className="container">
            <h1>ISS Position</h1>
            <MapContainer center={position} zoom={3} className="map-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LayerGroup>
                    <Circle center={position} radius={600000} />
                    <Marker position={position} autoPan icon={icon} />
                </LayerGroup>



            </MapContainer>
            <div className="map-info">
                <div>Latitude: {issPosition.latitude}</div>
                <div>Longitude: {issPosition.longitude}</div>
            </div>
            <div className="info">
                <div>
                    Last updated: {lastUpdatedDate}
                </div>
                <div>
                    <button className="refetch-button" onClick={refetchPosition}>
                        Get current position
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IssGeolocation;