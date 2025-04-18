package com.todo.ToDo.Application.exception;

import javax.naming.NameNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserNotFoundException extends NameNotFoundException{

	public UserNotFoundException(String message) {
		super(message);
	}
	
}
