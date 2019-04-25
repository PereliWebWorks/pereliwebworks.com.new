import React from 'react';
import sites from '../sites.json';

export default class Portfolio extends React.Component{
	render(){
		let className = this.props.active ? 'active' : '';
		let siteElements = sites.map((s,i) => <li><a target="_blank" href={s.url} key={i}>{s.name}</a></li>);
		return(
			<div 
				id="portfolio-container" 
				className={className}
				onClick={this.props.close}
			>
				<div id="portfolio">
					<ul>{siteElements}</ul>
				</div>
				<span className="btn close-btn"
				>X</span>
			</div>
		);
	}
}