import React from 'react';
import {NavLink, Route, Link} from 'react-router-dom';
import Fontawesome from 'react-fontawesome';
import moment from 'moment';
import Axios from 'axios';

import Util from '../../util/Utils.js';
import {InlineEdit,DatePicker,DateField, Calendar, NewButton, TextField, NewLink, SelectDropDown,TextArea} from '../../components/components.js';

class CreateStory extends React.Component {
	
    constructor(props) {
        super(props);
		this.state={
			form:{
				description : '',
				title: 'Enter the title',
				lastDate: "YYYY-MM-DD",
				asignee: '',
				project: '',
				uniqueId: 0
			},
			datakey: null,
			date: new Date(),
			shouldHide:true,
			datePick:true,
			errors:[]
		}
		this.project = ['Hybrid Mobile Application', 'Android Application', 'IOS Application', 'Web Application', 'Java Enterprise Appication']
		this.asignee = ['Sam Deering', 'Paul Clark', 'John Smith']
		this.dataChanged = this.dataChanged.bind(this);
		this.onChange = this.onChange.bind(this);
		this.createStory = this.createStory.bind(this);
		this.showDatePicker = this.showDatePicker.bind(this);
		this.inputClick = this.inputClick.bind(this,this.showDatePicker);
    }
	
	inputClick(e1){}
	
	onChange(event){
	    this.state.form[event.target.name] = event.target.value;
        this.setState({form: this.state.form});
	}
	
	showDatePicker(){
	  this.setState({datePick:false});
	}
	
	validate(){
		let fields = this.state.form;
		let errors = {};
		let formIsValid = true;
		if(typeof fields!== "undefined"){
			let asignee = Util.requiredText(fields["asignee"]);
			let project = Util.requiredText(fields["project"]);
			let title = Util.requiredText(fields["title"]);
			
			if(!asignee.isValid){
				formIsValid = asignee.isValid;
				errors["asignee"] = "Asignee - "+asignee.error;
			}
			if(!project.isValid){
				formIsValid = project.isValid;
				errors["project"] = "Project - "+project.error;
			}
			if(!title.isValid){
				formIsValid = title.isValid;
				errors["title"] = "Title - "+ title.error;
			}
			if(fields["lastDate"] == "YYYY-MM-DD"){
				formIsValid = false;
				errors["lastDate"] = "date - Please enter the date";
			}
		}else{
			formIsValid = false;
			errors["formError"] = "Please enter all the fields";
		}
		if(!formIsValid)
			this.setState({errors: errors},this.update);
		return formIsValid;
	}
	
	componentDidMount() {
		
		let key = parseInt(window.location.pathname.split(":")[1])
		let that = this;
		debugger;
		Axios.get('http://localhost:3000/getStory/:'+key)
		  .then(response => {
			if(response.status == 200 && Object.getOwnPropertyNames(response.data).length>0){
				that.setState({form: response.data});
				debugger;
			}
			if(response.data.length == 0){
				that.setState({ list: false });
			}
		}).catch(error => {
			return error;
		});    			
	}
	
	update(){
		this.setState({shouldHide: false});
	}
	
	createStory(event){
		event.preventDefault();
		let response = null;
		let that = this;
		if(this.validate()){			
			Axios.post('http://localhost:3000/addStory',{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': true,
					'Access-Control-Allow-Origin': 'http://localhost:3000/'
					},
				body:this.state.form}
				).then(function(resp){
					if(resp != null){
						that.setState({errors: {},shouldHide:true});
						that.context.router.push('/home');
					}
			});	
		}
	}
	
	dataChanged(data) {
		if(typeof data == "object"){
			let key =Object.keys(data)[0]
			this.state.form[key] = data[key];
			this.setState({form: this.state.form});	
		}
		
		if(typeof data == "string"){
			this.state.form.lastDate = data;
			this.setState({form: this.state.form}, function(){
				this.setState({datePick:true});
			});	
		}
		
		
    }

    customValidateText(text) {
      return (text.length > 0 && text.length < 64 );
    }

    render() {
		var errorList = Object.keys(this.state.errors).map((k, idx) => {
					   return (
						 <li key={idx}>{this.state.errors[k]}</li>
					   );
					});
        return (
			<div className="co-lg-12 col-sm-12 col-md-12">
				<h2>
				<InlineEdit validate={this.customValidateText} activeClassName="inlineTitle editing" name="title" text={this.state.form.title} paramName="title"
						change={this.dataChanged}/>
				</h2>
				<h6>{this.state.date.toString()}</h6>
				<hr />
				<div className={this.state.shouldHide ? 'hidden' : 'visible errorDiv'}>
					<ul>
						{errorList}
					</ul>
				</div>
				<form onSubmit={this.loginSubmit} className="createStory col-lg-9 col-md-10 col-sm-12">
					
					<div className="clear form-group">
						<label className="control-label col-lg-3 col-sm-12 col-md-3">Assignee </label>
						<SelectDropDown name='asignee' items={this.asignee} onChange={this.onChange} value={this.state.asignee}/>
					</div>
					<div className="clear form-group">
						<label className="control-label col-lg-3 col-sm-12 col-md-3">Select project </label>
						<SelectDropDown name='project' items={this.project} onChange={this.onChange} value={this.state.project}/>
					</div>
					<div className="clear form-group datePick">
						<label className="control-label col-lg-3 col-sm-12 col-md-3">Timeline {this.state.lastDate}</label>
						<input readOnly ref={this.inputClick} onClick={this.showDatePicker} title="time" name="lastDate" className="inlineTitle editing" type="text" value={this.state.form.lastDate} onChange={this.onChange}/>
						<div className={this.state.datePick ? 'hidden' : 'visible dateDiv'}>
							<DatePicker dateFormat="YYYY-MM-DD" selected={this.state.lastDate} onChange={this.dataChanged} minDate={moment()}/>
						</div>
					</div>
					
					<TextArea hintText="Please enter the detail of story" floatingLabelText="Description" name="description" value = {this.state.form.description} onChange={this.onChange}/>
					<NavLink className='btn btn-success col-lg-5 col-sm-11 col-md-5' to='/home' name='CreateStory' onClick = {this.createStory}>Create story</NavLink>
					<NavLink className='btn btn-success col-lg-5 col-sm-12 col-md-5' to="/home">Cancel</NavLink>				
				</form>
			</div>
		);
    }
}

CreateStory.contextTypes = {
  router: React.PropTypes.object
};

export default CreateStory;