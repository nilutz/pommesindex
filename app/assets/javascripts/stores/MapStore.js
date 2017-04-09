/**
 * 
 */
const Reflux = require('reflux');
const MapActions = require("../actions/MapActions");
const { ApiCalls } = require("../utils/ApiCalls");


var MapStore = Reflux.createStore({
    init() {
        this.listenTo(MapActions.getMoreMarkers, this.onGetMoreMarkers);
        this.listenTo(MapActions.putPlaceOnMap, this.onPutPlaceOnMap);
        this.listenTo(MapActions.deletePlaceOnMap, this.onDeletePlaceOnMap);

        this.markers = [];
        this.place = [];
    },

    initMarkers(markers) {
        if (markers) {
            this.markers = markers;
        } else {
            // If server rendering is disabled, we must get post from API
            this._getMarkers();
        }
    },

    onGetMoreMarkers(lat, lng, radius, limit) {
        // Get more posts from server
        this._getMarkers(lat, lng, radius, limit);
    },

    // _getMarkers(radius = 1000) {
    //     ApiCalls.getMarkers(radius).done( (markers) => {
    //         this.markers = this.markers.concat(markers);
    //         this.trigger();
    //     });
    // }
    _getMarkers(lat, lng, radius, limit) {
        ApiCalls.getMarkersNear(lat, lng, radius, limit).done((markers) => {
            this.markers = this.markers.concat(markers);
            this.trigger();
        });
    },
    onPutPlaceOnMap(lat, lng) {
        this.place = [{
            "_id": {
                "$oid": "dummy123"
            },
            "pindex": "3",
            "userId": "2",
            "location": {
                "type": "Point",
                "coordinates": [
                    lat,
                    lng
                ]
            }
        }];
        this.trigger();


    },
    onDeletePlaceOnMap(lat, lng) {

        // if (this.place.location.coordinates.lat = lat) {
        //     this.place = []
        // }
    }

});

module.exports = MapStore;
