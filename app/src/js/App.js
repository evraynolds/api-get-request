import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import SwitchRender from './SwitchRender';

ReactDOM.render( 
	<Router>
		<SwitchRender />
	</Router>, 
	document.getElementById('root')
);