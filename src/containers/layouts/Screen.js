import React from 'react';
import {NavLink, Route} from 'react-router-dom';

class Screen extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			date: new Date()
		}
	}
	render(){
		return (
			<div className="subContainer col-lg-12 col-sm-12 col-md-12" >
				<div className="screenContent">
					<h2>Welcome!! </h2>
					<h6>{this.state.date.toString()}</h6>
				</div>
				<NavLink className='btn btn-success col-lg-5 col-sm-12 col-md-5' to="/login">Login</NavLink>
				<NavLink className='btn btn-success col-lg-5 col-sm-12 col-md-5' to="/register">Register</NavLink>
			</div>
		);
	}
}
export default Screen;