import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import ContactForm from './components/ContactForm';
import sites from './sites.json';

class App extends React.Component {
	constructor(){
		super();
		var siteImageElements = [];
		sites.forEach((img, i) => {
			let className = 'site-image';
			let src = require('./img/site_screenshots/' + img.fileName);
			let el = <img src={src} className={className} key={i} />
			siteImageElements.push(el);
		});

		this.state = {
			siteImageSrcs: sites.map(s => require('./img/site_screenshots/' + s.fileName)),
			activeImageSrcIndex: false,
			fadeInImageSrcIndex: 0,
			fadeOutImageSrcIndex: false,
			mouseEntered: false
		};
		this.animateSiteImages = this.animateSiteImages.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
	}
	componentDidMount() {
		this.startAnimation();
	}
	startAnimation(){
		var scrollDuration = 3000;
		var fadeDuration = 1000;
		var intervalId = setInterval(() => this.animateSiteImages(scrollDuration, fadeDuration), fadeDuration + scrollDuration);

		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
	}
	onMouseEnter(){
		// clearInterval(this.state.intervalId);
		
	}
	onMouseLeave(){
		// this.startAnimation();
		
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
				<div id="hover-div"
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}					
				></div>
			</span>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));