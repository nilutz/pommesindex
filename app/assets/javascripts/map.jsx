import React, {PropTypes, Component} from 'react';
// import { Link } from 'react-router';
// import { example, p, link } from './styles';
const { RefluxComponent } = require("react-commons");

import shouldPureComponentUpdate from 'react-pure-render/function';

//
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';
import MapActions from './MapActions';
import MapStore from './MapStore';

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



class Map extends RefluxComponent {



  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
       //MapActions.getMoreMarkers(0);

  }

  componentDidMount(){
      this.listenToStore(MapStore, this.onMapStoreChange)
  }
  
  onMapStoreChange = () => this.forceUpdate();  // Re-render the post list of PostStore has changed


  //when clicked on the map a new marker appears
  handleMapClick(event) {

      console.log(event)
      //MapActions.getMoreMarkers(0);
      MapActions.putPlaceOnMap(event.lat,event.lng)

  }

  //when clicking on the marker it disappears
  handleMarkerDeleteclick(childKey, childProps, event) {
      // MapActions.deletePlaceOnMap(event.lat,event.lng)
  }


  render() {  
    return (
      <div style={{position:'absolute',width: '100%', height: '100%'}}>

         <GoogleMap
          onClick={this.handleMapClick.bind(this)} 
          onChildClick = {this.handleMarkerDeleteclick.bind(this)}

          options={createMapOptions} 
          center={this.props.center}
          zoom={this.props.zoom}>
          <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
          <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
        
          {MapStore.markers.map((marker, index) => {
              console.log(marker.location.coordinates[0])
              return (
                <MyGreatPlace
                  lat={marker.location.coordinates[0]}
                  lng={marker.location.coordinates[1]}
                  text={marker.userId}
                  key={marker._id.$oid}

                ></MyGreatPlace>
              );
          })}
          {MapStore.place.map((marker,index) =>{
              return (
                <MyGreatPlace
                  lat={marker.location.coordinates[0]}
                  lng={marker.location.coordinates[1]}
                  text={marker.userId}
                  key={marker._id.$oid}

                ></MyGreatPlace>
              );
          })}

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