package com.todo.ToDo.Application.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	public void addCorsMapping(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("localhost:5173")
		.allowedMethods("*")
		.allowedHeaders("*")
		.allowCredentials(true);
	}
}	
