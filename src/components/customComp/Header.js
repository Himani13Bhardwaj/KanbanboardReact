import React from 'react';

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: ''
		}
	}
	render(){
		return (
			<header className="page-header">
				<h1>{this.props.title}</h1>
			</header>
		);
	}
}
export default Header;