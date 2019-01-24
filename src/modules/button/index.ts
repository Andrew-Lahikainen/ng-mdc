import { ButtonDirective } from './button.directive';

angular.module('ng.mdc.button', []).directive(ButtonDirective.id, () => ({
  controller: ButtonDirective,
  restrict: ButtonDirective.restrict
}));
