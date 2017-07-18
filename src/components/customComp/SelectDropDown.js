import React from 'react';

class SelectDropDown extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: [],
			name:''
		}
	}
	render(){
		return (
			<select className="styled-select green rounded col-lg-9 col-md-9 col-sm-12 col-xs-12" name={this.props.name} onChange={this.props.onChange}>
				<option>Select the option</option>
				{
					this.props.items.map((item)=>{
						return <option key={item} value={item}>{item}</option>
					})
				}
			</select>
		);
	}
}
export default SelectDropDown;