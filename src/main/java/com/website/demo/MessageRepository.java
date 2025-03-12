package com.website.demo;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository {

    private final JdbcTemplate jdbcTemplate;

    public MessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public boolean existsByNameAndEmail(String name, String email) {
        String sql = "SELECT COUNT(*) FROM konzerts WHERE Name = ? AND Email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name, email);
        return count != null && count > 0; 
    }

    public void saveMessageToDatabase(String name, String email, String day) {
        String sql = "INSERT INTO konzerts (Name, Email, Day) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, name, email, day); 
    }
    
}
