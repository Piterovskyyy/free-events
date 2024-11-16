package com.free_events.backend.repository;

import com.free_events.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    boolean existsByEmail(String email);

    User findByEmail(String email);
}
