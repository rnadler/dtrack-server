import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { LoginService } from '../../services/loginService';
import { STOMPService, StompConfig } from '../../services/stomp';
import { LogAlert} from "../logAlert/logAlert";
import {Subscription, Observable} from "rxjs";
import {Message} from "stompjs";

@Component({
    selector: 'notification-alert',
    templateUrl: './notificationAlert.html'
})

export class NotificationAlert implements OnInit, OnDestroy {

    private notificationAlert = { type: "success", message: '' };
    private stompConfig: StompConfig;
    @ViewChild('notificationAlert') logAlert: LogAlert;
    private sub: Subscription;
    public messages: Observable<Message>;

    constructor(private loginService: LoginService, private stompService: STOMPService) {
        this.stompConfig = <StompConfig> {
            "host": window.location.hostname,
            "port": +window.location.port,
            "ssl" : window.location.protocol === 'https:',
            "user": '',
            "pass": '',
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
        this.stompService.configure(this.stompConfig);
        this.stompService.try_connect().then(this.on_connect);
    }
    public on_connect = () => {
        this.messages = this.stompService.messages;
        this.messages.subscribe(this.on_next);
    };

    public on_next = (message: Message) => {
        let data = JSON.parse(message.body);
        let msg = 'Notification received. user=' + data.user + ' type=' + data.type;
        console.debug(msg);
        this.notify(msg);
    };

    onLogout() {
        this.stompService.disconnect();
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

