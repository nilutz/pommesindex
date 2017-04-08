import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './my_great_place_styles.js';

export default class MyGreatPlace extends Component {
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
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}

  MyGreatPlace.propTypes = {
    text: PropTypes.string
  };

  MyGreatPlace.defaultProps = {};