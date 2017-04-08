import React from 'react';
import { render } from 'react-dom';
import Greeter from './components/Greeter.jsx';
import Map from './components/map.jsx'

import '../stylesheets/style.scss'

render((
    <div>
        <h1>Playframework, React JS, ES 6 and webpack AND a fucking Rest API in Scala
    	</h1>
        <Greeter name="Ninja" />
        <Map name="map" />
    </div>), document.getElementById("app"));