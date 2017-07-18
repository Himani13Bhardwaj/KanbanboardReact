import React from 'react';
import Fontawesome from 'react-fontawesome';

class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}
	render(){
		return (
			<ul>
				{
					this.props.data.map((story)=>{
						return(
							<li className="clear list-group-item listCustom" key={story.uniqueId} data-key={story.uniqueId}>
								<h4>
									{story.title }  - {story.asignee}
								</h4>
								
								<Fontawesome className="fa fa-trash-o fa-size" name='delete' onClick={this.props.onDelete}/>
								<Fontawesome className="fa fa-pencil-square-o fa-size" name='edit' onClick={this.props.onEdit}/>
								<span className="right lastDate">{story.lastDate }</span>
							</li>
						);
					})
				}
			</ul>
			
		);
	}
}
export default List;