package com.todo.ToDo.Application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.ToDo.Application.exception.UserNotFoundException;
import com.todo.ToDo.Application.model.Task;
import com.todo.ToDo.Application.service.TaskServices;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskController {
	
	
	@Autowired
	private TaskServices taskServices;
	
	
	@PostMapping("/createtask")
	public Task createTask(@RequestBody Task task, HttpSession session) throws UserNotFoundException {
		Long id = (Long) session.getAttribute("userId");
		System.out.println("id: "+id);
		return taskServices.createUserTask(task, id);
	}
	 
	@GetMapping("/getAllTasks")
	public List<Task> getUserAllTasks(HttpSession session) throws UserNotFoundException {
		Long id = (Long) session.getAttribute("userId");
		return taskServices.getUserAllTask(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteSingleTask(@PathVariable Long id) throws UserNotFoundException {
		return taskServices.deleteUserTask(id);
	}
	
	@PostMapping("/toggle/{id}")
	public ResponseEntity<String> taskToggle(@PathVariable Long id) {
		return taskServices.toggleTask(id);
	}
	
		
}
