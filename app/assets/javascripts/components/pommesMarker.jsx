import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {PommesMarkerStyle} from './pommesMarker_style.js';

export default class PommesMarker extends Component {
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
    this.shouldComponentUpdate = shouldPureComponentUpdate;
  }

  render() {
    return (
       <div style={PommesMarkerStyle}>
          {this.props.text}
       </div>
    );
  }
}

  PommesMarker.propTypes = {
    text: PropTypes.string
  };

  PommesMarker.defaultProps = {};