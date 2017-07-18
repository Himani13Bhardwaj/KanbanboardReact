import React from 'react';

class TextField extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			floatingLabelText: '',
			hintText: '',
			type: '',
			value: ''
		}
	}
	render(){
		return (
			<div className="form-group">
				<label className="control-label " htmlFor={this.props.floatingLabelText} 
						name = {this.props.name} >{this.props.floatingLabelText}</label>
				<input className="form-control" name={this.props.name} 
					type={this.props.type}
					value= {this.props.value} 
					placeholder={this.props.hintText} 
					onChange={this.props.onChange}/>
			</div>
		);
	}
}
export default TextField;