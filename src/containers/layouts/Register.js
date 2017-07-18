import React from 'react';
import {Link, Route} from 'react-router-dom';

import Util from '../../util/Utils.js';
import {NewButton, TextField} from '../../components/components.js';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.registerForm = this.registerForm.bind(this);
		this.state = {
			currentView: '',
			form:{
				fname:'',
				lname:'',
				email: '',
				pwd: '',
			},
			date: new Date(),
			shouldHide:true,
			errors:[]
		}
	}
	validate(){
		let fields = this.state.form;
		let errors = {};
		let formIsValid = true;
		
		if(typeof fields!== "undefined"){
			let email = Util.validEmail(fields["email"]);
			let pwd = Util.validPwd(fields["pwd"]);
			let fname = Util.requiredText(fields["fname"]);
			let lname = Util.requiredText(fields["lname"]);	
			if(!email.isValid){
				formIsValid = email.isValid;
				errors["email"] =email.error;
			}
			if(!pwd.isValid){
				formIsValid = pwd.isValid;
				errors["pwd"] =pwd.error;
			}
			if(!fname.isValid || !lname.isValid){
				formIsValid = fname.isValid && lname.isValid;
				errors["text"] = fname.error || lname.error;
			}			
		}else{
			formIsValid = false;
			errors["formError"] = "Please enter all the fields";
		}
		if(!formIsValid)
			this.setState({errors: errors},this.update);
		return formIsValid;
	}
	onChange(event) {
        this.state.form[event.target.name] = event.target.value;
        this.setState({form: this.state.form});
    }
	update(){
		this.setState({shouldHide: false});
	}
	registerForm(event){
		event.preventDefault();
		debugger;
		if(this.validate()){
			this.setState({errors: {},shouldHide:true});
			this.context.router.push('/login');
		}
	}
	render(){
		var errorList = Object.keys(this.state.errors).map((k, idx) => {
					   return (
						 <li key={idx}>{this.state.errors[k]}</li>
					   );
					});
		return(
			<div className="co-lg-12 col-sm-12 col-md-12">
				<h2>Register</h2>
				<h6>{this.state.date.toString()}</h6>
				<hr />
				<div className={this.state.shouldHide ? 'hidden' : 'visible errorDiv'}>
					<ul>
						{errorList}
					</ul>
				</div>
				<form className="register">
					<TextField hintText="Enter your First Name" name='fname' floatingLabelText="First Name" type="text" value = {this.state.form.fname} onChange={this.onChange}/>
					
					<TextField hintText="Enter your Last Name" name='lname' floatingLabelText="Last Name" type="text" value = {this.state.form.lname} onChange={this.onChange}/>
					
					<TextField hintText="Please enter email id" name='email' floatingLabelText="Email-id" type="text" value = {this.state.form.email} onChange={this.onChange}/>
					
					<TextField hintText="Please enter password" name='pwd' floatingLabelText="Password" type="password" value = {this.state.form.pwd} onChange={this.onChange}/>
			
					<NewButton name='register' label='Register' onClick = {this.registerForm}/>
					<Link className='btn btn-success col-lg-5 col-sm-11 col-md-5' to="/">Cancel</Link>
				</form>
			</div>
		);
	}
}
Register.contextTypes = {
  router: React.PropTypes.object
};
export default Register;