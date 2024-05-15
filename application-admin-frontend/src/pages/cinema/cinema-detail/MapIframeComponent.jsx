import React from 'react';

const MapIframeComponent = ({ mapLocation }) => {
    return (
        <div style={{ width: '100%' }}>
            <iframe
                src={mapLocation}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
};

export default MapIframeComponent;