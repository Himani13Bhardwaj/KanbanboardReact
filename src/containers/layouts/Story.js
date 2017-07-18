import React from 'react';
import Fontawesome from 'react-fontawesome';
import Util from '../../util/Utils.js';
import Axios from 'axios';
import {List, TextField} from '../../components/components.js';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			data:[],
			list: false,
			error: 'No data found.'
		}
		
		this.onDelete  = this.onDelete.bind(this);
		this.onEdit  = this.onEdit.bind(this);
    }
	
	update(){
		this.setState({ list: true });
	}
	
	componentDidMount() {
		let that = this;
		Axios.get('http://localhost:3000/getStory')
		  .then(response => {
			if(response.status == 200){
				let arr = response.data.reverse();
				that.setState({ data: arr },that.update);
			}
			if(response.data.length == 0){
				that.setState({ list: false });
			}
		}).catch(error => {
			return error;
		});
			
	}
	
	getKey(e){
		return parseInt(e.currentTarget.parentElement.getAttribute('data-key'));
	}
	
	onDelete(event){
		let key = this.getKey(event);
		let that = this;
		
		Axios.delete('http://localhost:3000/deleteStory/:'+key)
		  .then(response => {
			if(response.status == 200){
				debugger;
				that.setState({data: response.data });
				alert('Successfully deleted!!!');
			}
		}).catch(error => {
			return error;
		});
    }

	onEdit(event){
		let key = this.getKey(event);
		
		if(key != undefined)
			this.context.router.push('/create/id:'+key);       
    }

    render() {
		if(this.state.list)
			return (
				<ul className='list-group visible'>
					<List data={this.state.data} onDelete={this.onDelete} onEdit={this.onEdit}/>
				</ul>
			);
		else
			return (
				<div className='visible nodata'>
					{this.state.error}
				</div>
			);
    }
}

Story.contextTypes = {
  router: React.PropTypes.object
};

export default Story;