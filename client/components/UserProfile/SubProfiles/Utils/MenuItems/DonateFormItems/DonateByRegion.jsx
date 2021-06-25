import React, { Component } from "react";
import { mapboxLayer1, mapboxLayer2 } from "./mapboxLayers";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../../../../../../../public/assets/mapbox.css";
import { Icon, Header, Accordion, Segment } from "semantic-ui-react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = "pk.eyJ1IjoiZW1pbHlhc2FybyIsImEiOiJja29uODBhZmMwY2xiMndwM3V3dnMxd3JpIn0.-aPNERh8iwRHxLDODbb2ew";
import recipients from "../../../../../../../server/db/seed/recipients.json";


export default class DonateByRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98.2832,
      lat: 38.4106,
      zoom: 3,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
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

    map.on('load', function() {
      // map.resize(); // shifts view when user moves around on map
      map.addSource('recipients', {
        'type': 'geojson',
        'data': recipients,
        });

      map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          })
      );

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());

      // Adds the heatmap data layer
      map.addLayer(mapboxLayer1, 'waterway-label');
      map.addLayer(mapboxLayer2, 'waterway-label');

    })
  }
  render() {
    const { active, handleClick } = this.props;
    return (
      <React.Fragment>
        <Accordion.Title active={active} index={2} onClick={handleClick}>
            <Header as="h4" id="donation-details-information-header">
                <Icon name="dropdown" />
                DONATE BY REGION
            </Header>
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Header as="h5" textAlign="left" id="donate-by-region-header" content="Target your donation by geographic communities" />
          <Segment style={{minWidth: "500px", height: "480px" }}>
            <div ref={this.mapContainer} style={{minWidth: "100%", height: "100%" }} className="map-container" />
          </Segment>
        </Accordion.Content>
      </React.Fragment>
    );
  }
};
