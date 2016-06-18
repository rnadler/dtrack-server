import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'scripts/app/components/appFooter/appFooter.html'
})

export class AppFooter {

    constructor(@Inject('VERSION') public dtrackVersion) {
    }
}
