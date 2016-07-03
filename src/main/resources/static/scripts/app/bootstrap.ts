import {upgradeAdapter} from './upgrade_adapter';
import {UpdateComponent} from './components/updateComponent/update_component';
import {AppFooter} from './components/appFooter/appFooter';
import {LogAlert} from './components/logAlert/logAlert';
import {NotificationAlert} from './components/notificationAlert/notificationAlert'
import {Register} from './components/register/register';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

/* . . . */
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

upgradeAdapter.bootstrap(document.body, [app], [
    disableDeprecatedForms(),
    provideForms()
    ]
);