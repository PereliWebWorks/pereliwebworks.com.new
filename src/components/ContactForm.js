import React from 'react';

export default class ContactForm extends React.Component{
	constructor(){
		super();
		this.state = {
			contactDivActive: false
		};
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggle(e){
		e.preventDefault();
		this.setState(state => ({
			contactDivActive: !state.contactDivActive			
		}));
	}
	handleSubmit(e) {
		e.preventDefault();
	}
	render(){
		let contactDivClassName = this.state.contactDivActive ? 'active' : '';
		return(
			<div id="contact-container" className={contactDivClassName}>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="email" name="email" placeholder="Email" />
					</div>
					<div>
						<textarea rows="10" cols="30" name="message" placeholder="Message"></textarea>
					</div>
					<div>
						<input type="submit" className="btn" value="Submit" />
					</div>
				</form>
				<div id="contact-btn" className="btn" onClick={this.toggle}>CONTACT</div>
				<div id="contact-close-btn" className="btn close-btn" onClick={this.toggle}>X</div>
			</div>
		);
	}
}