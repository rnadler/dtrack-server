package com.rdn.services;

import com.rdn.controllers.NotificationController;
import com.rdn.model.Entry;
import com.rdn.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate template;

    public void sendEntryNotification(Entry entry) {
        String user = entry.getUser();
        String type = entry.getType();
        try {
            template.convertAndSendToUser(user, NotificationController.TOPIC_NOTIFICATIONS, new Notification(user, type));
            log.info("Sent notifdication for user=" + user + " type=" + type);
        } catch (Exception e) {
            log.error("Failed to send notifdication for user=" + user + " type=" + type + " error:" + e.getMessage());
        }
    }
}
