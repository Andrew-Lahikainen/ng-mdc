import mdcButton from './index';
import { CssClass } from './button.directive';

const mock = angular.mock;

describe('mdc-button', () => {
  let $compile: ng.ICompileService;
  let $scope: ng.IScope;

  beforeEach(mock.module(mdcButton));

  beforeEach(
    mock.inject((_$rootScope_: ng.IRootScopeService, _$compile_: ng.ICompileService) => {
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
    })
  );

  it('should throw error when used on an element other than an anchor or button', () => {
    const element = angular.element('<div mdc-button>hi</div>');
    expect(() => $compile(element)($scope)).toThrow();
  });

  it(`should have ${CssClass.Root} class on root element`, () => {
    const element = angular.element('<button mdc-button>Button</button>');
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Root)).toBe(true);
  });

  it(`should wrap button text inside a span with the ${CssClass.Label} class`, () => {
    const labelText: string = 'Button';
    const element = angular.element(`<button mdc-button>${labelText}</button>`);
    $compile(element)($scope);

    const labelElement: Element | null = element[0].querySelector(`span.${CssClass.Label}`);
    expect(labelElement).not.toBeFalsy();
    expect(labelElement!.textContent).toBe(labelText);
  });

  it('should upgrade to a ripple button by default', () => {
    const element = angular.element('<button mdc-button>Button</button>');
    $compile(element)($scope);

    expect(element[0].classList.contains('mdc-ripple-upgraded'));
  });

  it('should not upgrade to a ripple button when ripple=false', () => {
    const element = angular.element('<button mdc-button ripple="false">Button</button>');
    $compile(element)($scope);

    expect(element[0].classList.contains('mdc-ripple-upgraded')).not.toBe(true);
  });
});
