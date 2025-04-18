package com.todo.ToDo.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.ToDo.Application.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{


}
