package com.rdn.controllers;

import com.rdn.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@Slf4j
public class NotificationController {

    public static final String TOPIC_NOTIFICATIONS = "/topic/notifications";

    @MessageMapping("/update")
    @SendToUser(TOPIC_NOTIFICATIONS)
    public Notification notification(Notification notification, Principal principal) throws Exception {
        String user = principal.getName();
        String type = notification.getType();
        log.info("Update notification received. user=" + user + " type=" + type);
        return new Notification(user, type);
    }
}