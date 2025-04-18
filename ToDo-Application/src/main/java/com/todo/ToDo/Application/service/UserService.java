package com.todo.ToDo.Application.service;

import java.util.Optional;

import com.todo.ToDo.Application.model.User;

public interface UserService {
	public Optional<User> signupUser(User user);
	public Optional<User> loginUser(String name, String password);
}
