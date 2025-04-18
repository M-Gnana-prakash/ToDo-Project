package com.todo.ToDo.Application.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "task")
public class Task {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private boolean completed;
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;
	public Task(Long id, String title, boolean completed, User user) {
		super();
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.user = user;
	}
	public Task() {}
	public Task(Task task) {
		if(task != null) {
			this.id = task.id;
			this.title = task.title;
			this.completed = task.completed;
		}
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
