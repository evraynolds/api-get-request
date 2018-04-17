import React from 'react';
import { Link } from 'react-router-dom';
import SwitchRender from './SwitchRender.js'
 
const PostsList = ({entry}) =>{

	var splitName = entry.author.split('"');
	var date = new Date(entry.published);
	date = date.toString().split('G');
	var profileLink = entry.description.split('"');

	return (
		<div className="post">
			<Link className="imageLink" to={entry.title}  >
				<img src={entry.media.m} alt={entry.title} />
			</Link>
			<div className="postText">
				<Link className="titleLink" to={entry.title}  >
					<p>{entry.title}</p>
				</Link>
				<div className="postDetails">
					<a href={profileLink[1]} target="_blank">
						<p className="authorName">{splitName[1]}</p>
					</a>
					<p className="pubDate">Published on {date[0]}</p>
					<a href={entry.link} target="_blank">View on Flickr</a>
				</div>
			</div>
		</div>
	);
}

export default PostsList