import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostContent from './PostContent.js'
import PostsList from './PostsList.js'
import NoRouteMatch from './NoRouteMatch.js'
import $ from 'jquery'; 

const url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?';

class SwitchRender extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}

	componentDidMount(){
		var query = url;
		var i;  
		$.getJSON(query, function(data){
			i=data;
			this.setState({data: i.items});
		}.bind(this));
	}

	render(){

		var data = this.state.data;
		// console.log(data)

		return (

			<Switch>
				<Route name="post" path="/:post" render={props => (
					<PostContent data={data} />)}/>
				<Route path="/" render={props => (
					data.map((entry)=>(
						<PostsList key={entry.title} entry={entry} />
					)))} />
				<Route component={ NoRouteMatch } />
			</Switch>
		);
	}
}

export default SwitchRender