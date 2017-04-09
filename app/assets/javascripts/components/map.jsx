import React, {PropTypes, Component} from 'react';
// import { Link } from 'react-router';
// import { example, p, link } from './styles';
import Reflux from 'reflux' ;
const { RefluxComponent } = require("react-commons");

import shouldPureComponentUpdate from 'react-pure-render/function';

//
import GoogleMap from 'google-map-react';
import PommesMarker from './pommesMarker.jsx';
import PlaceMarker from './placeMarker.jsx'
import MapActions from '../actions/MapActions';
import MapStore from '../stores/MapStore';

import MyGreatPlace from './my_great_place.jsx'

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

    //load markers if not already loaded
    if(MapStore.markers.length == 0){
      var lat = this.props.center[0]
      var lng = this.props.center[1]
      var limit = 100

      var radius = 300000
      MapActions.getMoreMarkers(lat, lng, radius, limit);
    }

  }

  componentDidMount(){
      this.listenToStore(MapStore, this.onMapStoreChange)
  }
  
  onMapStoreChange = () => this.forceUpdate();  // Re-render the post list of PostStore has changed


  //when clicked on the map a new marker appears
  handleMapClick(event) {

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
         
        
          {MapStore.markers.map((marker, index) => {
              return (
                <PommesMarker
                  lat={marker.location.coordinates[0]}
                  lng={marker.location.coordinates[1]}
                  text={marker.pindex}
                  key={marker._id.$oid}
                ></PommesMarker>
              );
          })}
          {MapStore.place.map((marker,index) =>{
              return (
                <PlaceMarker
                  lat={marker.location.coordinates[0]}
                  lng={marker.location.coordinates[1]}
                  key={marker._id.$oid}
                ></PlaceMarker>
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
  };

  Map.defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

export default Map;