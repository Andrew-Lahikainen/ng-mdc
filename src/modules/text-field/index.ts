import { TextFieldComponent } from './text-field.component';

const name: string = 'ng.mdc.text-field';

angular.module(name, []).component(TextFieldComponent.id, {
  controller: TextFieldComponent,
  bindings: TextFieldComponent.bindings
});

export default name;
