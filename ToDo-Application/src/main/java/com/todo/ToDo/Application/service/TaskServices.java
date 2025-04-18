package com.todo.ToDo.Application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.todo.ToDo.Application.exception.TaskNotFoundException;
import com.todo.ToDo.Application.exception.UserNotFoundException;
import com.todo.ToDo.Application.model.Task;
import com.todo.ToDo.Application.model.User;
import com.todo.ToDo.Application.repository.TaskRepository;
import com.todo.ToDo.Application.repository.UserRepository;

@Service
public class TaskServices implements TaskService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public List<Task> getUserAllTask(Long id) throws UserNotFoundException {
		User currentUser =  userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("user not found for this id:"+id));
		List<Task> tasks = currentUser.getTasks();
		return tasks.stream().map(task -> new Task(task)).toList();
	}

	@Override
	public ResponseEntity<String> deleteUserTask(Long id) {
		Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found for this id:"+id));
		taskRepository.delete(task);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Data deleted!!");
	}

	@Override
	public Task createUserTask(Task task, Long id) throws UserNotFoundException {
		User currentUser =  userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("user not found for this id:"+id));
		task.setUser(currentUser);
		currentUser.getTasks().add(task);
		userRepository.save(currentUser);
		return taskRepository.save(task); 
	}

	@Override
	public ResponseEntity<String> toggleTask(Long id) {
		Task task = taskRepository.findById(id)
		        .orElseThrow(() -> new TaskNotFoundException("Task not found for this id: " + id));

		task.setCompleted(!task.isCompleted());
		taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Task toggled!!");
	}

}
