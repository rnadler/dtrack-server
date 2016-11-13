import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShowAlertService} from "../../services/showAlertService";
import { LoginService } from '../../services/loginService';

@Component({
    selector: 'notification-alert',
    templateUrl: './notificationAlert.html'
})

export class NotificationAlert implements OnInit, OnDestroy {

    public notificationAlert = {enabled: false, type: "success", message: ''};

    // constructor(@Inject('$timeout') private timeout, @Inject('$stomp') private stomp,
    //             @Inject('User') private user) {
    // }
    constructor(private loginService: LoginService, private showAlertService: ShowAlertService) {

    }
    ngOnInit() {
        // this.stomp.setDebug(function (args) {
        //     console.debug(args);
        // });
        if (this.loginService.isSignedIn()) {
            // this.stomp.connect('/notification', {})
            //     .then((frame) => {
            //             this.stomp.subscribe('/user/topic/notifications', (payload, headers, res) => {
            //                     let message = 'Notification received. user=' + payload.user + ' type=' + payload.type;
            //                     console.debug(message);
            //                 this.notificationAlert.message = message;
            //                 this.showAlertService.showAlertMsg(this.notificationAlert);
            //             }, {});
            //     });
        }
    }
    ngOnDestroy() {
        // this.stomp.disconnect();
    }
}

