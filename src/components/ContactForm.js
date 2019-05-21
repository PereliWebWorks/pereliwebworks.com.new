import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import * as email from 'emailjs-com';

export default class ContactForm extends React.Component{
	constructor(){
		super();
		this.state = {
			active: false,
			emailResponse: false
		};
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggle(e){
		e.preventDefault();
		this.setState(state => ({
			active: !state.active			
		}));
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({emailResponse: 'pending'});
		email.sendForm('gmail', 'template_XbealEXm', '#contact-form')
		.then(() => {
			this.setState({emailResponse: 'success'});
		})
		.catch(err => {
			this.setState({emailResponse: 'error'});
			console.log(err);
		});
	}
	render(){
		let contactDivClassName = this.state.active ? 'active' : '';
		let messageClassName = 'message';
		if (this.state.emailResponse) messageClassName += ' ' + this.state.emailResponse;
		else messageClassName += ' hide';
		if (['success', 'error'].includes(this.state.emailResponse)) messageClassName += ' fade-out';
		let messageText;
		switch(this.state.emailResponse){
			case 'pending':
				messageText = 'Sending...';
				break;
			case 'error':
				messageText = 'There was an error. Please try again later.';
				break;
			case 'success':
				messageText = 'Your message has been sent.';
				break;
			default:
				messageText = '';
		};
		return(
			<div id="contact-container" className={contactDivClassName}>
				<form id="contact-form" onSubmit={this.handleSubmit}>
					<div>
						<input type="email" name="reply_to" placeholder="Email" />
					</div>
					<div>
						<textarea rows="10" cols="30" name="message" placeholder="Message"></textarea>
					</div>
					<div>
						<input type="submit" className="btn" value="Submit" />
					</div>
				</form>
				<div id="contact-btn" className="btn open-btn" onClick={this.toggle}>CONTACT <Icon icon='envelope' /></div>
				<div id="contact-close-btn" className="btn close-btn" onClick={this.toggle}><Icon icon='times' /></div>
				<div className={messageClassName}>{messageText}</div>
			</div>
		);
	}
}