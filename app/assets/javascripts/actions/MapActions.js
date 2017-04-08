/**
 * 
 */
const Reflux = require('reflux');

var MapActions = {
    init: Reflux.createAction(),
    getMoreMarkers: Reflux.createAction(),
    putPlaceOnMap: Reflux.createAction(),
    deletePlaceOnMap: Reflux.createAction()
};


module.exports = MapActions;