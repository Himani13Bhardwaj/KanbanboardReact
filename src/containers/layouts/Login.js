import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import Util from '../../util/Utils.js';
import {history, NewButton, TextField, NewLink} from '../../components/components.js';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.loginForm = this.loginForm.bind(this)
		this.state = {
			email: '',
			pwd: '',
			currentView: '',
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
			debugger;
			if(!email.isValid){
				formIsValid = email.isValid;
				errors["email"] =email.error;
			}
			if(!pwd.isValid){
				formIsValid = pwd.isValid;
				errors["pwd"] =pwd.error;
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
        this.state[event.target.name] = event.target.value;
        this.setState({form: this.state});
    }
	update(){
		this.setState({shouldHide: false});
	}
	loginForm(event){
		event.preventDefault();
		if(this.validate()){
			this.setState({errors: {},shouldHide:true});
			this.context.router.push('/home');
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
				<h2>Login</h2>
				<h6>{this.state.date.toString()}</h6>
				<hr />
				<div className={this.state.shouldHide ? 'hidden' : 'visible errorDiv'}>
					<ul>
						{errorList}
					</ul>
				</div>
				<form>
					<TextField hintText="Enter your Email" floatingLabelText="Email" name='email' type="text" value = {this.state.email} onChange={this.onChange}/>
					<br/>
					<TextField type="password" hintText="Enter your Password" floatingLabelText="Password" name='pwd' value = {this.state.pwd} onChange={this.onChange}/>
					<br/>
					<NavLink className='btn btn-success col-lg-5 col-sm-11 col-md-5' to='/home' name='login' onClick = {this.loginForm}>Login</NavLink>
					<NavLink className='btn btn-success col-lg-5 col-sm-11 col-md-5' to="/" >Cancel</NavLink>
				</form>
			</div>
		);
	}
}
Login.contextTypes = {
  router: React.PropTypes.object
};
export default Login;