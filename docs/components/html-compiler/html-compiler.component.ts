import { IRootElementService, ICompileService, IChangesObject, IScope } from 'angular';
import { Binding } from 'data/angular';

interface Bindings {
  html?: string;
}

interface Changes extends ng.IOnChangesObject {
  html: IChangesObject<string>;
}

export class HtmlCompilerComponent implements ng.IController, Bindings {
  static readonly id = 'htmlCompiler';
  static readonly $inject = ['$scope', '$element', '$compile'];
  static readonly bindings = {
    html: Binding.OneWay
  };

  html?: string;

  constructor(
    private $scope: IScope,
    private $element: IRootElementService,
    private $compile: ICompileService
  ) {}

  $onChanges = (changes: Changes) => {
    if (changes.html && this.html) {
      this.$element.html(this.html);
      this.$compile(this.$element.contents())(this.$scope);
    }
  };
}
