import React, { useState, useEffect } from 'react';
import MapContext from './MapContext';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';


const Map = ({ children }) => {
    const [mapObj, setMapObj] = useState({});

    useEffect(() => {
        const map = new OlMap({
            controls: defaultControls({ zoom: false, rotate: false }).extend([]),
            layers: [
                new TileLayer({
                    source: new OSM(),
                })
            ],
            target: 'map',
            view: new View({
                projection: getProjection('EPSG:3857'),
                center: fromLonLat([127.9745613, 37.3236563], getProjection('EPSG:3857')),
                zoom: 15,
            }),
        });

        setMapObj({ map });
        return () => map.setTarget(undefined);
    }, []);

    return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>;
};

export default Map;
