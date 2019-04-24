import React from 'react';

export default class ContactForm extends React.Component{
	constructor(){
		super();
		this.state = {
			contactDivActive: false
		};
		this.handleContactBtnClick = this.handleContactBtnClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleContactBtnClick(e){
		e.preventDefault();
		this.setState(state => ({
			contactDivActive: !state.contactDivActive			
		}));
	}
	handleSubmit(e){
		e.preventDefault();
	}
	render(){
		let contactDivClassName = this.state.contactDivActive ? 'active' : '';
		let linkText = this.state.contactDivActive ? '\u2190' : 'CONTACT';
		return(
			<div id="contact-container" className={contactDivClassName}>
				<form>
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
				<a id="contact-btn" className="btn" onClick={this.handleContactBtnClick}>{linkText}</a>
			</div>
		);
	}
}