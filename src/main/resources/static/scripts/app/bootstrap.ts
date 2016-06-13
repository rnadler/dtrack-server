import {upgradeAdapter} from './upgrade_adapter';
import {UpdateComponent} from './components/updateComponent/update_component';
/* . . . */
// declare var angular:any;
// angular.module('dtrackApp', []).directive('updateComponent', upgradeAdapter.downgradeNg2Component(UpdateComponent));
upgradeAdapter.upgradeNg1Provider('User');
upgradeAdapter.upgradeNg1Provider('$stomp');
upgradeAdapter.bootstrap(document.body, ['dtrackApp']);