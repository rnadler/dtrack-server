import {upgradeAdapter} from './upgrade_adapter';
import {UpdateComponent} from './components/updateComponent/update_component';
import {AppFooter} from './components/appFooter/appFooter';
/* . . . */
upgradeAdapter.upgradeNg1Provider('User');
upgradeAdapter.upgradeNg1Provider('$stomp');
upgradeAdapter.upgradeNg1Provider('VERSION');

declare var angular:any;
let module = angular.module('dtrackApp');
module.directive('updateComponent', upgradeAdapter.downgradeNg2Component(UpdateComponent));
module.directive('appFooter', upgradeAdapter.downgradeNg2Component(AppFooter));

upgradeAdapter.bootstrap(document.body, ['dtrackApp']);