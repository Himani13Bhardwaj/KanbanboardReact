import React from 'react';
import {Router, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomRouter from './route/routes.js';
import {Header,Footer,history} from './components/components.js';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: ''
		}
	}
	render(){
		return (
			<div className="co-lg-12 col-sm-12 col-md-12 containClass">
				<Header title="Kanban Board"/>
				<div className="modal-content ">
					< CustomRouter history={history}/>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;