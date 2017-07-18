import React from 'react';

class TextArea extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			floatingLabelText: '',
			hintText: '',
			value: ''
		}
	}
	render(){
		return (
			<div className="form-group">
				<label className="control-label col-lg-3 col-sm-12 col-md-3" htmlFor={this.props.floatingLabelText} 
						name = {this.props.name} >{this.props.floatingLabelText}</label>
				<textarea className="col-lg-9 col-sm-12 col-md-9" name={this.props.name}
					placeholder={this.props.hintText} 
					onChange={this.props.onChange} value={this.props.value}>{this.props.value} </textarea>
			</div>
		);
	}
}
export default TextArea;