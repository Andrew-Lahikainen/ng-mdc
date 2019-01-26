import { ButtonDirective } from './button.directive';

const name: string = 'ng.mdc.button';

angular.module(name, []).directive(ButtonDirective.id, () => ({
  controller: ButtonDirective,
  restrict: ButtonDirective.restrict,
  scope: ButtonDirective.bindings,
  bindToController: true
}));

export default name;
