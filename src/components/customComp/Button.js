import React from 'react';

class NewButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			label: '',
			name: '',
			icon: ''
		}
	}
	render(){
		return (
			<div className={this.props.name}>
				<button className='btn btn-success col-lg-5 col-sm-11 col-md-5' type="{this.props.label}" onClick={this.props.onClick}>{this.props.label}</button>
			</div>
		);
	}
}
export default NewButton;