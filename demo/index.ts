import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import ngMdc from '../src/modules';

import './index.scss';
import buttonExamples from './components/button-examples';
import appContainer from './containers/app';
import appNavDrawer from './containers/app-nav-drawer';
import buttonPage from './containers/button-page';
import { RegisterAppRoutes } from './routes';
import { ConfigureForProduction } from './configs';

angular
  .module('app', [uirouter, ngMdc])
  .config(RegisterAppRoutes)
  .config(ConfigureForProduction)
  .component(buttonExamples.id, buttonExamples)
  .component(appContainer.id, appContainer)
  .component(appNavDrawer.id, appNavDrawer)
  .component(buttonPage.id, buttonPage);
