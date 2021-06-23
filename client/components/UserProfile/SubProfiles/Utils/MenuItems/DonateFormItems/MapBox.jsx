import React, { Component } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../../../../../../../public/assets/mapbox.css";
import { Form, Input, Icon, Header, Accordion, Dropdown, Segment, Divider } from "semantic-ui-react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = "pk.eyJ1IjoiZW1pbHlhc2FybyIsImEiOiJja29uODBhZmMwY2xiMndwM3V3dnMxd3JpIn0.-aPNERh8iwRHxLDODbb2ew";

// TODO change this all to TARGETPOPULATION and make TARGET POPULATION "CONFIRM DONATION"

export default class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 5,
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
