import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShowAlertService} from "../../services/showAlertService";
import {AppState} from "../../app.service";

@Component({
    selector: 'notification-alert',
    templateUrl: './notificationAlert.html'
})

export class NotificationAlert implements OnInit, OnDestroy {

    public notificationAlert = {enabled: false, type: "success"};

    // constructor(@Inject('$timeout') private timeout, @Inject('$stomp') private stomp,
    //             @Inject('User') private user) {
    // }
    constructor(public appState: AppState, private showAlertService: ShowAlertService) {

    }
    ngOnInit() {
        // this.stomp.setDebug(function (args) {
        //     console.debug(args);
        // });
        if (this.appState.isLoggedIn()) {
            this.showAlertService.showAlertMsg(this.notificationAlert, 'User is logged in!');
            // this.stomp.connect('/notification', {})
            //     .then((frame) => {
            //             this.stomp.subscribe('/user/topic/notifications', (payload, headers, res) => {
            //                     let message = 'Notification received. user=' + payload.user + ' type=' + payload.type;
            //                     console.debug(message);
            //                 this.showAlertService.showAlertMsg(this.notificationAlert, message);
            //             }, {});
            //     });
        }
    }
    ngOnDestroy() {
        // this.stomp.disconnect();
    }
}

