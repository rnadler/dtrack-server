import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
declare var showAlert: any;

@Component({
    selector: 'notification-alert',
    templateUrl: './notificationAlert.html'
})

export class NotificationAlert implements OnInit, OnDestroy {

    public notificationAlert = {enabled: false, type: "success"};

    constructor(@Inject('$timeout') private timeout, @Inject('$stomp') private stomp,
                @Inject('User') private user) {
    }
    ngOnInit() {
        this.stomp.setDebug(function (args) {
            console.debug(args);
        });
        if (this.user.isLoggedIn()) {
            this.stomp.connect('/notification', {})
                .then((frame) => {
                        this.stomp.subscribe('/user/topic/notifications', (payload, headers, res) => {
                                var message = 'Notification received. user=' + payload.user + ' type=' + payload.type;
                                console.debug(message);
                                showAlert(this.timeout, this.notificationAlert, message);
                        }, {});
                });
        }
    }
    ngOnDestroy() {
        this.stomp.disconnect();
    }
}

