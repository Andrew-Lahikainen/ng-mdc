import template from './app.component.html';
import './app.component.scss';

export class AppContainer implements ng.IController {
  static readonly id = 'appContainer';
  static readonly template = template;
}
