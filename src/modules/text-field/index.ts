import { TextFieldComponent } from './text-field.component';

angular.module('ng.mdc.text-field', []).component(TextFieldComponent.id, {
  controller: TextFieldComponent,
  bindings: TextFieldComponent.bindings
});
