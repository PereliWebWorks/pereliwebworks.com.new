import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import ContactForm from './components/ContactForm';
import Portfolio from './components/Portfolio';
import sites from './sites.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faArchive, faTimes } from '@fortawesome/free-solid-svg-icons';

import * as email from 'emailjs-com';
email.init('user_p3U6yOeIFlL2D0yIjchi6');

library.add(faEnvelope, faArchive, faTimes);

class App extends React.Component {
	constructor(){
		super();
		let siteImageSrcs = sites.filter(s => 'fileName' in s).map(s => require('./img/site_screenshots/' + s.fileName));
		this.state = {
			siteImageSrcs,
			activeImageSrcIndex: false,
			fadeInImageSrcIndex: false,
			fadeOutImageSrcIndex: false,
			portfolioActive: false
		};
		this.startAnimation = this.startAnimation.bind(this);
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				fadeInImageSrcIndex: 0
			});
			this.startAnimation(); 
		},
		0);
	}
	startAnimation(){
		var scrollDuration = 4000;
		var fadeDuration = 1000;
		this.animateSiteImages(scrollDuration, fadeDuration); //First, call it immediately (setInterval waits to start)
		var intervalId = setInterval(() => this.animateSiteImages(scrollDuration, fadeDuration), fadeDuration + scrollDuration);

		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
	}
	componentWillUnmount() {
	  // use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	}
	//Will be called every at the start of the "scroll" phase of each image animation
	animateSiteImages(scrollDuration, fadeDuration){
		//Set fadeIn image to active
		//Unset the fade in and fade out images
		this.setState(state => ({
					activeImageSrcIndex: state.fadeInImageSrcIndex !== false ? state.fadeInImageSrcIndex : state.activeImageSrcIndex,
					fadeInImageSrcIndex: false,
					fadeOutImageSrcIndex: false
				}));
		//Get src index of next image
		var nextImgSrcIndex;
		if (this.state.activeImageSrcIndex === this.state.siteImageSrcs.length - 1)
			nextImgSrcIndex = 0;
		else
			nextImgSrcIndex = this.state.activeImageSrcIndex + 1;
		//Set timeout for starting fade animation 
		setTimeout(() => {
			this.setState(state => ({
							fadeInImageSrcIndex: nextImgSrcIndex,
							fadeOutImageSrcIndex: state.activeImageSrcIndex,
							activeImageSrcIndex: false
						}));
		}, scrollDuration);
	}
	
	render() {
		var siteImages = this.state.siteImageSrcs.map((src, i) => {
			let className = 'site-image';
			if (i === this.state.activeImageSrcIndex) className += ' active';
			else if (i === this.state.fadeInImageSrcIndex) className += ' fade-in';
			else if (i === this.state.fadeOutImageSrcIndex) className += ' fade-out';
			let style = `background-image: url('${src}')`;
			return (
				<div 
					className={className} 
					key={i}
					style={{backgroundImage: 'url(' + src + ')'}}
				></div>
				);
		});
		
		return (
			<span>
				<ContactForm />
				<div id="main-background"></div>
				{siteImages}
				<div 
					id="hover-div"
					onClick={() => this.setState({portfolioActive: true})}
				>
					<h1>PORTFOLIO</h1>
				</div>
				<Portfolio 
					active={this.state.portfolioActive} 
					toggle={() => this.setState(state => ({portfolioActive: !state.portfolioActive}))}
				/>
			</span>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));