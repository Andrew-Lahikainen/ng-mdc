import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import ngMdc from '../src/modules';

import './index.scss';
import appContainer from './containers/app';
import appNavDrawer from './containers/app-nav-drawer';
import { RegisterAppRoutes } from './routes';

angular
  .module('app', [uirouter, ngMdc])
  .config(RegisterAppRoutes)
  .component(appContainer.id, appContainer)
  .component(appNavDrawer.id, appNavDrawer);
