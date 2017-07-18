import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route, Switch, RouteHandler, Redirect} from 'react-router-dom';
import App from '../App.js';
import {Login, Register,Screen, Story, CreateStory, history, Dashboard} from '../containers/container.js';

class CustomRouter extends Component {
	render(){
		return (
			<Router basename="/" component={App} history={history}>
				<Switch>
					<Route exact path = "/" render={() => <Screen />}/>
					<Route path = "/login" render={() => <Login />}/>
					<Route path = "/register" component = {Register}/>
					<Route path = "/home" render={() => 
						<Dashboard />
					}/>
					<Route path = "/create" render={() => 
						<CreateStory />
					}/>
					<Route path = "/create/:id" render={() => 
						<CreateStory datakey={id}/>
					}/>
					<Route render={() => <h1>Page not found</h1>} />
				</Switch>
			</Router >
		);
	}
};

module.exports = CustomRouter;