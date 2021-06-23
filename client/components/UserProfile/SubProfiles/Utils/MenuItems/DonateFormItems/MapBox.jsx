import React, { Component } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../../../../../../../public/assets/mapbox.css";
import { Icon, Header, Accordion, Segment } from "semantic-ui-react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = "pk.eyJ1IjoiZW1pbHlhc2FybyIsImEiOiJja29uODBhZmMwY2xiMndwM3V3dnMxd3JpIn0.-aPNERh8iwRHxLDODbb2ew";
import recipients from "../../../../../../../server/db/seed/recipient-locations.json";


export default class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 3,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // Stores the new state when user interacts with the map
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', function () {
      map.resize(); // shifts view when user moves around on map

      map.addSource('recipients', {
        'type': 'geojson',
        'data': recipients,
        });


      map.addLayer(
        {
          'id': 'recipients-heat',
          'type': 'heatmap',
          'source': 'recipients',
          'maxzoom': 9,
          'paint': {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              0,
              0,
              6,
              1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0
            ]
          }
        },
        'waterway-label'
        );

        map.addLayer(
          {
            'id': 'recipients-point',
            'type': 'circle',
            'source': 'recipients',
            'minzoom': 7,
            'paint': {
              // Size circle radius by earthquake magnitude and zoom level
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                16,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
              ],
              // Color circle by earthquake magnitude
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                1,
                'rgba(33,102,172,0)',
                2,
                'rgb(103,169,207)',
                3,
                'rgb(209,229,240)',
                4,
                'rgb(253,219,199)',
                5,
                'rgb(239,138,98)',
                6,
                'rgb(178,24,43)'
              ],
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              // Transition from heatmap to circle layer by zoom level
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                0,
                8,
                1
              ]
            }
          },
        'waterway-label'
        );
  });
  }
  render() {
    const { active, handleClick } = this.props;
    return (
      <React.Fragment>
        <Accordion.Title active={active} index={2} onClick={handleClick}>
            <Header as="h4" id="donation-details-information-header">
                <Icon name="dropdown" />
                MAP
            </Header>
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Segment>
          <div ref={this.mapContainer} style={{minWidth: "300px", }} className="map-container" />
          </Segment>
        </Accordion.Content>
      </React.Fragment>
    );
  }
};
