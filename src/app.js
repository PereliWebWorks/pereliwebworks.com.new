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
			activeImageSrcIndex: 0,
			mouseEntered: false
		};
		this.nextActiveImage = this.nextActiveImage.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
	}
	componentDidMount() {
		this.startAnimation();
	}
	startAnimation(){
		var duration = Number(SITE_TRANSITION_DURATION) * 1000; //Uses a constant defined by wepack
		var intervalId = setInterval(this.nextActiveImage, duration);
		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
	}
	onMouseEnter(){
		clearInterval(this.state.intervalId);
	}
	onMouseLeave(){
		this.startAnimation();
	}
	componentWillUnmount() {
	  // use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	}
	nextActiveImage(){
		if (this.state.activeImageSrcIndex === this.state.siteImageSrcs.length - 1)
			this.setState({activeImageSrcIndex: 0});
		else
			this.setState({activeImageSrcIndex: ++this.state.activeImageSrcIndex});
	}
	render() {
		var siteImages = this.state.siteImageSrcs.map((src, i) => {
			let className = 'site-image' + (i === this.state.activeImageSrcIndex ? ' active' : '');
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