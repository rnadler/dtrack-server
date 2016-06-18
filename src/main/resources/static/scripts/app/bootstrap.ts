import {upgradeAdapter} from './upgrade_adapter';
import {UpdateComponent} from './components/updateComponent/update_component';
/* . . . */
upgradeAdapter.upgradeNg1Provider('User');
upgradeAdapter.upgradeNg1Provider('$stomp');
// upgradeAdapter.upgradeNg1Component('appFooter');
// upgradeAdapter.upgradeNg1Component('logAlert');
// upgradeAdapter.upgradeNg1Component('navBar');
// upgradeAdapter.upgradeNg1Component('notificationAlert');
// upgradeAdapter.upgradeNg1Component('register');

// declare var angular:any;
// angular.module('dtrackApp', []).directive('updateComponent', upgradeAdapter.downgradeNg2Component(UpdateComponent));

upgradeAdapter.bootstrap(document.body, ['dtrackApp']);