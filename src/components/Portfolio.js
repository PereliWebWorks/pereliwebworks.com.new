import React from 'react';
import sites from '../sites.json';

export default class Portfolio extends React.Component{


	render(){
		let className = this.props.active ? 'active' : '';
		let siteElements = sites.map((s,i) => <li key={i}><a target="_blank" href={s.url}>{s.name}</a></li>);
		return(
			<div 
				id="portfolio-container" 
				className={className}
			>
				<div id="portfolio">
					<ul>{siteElements}</ul>
				</div>
				<div id="portfolio-btn" className="btn open-btn" onClick={this.props.toggle}>PORTFOLIO</div>
				<div id="portfolio-close-btn" className="btn close-btn" onClick={this.props.toggle}>X</div>
			</div>
		);
	}
}