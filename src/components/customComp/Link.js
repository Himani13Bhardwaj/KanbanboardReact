import React from 'react';

class NewLink extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			lable: '',
			to: ''
		}
	}
	render(){
		return (
			<a className='btn btn-success col-lg-5 col-sm-12 col-md-12' 
					href={this.props.to} onClick={this.props.onClick}>
						{this.props.lable}
			</a>
		);
	}
}
export default NewLink;