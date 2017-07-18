import React from 'react';
import {Link, Route} from 'react-router-dom';
import Story from './Story.js';
import {NewButton} from '../../components/components.js';

class Dashboard extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Link className='btn btn-success col-lg-5 col-sm-11 col-md-5 fa fa-plus right areaDiv' to="/create">Create new story</Link>
				<hr className='clear'/>
				<div className="co-lg-12 col-sm-12 col-md-12">
					<Story />
				</div>
			</div>
		);
	}
}
export default Dashboard;