import {UpdateComponent} from './components/updateComponent/update_component';
import {AppFooter} from './components/appFooter/appFooter';
import {LogAlert} from './components/logAlert/logAlert';
import {NotificationAlert} from './components/notificationAlert/notificationAlert'
import {NgModule, forwardRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeAdapter} from "@angular/upgrade";
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {Register} from "./components/register/register";
import { FormsModule }   from '@angular/forms';
// import { PasswordStrengthBar } from "./components/passwordStrengthBar/passwordStrengthBar"


/* . . . */
var upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

upgradeAdapter.upgradeNg1Provider('User');
upgradeAdapter.upgradeNg1Provider('$stomp');
upgradeAdapter.upgradeNg1Provider('VERSION');
upgradeAdapter.upgradeNg1Provider('$timeout');
upgradeAdapter.upgradeNg1Provider('$location');
upgradeAdapter.upgradeNg1Provider('Auth');

declare var angular:any;
let app = 'dtrackApp';
let module = angular.module(app);
module.directive('updateComponent', upgradeAdapter.downgradeNg2Component(UpdateComponent));
module.directive('appFooter', upgradeAdapter.downgradeNg2Component(AppFooter));
module.directive('logAlert', upgradeAdapter.downgradeNg2Component(LogAlert));
module.directive('notificationAlert', upgradeAdapter.downgradeNg2Component(NotificationAlert));
module.directive('register', upgradeAdapter.downgradeNg2Component(Register));
// module.directive('passwordStrengthBar', upgradeAdapter.downgradeNg2Component(PasswordStrengthBar));

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        UpdateComponent,
        AppFooter,
        LogAlert,
        NotificationAlert,
        Register,
        AlertComponent,
        // PasswordStrengthBar
        upgradeAdapter.upgradeNg1Component('passwordStrengthBar')
    ],
    bootstrap: [
        AppFooter
    ]
})
class AppModule {}

upgradeAdapter.bootstrap(document.body, [app]);