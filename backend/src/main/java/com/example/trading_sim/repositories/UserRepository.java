package com.example.trading_sim.repositories;

import com.example.trading_sim.models.User;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>
{
    @Query("SELECT id, username, password FROM users WHERE username = :username")
    public Optional<User> findByUsername(@Param("username") String username);

    @Modifying
    @Query("DELETE FROM users WHERE username = :username")  // <- usernames have to be unqie
    public void deleteByUsername(@Param("username") String username);
    // ...

    @Query("SELECT COUNT(id) FROM users WHERE username = :username")
    public boolean existsByUsername(@Param("username") String username);
}
