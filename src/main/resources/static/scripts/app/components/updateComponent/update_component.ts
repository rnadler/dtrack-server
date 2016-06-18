import { Component, Inject } from '@angular/core';

@Component({
    selector: 'update-component',
    template: `
    <button type="button" class="btn btn-secondary" (click)="sendUpdate()" id="sendNotification">Send Update</button>
    `
})

export class UpdateComponent {

    constructor(@Inject('User') public user, @Inject('$stomp') public stomp) {
        console.log("UpdateComponent constructor user=" + user + " stomp=" + stomp);
    }
    sendUpdate() {
        if (this.user.isLoggedIn()) {
            this.stomp.send('/app/update', { user: '', type: 'even' }, {});
        }
    }
}
