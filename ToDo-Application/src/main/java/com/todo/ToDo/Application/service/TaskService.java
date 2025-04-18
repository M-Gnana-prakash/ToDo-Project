package com.todo.ToDo.Application.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.todo.ToDo.Application.exception.UserNotFoundException;
import com.todo.ToDo.Application.model.Task;

public interface TaskService {
	List<Task> getUserAllTask(Long id) throws UserNotFoundException;
	ResponseEntity<String> deleteUserTask(Long id);
	Task createUserTask(Task task, Long id) throws UserNotFoundException;
	ResponseEntity<String> toggleTask(Long id);
}
