import React from 'react';
import { render } from 'react-dom';
import Greeter from './components/Greeter.jsx';
import Map from './components/map.jsx'

import '../stylesheets/style.scss'

render((
    <div>
        <h1>Welcome to the Pommesindex
    	</h1>
        <Greeter name="UserId" />
        <Map name="map" />
    </div>), document.getElementById("app"));