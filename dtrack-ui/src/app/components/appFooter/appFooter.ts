import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './appFooter.html'
})

export class AppFooter {
    public dtrackVersion = "0.0.1-Alpha";
    // constructor(@Inject('VERSION') public dtrackVersion) {
    // }
}
