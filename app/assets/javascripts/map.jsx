import React, {PropTypes, Component} from 'react';
// import { Link } from 'react-router';
// import { example, p, link } from './styles';

import shouldPureComponentUpdate from 'react-pure-render/function';

//
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';


function _onClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);

}

  // style and options
function createMapOptions(maps) {
  return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
  }
}



class Map extends React.Component {



  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }


  //when clicked on the map a new marker appears
  handleMapClick(event) {

      console.log(event)

  }

  //when clicking on the marker it disappears
  handleMarkerDeleteclick(childKey, childProps, event) {
    
  }


  render() {
    return (
      <div style={{position:'absolute',width: '100%', height: '100%'}}>

         <GoogleMap
          onClick={this.handleMapClick.bind(this)} 
          options={createMapOptions} 
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
          <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
        </GoogleMap>

      </div>
    );
  }
}

  Map.propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  Map.defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

export default Map;