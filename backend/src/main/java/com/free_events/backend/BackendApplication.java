package com.free_events.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping()
	public String hello() {
		return "Hello mongo!";
	}

	@Autowired
	private MongoTemplate mongoTemplate;

	public static class User {
		private String name;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}

	@GetMapping("/test-mongo")
	public String testMongoConnection() {
		List<User> users = mongoTemplate.find(new Query(), User.class, "users");

		if (users.isEmpty()) {
			return "Brak użytkowników w bazie.";
		}

		StringBuilder result = new StringBuilder("Użytkownicy w bazie:\n");
		for (User user : users) {
			result.append(user.getName()).append("\n");
		}

		return result.toString();
	}
}
