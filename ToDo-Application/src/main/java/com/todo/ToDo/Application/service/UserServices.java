package com.todo.ToDo.Application.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.ToDo.Application.model.User;
import com.todo.ToDo.Application.repository.UserRepository;

@Service
public class UserServices implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Optional<User> signupUser(User user) {
		return userRepository.findByName(user.getName());
	}
	
	@Override
	public Optional<User> loginUser(String name, String password) {
		return userRepository.findByNameAndPassword(name, password);
	}
	

}
