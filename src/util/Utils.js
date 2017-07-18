import React from 'react';
import Axios from 'axios';

let Utils = {
	returnObj: function(e1, e2){
		return ({
			"isValid": e1,
			"error" : e2
		});
	},	
	validEmail: function(email){
		var formIsValid= true,errors=null,emailExp;
	    emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(email !== null){
			if(!emailExp.test(email)){
				formIsValid = false;
				errors = "Email is not valid";
			}
		}else{
			formIsValid = false;
			errors = "Please enter the email-id ex. abc@xyz.com";
		}
		return this.returnObj(formIsValid, errors);
    },	
	validPwd: function(pwd){
		var formIsValid= true,errors=null,rpwdExp;
	    rpwdExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	    if(pwd !== null){
			if(!rpwdExp.test(pwd)){
				formIsValid = false;
				errors = "Password should contain a combination of Block letter, special character and numbers. ex: abcdef@11";
			}
		}else{
			formIsValid = false;
			errors = "Please enter the password. ex: Abcdef@11mnop";
		}
		return this.returnObj(formIsValid, errors);
    },
	requiredText: function(text){
		var formIsValid= true,errors=null;
		if(text.trim().length ==0 || text== "Enter the title"){
			formIsValid= false;
			errors = "Please fill empty fields"
		}
		return this.returnObj(formIsValid, errors);
	},
	getInstance: function(){
		return Axios.create({
		  baseURL: 'http://localhost:8080/home',
		  timeout: 1000,
		  headers: {'X-Custom-Header': 'foobar'}
		});
	},
	handleSuccess: function(resp){
		return response;
	},
	handleError:function(error){
		switch (error.response.status) {
		  case 401:
			this.redirectTo(document, '/')
			break;
		  case 404:
			this.redirectTo(document, '/404')
			break;
		  default:
			this.redirectTo(document, '/500')
			break;
		}
		return Promise.reject(error)
	},
	addNewStory:function(data){
		
	},
	getStory:function(){
		
	}
}

export default Utils;
