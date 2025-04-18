package com.todo.ToDo.Application.controller;

import java.util.Optional;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.ToDo.Application.exception.UserNotFoundException;
import com.todo.ToDo.Application.model.User;
import com.todo.ToDo.Application.repository.UserRepository;
import com.todo.ToDo.Application.service.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;

@RestController()
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<User> userSignup(@RequestBody User user) throws NameNotFoundException {
		
		Optional<User> existingUser = userService.signupUser(user);
		if(existingUser.isPresent()) {
			throw new UserNotFoundException("User  name already exists :" + user.getName());
		}
		User savedUser = userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> userlogin(@RequestBody User user, HttpSession session) throws UserNotFoundException {
		String name = user.getName();
		String password = user.getPassword();
		User existingUser = userService.loginUser(name, password).orElseThrow(() -> new UserNotFoundException("user not found for this id:"+name));
		session.setAttribute("userId", existingUser.getId());
		return ResponseEntity.ok(existingUser);
		
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> userLogout(HttpSession session) {
		session.removeAttribute("userId");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
	}
}
