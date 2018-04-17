import React from 'react';
import { Link } from 'react-router-dom';
import SwitchRender from './SwitchRender.js'
var HtmlToReactParser = require('html-to-react').Parser;

const PostContent = ({ data }) =>{
	
	let pathname = window.location.hash.toString().substring(2).split('%20').join(' ');
	// let pathname = window.location.pathname.toString().substring(1).split('%20').join(' ');
	let entry
	if(data.length === 0){
		entry = JSON.parse(localStorage.getItem("entry"))
	}
	else{
		entry = data.filter(function(value){
			return value.title == pathname;
		});
	}

	localStorage.setItem("entry", JSON.stringify(entry))

	let profileLink = entry[0].description.split('"');
	let date = new Date(entry[0].published);
	date = date.toString().split('G');
	let splitName = entry[0].author.split('"');
	let description = entry[0].description;

	var htmlInput = entry[0].description;
	var htmlToReactParser = new HtmlToReactParser();
	var reactElement = htmlToReactParser.parse(htmlInput);
	// var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);

	return (
		<div className="postContent">
			<div className="postContentHeading">
				<a href={entry[0].link} target="_blank"><h1>{entry[0].title}</h1></a>
				<Link to="/" className="backLink">Back</Link>
			</div>
			<div className="postContentSubHeading">
				<a href={profileLink[1]} target="_blank">{splitName[1]}</a>
				<p>|</p>
				<p>Published: {date[0]}</p>
			</div>
			<div className="postContentImageAndText">
				<img src={entry[0].media.m} alt={entry[0].title} />
				<div className="postContentTextAndTags">
					<p className="description">
					{reactElement[5]}
					</p>
					<ul className="postContentTags">
					<p>Tags:</p>
					{entry[0].tags.split(" ").map((item, index)=>(
							<li className="tags" key={item}>{item}</li>
					))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default PostContent