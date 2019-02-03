import mdcButton from './index';
import { CssClass, Bindings } from './button.directive';

const mock = angular.mock;

const buildButtonTemplate = (label: string) => (options: Bindings) => {
  const optionAttrs = Object.keys(options)
    .reduce((acc: string, k: string) => `${acc} ${k}="${options[k as keyof Bindings]}"`, '')
    .trim();
  return `<button mdc-button ${optionAttrs}>${label}</button>`;
};

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
    const element = angular.element(buildButtonTemplate('Button')({}));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Root)).toBe(true);
  });

  it(`should wrap button text inside a span with the ${CssClass.Label} class`, () => {
    const labelText: string = 'Button';
    const element = angular.element(buildButtonTemplate(labelText)({}));
    $compile(element)($scope);

    const labelElement: Element | null = element[0].querySelector(`span.${CssClass.Label}`);
    expect(labelElement).not.toBeFalsy();
    expect(labelElement!.textContent).toBe(labelText);
  });

  it('should upgrade to a ripple button by default', () => {
    const element = angular.element(buildButtonTemplate('Button')({}));
    $compile(element)($scope);

    expect(element[0].classList.contains('mdc-ripple-upgraded'));
  });

  it('should not upgrade to a ripple button when ripple=false', () => {
    const element = angular.element(
      buildButtonTemplate('Button')({
        ripple: false
      })
    );
    $compile(element)($scope);

    expect(element[0].classList.contains('mdc-ripple-upgraded')).not.toBe(true);
  });

  it(`should have ${CssClass.Dense} on root element when dense=true`, () => {
    const element = angular.element(
      buildButtonTemplate('Button')({
        dense: true
      })
    );
    $compile(element)($scope);

    expect(element[0].classList.contains(CssClass.Dense)).toBe(true);
  });

  it(`should have ${CssClass.Outlined} on root element when outlined=true`, () => {
    const element = angular.element(buildButtonTemplate('Button')({ outlined: true }));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Outlined)).toBe(true);
  });

  it(`should have ${CssClass.Raised} on root element when raised=true`, () => {
    const element = angular.element(buildButtonTemplate('Button')({ raised: true }));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Raised)).toBe(true);
  });

  it(`should have ${CssClass.Unelevated} on root element when unelevated=true`, () => {
    const element = angular.element(buildButtonTemplate('Button')({ unelevated: true }));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Unelevated)).toBe(true);
  });

  it(`should have ${CssClass.Primary} on root element when primary=true`, () => {
    const element = angular.element(buildButtonTemplate('Button')({ primary: true }));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Primary)).toBe(true);
  });

  it(`should have ${CssClass.Secondary} on root element when secondary=true`, () => {
    const element = angular.element(buildButtonTemplate('Button')({ secondary: true }));
    $compile(element)($scope);
    expect(element[0].classList.contains(CssClass.Secondary)).toBe(true);
  });
});
