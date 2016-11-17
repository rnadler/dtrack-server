import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { LoginService } from '../../services/loginService';
import { STOMPService, StompConfig } from '../../services/stomp';
import { LogAlert} from "../logAlert/logAlert";
import { Subscription} from "rxjs";

@Component({
    selector: 'notification-alert',
    templateUrl: './notificationAlert.html'
})

export class NotificationAlert implements OnInit, OnDestroy {

    private notificationAlert = { type: "success", message: '' };
    private stompConfig: StompConfig;
    @ViewChild('notificationAlert') logAlert: LogAlert;
    private sub: Subscription;

    constructor(private loginService: LoginService, private stompService: STOMPService) {
        this.stompConfig = <StompConfig> {
            "host": "example.com.invalid",
            "port": 15671,
            "ssl" : false,
            "user": "username",
            "pass": "changeme",
            "subscribe": ["/user/topic/notifications"],
            "publish": ["/app/update"],
            "heartbeat_in": 0,
            "heartbeat_out": 20000,
            "debug": true
        };
    }
    ngOnInit() {
        this.logAlert.setPrefix('notify');
        this.sub = this.loginService.loginStatus.subscribe( status =>
            {
                console.log('NotificationAlert loginStatus: ' + status);
                if (status === 'login') {
                    this.onLogin();
                } else {
                    this.onLogout();
                }
            }
        );
    }
    onLogin() {
        // ToDo: For testing notification. Eventually remove.
        //this.notify('User ' + this.loginService.getUser() + ' has logged in!');

        // this.stompService.configure(this.stompConfig);
        // this.stomp.connect('/notification', {})
        //     .then((frame) => {
        //             this.stomp.subscribe('/user/topic/notifications', (payload, headers, res) => {
        //                     let message = 'Notification received. user=' + payload.user + ' type=' + payload.type;
        //                     console.debug(message);
        //                 this.notify(message);
        //             }, {});
        //     });
    }
    onLogout() {
        //this.stompService.disconnect();
    }
    notify(message) {
        this.notificationAlert.message = message;
        this.logAlert.showAlert(this.notificationAlert);
    }
    ngOnDestroy() {
        this.onLogout();
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}

