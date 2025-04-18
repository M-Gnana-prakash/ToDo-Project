package com.todo.ToDo.Application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.ToDo.Application.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
		Optional<User> findByName(String name);
		Optional<User> findByNameAndPassword(String name, String password);
}
