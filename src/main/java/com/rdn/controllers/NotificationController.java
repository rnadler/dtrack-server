package com.rdn.controllers;

import com.rdn.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class NotificationController {
    @MessageMapping("/update")
    @SendTo("/topic/notifications")
    public Notification notification(Notification notification) throws Exception {
        log.info("notification received. user: " + notification.getUser() + " type:" + notification.getType());
        return notification;
    }
}