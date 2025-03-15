package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.website.demo.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(String name, String email, String day) {
        // if (messageRepository.existsByNameAndEmail(name, email)){
        //     throw new IllegalArgumentException("You're already reserved. Do you want to view your reservation?");
        // }
        try {
            System.out.println("Saving: " + name + ", " + email + ", " + day);
            messageRepository.saveMessageToDatabase(name, email, day);
            System.out.println("Save successful!");
        } catch (Exception e) {
            System.err.println("Error saving message: " + e.getMessage());
        }
    }
}
