import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import ContactForm from './components/ContactForm';
import Portfolio from './components/Portfolio';
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
			portfolioActive: false
		};
		this.nextActiveImage = this.nextActiveImage.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
		this.openPortfolio = this.openPortfolio.bind(this);
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				activeImageSrcIndex: 0
			});
			this.startAnimation(); 
		},
		0);
	}
	startAnimation(){
		var duration = Number(SITE_TRANSITION_DURATION) * 1000; //Uses a constant defined by wepack
		var intervalId = setInterval(this.nextActiveImage, duration);
		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
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
	openPortfolio(){
		this.setState({
			portfolioActive: true
		});
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
				<div 
					id="hover-div"
					onClick={() => this.setState({portfolioActive: true})}
				>
					<h1>PORTFOLIO</h1>
				</div>
				<Portfolio 
					active={this.state.portfolioActive} 
					close={() => this.setState({portfolioActive: false})}
				/>
			</span>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));