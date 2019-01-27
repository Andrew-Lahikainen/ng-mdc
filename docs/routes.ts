import { StateProvider, Ng1StateDeclaration, UrlRouterProvider } from '@uirouter/angularjs';
import { AppContainer } from './containers/app/app.component';
import { ButtonPageContainer } from './containers/button-page/button-page.component';
import { ButtonExamplesComponent } from './components/button-examples/button-examples.component';
import { HtmlCompilerComponent } from './components/html-compiler/html-compiler.component';
import buttonDocs from './markdown/button.md';

const enum StateName {
  App = 'app',
  Button = 'button',
  ButtonDocs = 'buttonDocs',
  ButtonExamples = 'buttonExamples'
}

const App: Ng1StateDeclaration = {
  name: StateName.App,
  component: AppContainer.id
};

const Button: Ng1StateDeclaration = {
  name: StateName.Button,
  component: ButtonPageContainer.id,
  redirectTo: StateName.ButtonDocs,
  url: '/buttons'
};

const ButtonExamples: Ng1StateDeclaration = {
  name: StateName.ButtonExamples,
  parent: StateName.Button,
  component: ButtonExamplesComponent.id,
  url: '/examples'
};

const ButtonDocs: Ng1StateDeclaration = {
  name: StateName.ButtonDocs,
  parent: StateName.Button,
  component: HtmlCompilerComponent.id,
  url: '/docs',
  resolve: {
    html: () => buttonDocs
  }
};

const StateDeclarations: Ng1StateDeclaration[] = [App, Button, ButtonExamples, ButtonDocs];

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
