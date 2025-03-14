package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.ui.Model;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/api")
public class MessageController {
    private final MessageService messageService;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageController(MessageService messageService, MessageRepository messageRepository){
        this.messageService = messageService;
        this.messageRepository = messageRepository;
    }
    @PostMapping("/submitChoice")
    public ResponseEntity<Map<String, Object>> submitChoice(@RequestBody message request) {
        System.out.println("Received request: " + request);
        if (request.getDay() == null || request.getDay().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Please select at least one day."));
        }

        String dayString = String.join(", ", request.getDay());

        messageService.saveMessage(request.getName(), request.getEmail(), dayString);

        return ResponseEntity.ok(Map.of("success", true, "message", "Reservation successful!"));
    }     
@GetMapping("/api/checkReservation")
public ResponseEntity<Map<String, Boolean>> checkReservation(
    @RequestParam String name, 
    @RequestParam String email) {
    boolean exists = messageRepository.existsByNameAndEmail(name, email);
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", exists);
    return ResponseEntity.ok(response);
}






    // @GetMapping("/home")
    // public String showHomePage() {
    //     return "index";
    // }
    // @PostMapping("/submitForm")
    // public ResponseEntity<String> handleFormSubmission(@RequestBody String name, String email, String day) {
    //     System.out.println("Received message: " ); 
    //     return ResponseEntity.ok("Message received: ");  
    // }

    // // @GetMapping("/message")
    // // public String getMessage() {
    // //     return "Hello from Spring Boot!";
    // // }
}