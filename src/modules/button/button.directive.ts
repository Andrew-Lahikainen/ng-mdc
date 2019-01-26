import { MDCRipple } from '@material/ripple';
import '@material/button/mdc-button';
import { Binding } from 'data/angular';

interface Bindings {
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  ripple?: boolean;
}

interface Changes extends ng.IOnChangesObject {
  raised: ng.IChangesObject<boolean>;
  unelevated: ng.IChangesObject<boolean>;
  outlined: ng.IChangesObject<boolean>;
  dense: ng.IChangesObject<boolean>;
  ripple: ng.IChangesObject<boolean>;
}

const enum CssClass {
  Root = 'mdc-button',
  Raised = 'mdc-button--raised',
  Unelevated = 'mdc-button--Unelevated',
  Outlined = 'mdc-button--outlined',
  Dense = 'mdc-button--dense',
  Label = 'mdc-button__label',
  Icon = 'mdc-button__icon'
}

export class ButtonDirective implements ng.IController, Bindings {
  static readonly id = 'mdcButton';
  static readonly restrict = 'A';
  static readonly $inject = ['$document', '$log', '$element'];
  static readonly bindings = {
    raised: Binding.OneWayOptional,
    unelevated: Binding.OneWayOptional,
    outlined: Binding.OneWayOptional,
    dense: Binding.OneWayOptional,
    ripple: Binding.OneWayOptional
  };

  // Bindings:
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  ripple?: boolean;

  root: HTMLButtonElement | HTMLAnchorElement;
  mdcRipple?: MDCRipple;

  constructor(
    private $document: ng.IDocumentService,
    private $log: ng.ILogService,
    $element: ng.IRootElementService
  ) {
    this.root = $element[0] as HTMLButtonElement | HTMLAnchorElement;

    if (this.root.tagName !== 'BUTTON' && this.root.tagName !== 'A') {
      throw new Error('mdc-button directive should be used on a <button> or <a> tag');
    }
  }

  $onInit = () => {
    this.root.classList.add(CssClass.Root);
    this.configureLabel();
    this.setDefaults();

    if (this.ripple) {
      this.mdcRipple = new MDCRipple(this.root);
    }
  };

  $onChanges = (changes: Changes) => {
    if (changes.dense) {
      this.root.classList.toggle(CssClass.Dense, this.dense);
    }
    if (changes.outlined) {
      this.root.classList.toggle(CssClass.Outlined, this.outlined);
    }
    if (changes.raised) {
      this.root.classList.toggle(CssClass.Raised, this.raised);
    }
    if (changes.unelevated) {
      this.root.classList.toggle(CssClass.Unelevated, this.unelevated);
    }
  };

  configureLabel = () => {
    const textnode = this.getFirstTextNode();

    if (!textnode && !this.root.querySelector(CssClass.Label)) {
      return this.$log.warn(
        `Could not find a label for this button, please ensure there is text or an element inside
        this button with the classname ${CssClass.Label}`,
        this.root
      );
    }

    const span: HTMLSpanElement = this.$document[0].createElement('span');
    span.classList.add(CssClass.Label);
    span.appendChild(textnode.cloneNode());
    textnode.replaceWith(span);
  };

  getFirstTextNode = (): ChildNode =>
    Array.from(this.root.childNodes).filter(el => el.nodeType === Node.TEXT_NODE)[0];

  setDefaults = () => {
    if (this.ripple === undefined) {
      this.ripple = true;
    }
  };
}
