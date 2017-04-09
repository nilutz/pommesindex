import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {PlaceMarkerStyle} from './placeMarker_style.js';
import { ApiCalls } from "../utils/ApiCalls";


export default class PlaceMarker extends Component {
      /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.
    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */
  
  // static propTypes = {
  //   text: PropTypes.string
  // };

  // static defaultProps = {};


  constructor(props) {
    super(props);
    this.state = {
            "_id": {
                "$oid": "dummy123"
            },
            "pindex": '',
            "userId": "dummy123",
            "location": {
                "type": "Point",
                "coordinates": [
                    this.props.lat,
                    this.props.lng
                ]
            }
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.shouldComponentUpdate = shouldPureComponentUpdate;
  }

    handleChange(event) {
    this.setState({
            "_id": {
                "$oid": "dummy123"
            },
            "pindex": event.target.value,
            "userId": "2",
            "location": {
                "type": "Point",
                "coordinates": [
                    this.props.lat,
                    this.props.lng
                ]
            }
        }
        );
  }

  handleSubmit(event) {
    
    ApiCalls.postMarker(this.state)
    
    alert('A pommesindex was submitted: ' + this.state.value);
    event.preventDefault();

    this.forceUpdate()
  }

  render() {
    return (
       <div style={PlaceMarkerStyle}>
          <form onSubmit={this.handleSubmit}>
             <label>
                Your Pommesindex:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            <input type="submit" value="Submit" />
          </form>
       </div>
    );
  }
}

  // PlaceMarker.propTypes = {
  //   text: PropTypes.string
  // };

  // PlaceMarker.defaultProps = {};