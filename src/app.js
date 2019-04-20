import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Slider from './components/Slider';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-6 offset-3">
						<Slider />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));