import { Component } from '@angular/core';
import { LoginService } from "../../services/loginService";
import { STOMPService } from "../../services/stomp/stomp.service";

// TODO: This component is for testing simple websocket notifications. Should be removed eventually.
@Component({
    selector: 'update-component',
    template: `
    <button type="button" class="btn btn-secondary" (click)="sendUpdate()" id="sendNotification">Send Update</button>
    `
})

export class UpdateComponent {
    private data: any;
    constructor(private loginService: LoginService, private stompService: STOMPService) {
        this.data = { user: '', type: 'even' };
    }
    sendUpdate() {
        if (this.loginService.isSignedIn()) {
            this.stompService.publish(JSON.stringify(this.data));
        }
    }
}
