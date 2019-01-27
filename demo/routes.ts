import { StateProvider, Ng1StateDeclaration, UrlRouterProvider } from '@uirouter/angularjs';
import { AppContainer } from './containers/app/app.component';
import { ButtonPageContainer } from './containers/button-page/button-page.component';
import { ButtonExamplesComponent } from './components/button-examples/button-examples.component';

const App: Ng1StateDeclaration = {
  name: 'app',
  component: AppContainer.id
};

const Button: Ng1StateDeclaration = {
  name: 'button',
  component: ButtonPageContainer.id,
  url: '/buttons'
};

const ButtonExamples: Ng1StateDeclaration = {
  name: 'buttonExamples',
  parent: Button.name,
  component: ButtonExamplesComponent.id,
  url: '/examples'
};

const StateDeclarations: Ng1StateDeclaration[] = [App, Button, ButtonExamples];

export const RegisterAppRoutes = (
  $locationProvider: ng.ILocationProvider,
  $stateProvider: StateProvider,
  $urlRouterProvider: UrlRouterProvider
) => {
  $locationProvider.html5Mode({ enabled: true, requireBase: true });
  $urlRouterProvider.otherwise('/');
  StateDeclarations.forEach(s => $stateProvider.state(s));
};

RegisterAppRoutes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
