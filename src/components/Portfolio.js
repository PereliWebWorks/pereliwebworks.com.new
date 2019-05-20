import React from 'react';
import sites from '../sites.json';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default class Portfolio extends React.Component{


	render(){
		let className = this.props.active ? 'active' : '';
		let siteElements = sites.map((s,i) => <li className="portfolio-item" key={i}><a target="_blank" href={s.url}>{s.name}</a></li>);
		return(
			<div 
				id="portfolio-container" 
				className={className}
			>
				<div id="portfolio">
					<ul>{siteElements}</ul>
				</div>
				<div id="portfolio-btn" className="btn open-btn" onClick={this.props.toggle}>PORTFOLIO <Icon icon="archive" /></div>
				<div id="portfolio-close-btn" className="btn close-btn" onClick={this.props.toggle}><Icon icon='times' /></div>
			</div>
		);
	}
}