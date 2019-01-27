import { MDCRipple } from '@material/ripple';
import '@material/button/mdc-button';
import { Binding } from 'data/angular';
import { CssClass as ThemeCssClass } from 'modules/theme';

interface Bindings {
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  ripple?: boolean;
  secondary?: boolean;
  primary?: boolean;
}

interface Changes extends ng.IOnChangesObject {
  raised: ng.IChangesObject<boolean>;
  unelevated: ng.IChangesObject<boolean>;
  outlined: ng.IChangesObject<boolean>;
  dense: ng.IChangesObject<boolean>;
  ripple: ng.IChangesObject<boolean>;
  secondary: ng.IChangesObject<boolean>;
  primary: ng.IChangesObject<boolean>;
}

const enum CssClass {
  Root = 'mdc-button',
  Raised = 'mdc-button--raised',
  Unelevated = 'mdc-button--unelevated',
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
    ripple: Binding.OneWayOptional,
    primary: Binding.OneWayOptional,
    secondary: Binding.OneWayOptional
  };

  // Bindings:
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  ripple?: boolean;
  primary?: boolean;
  secondary?: boolean;

  root: HTMLButtonElement | HTMLAnchorElement;
  mdcRipple?: MDCRipple;

  constructor(
    private $document: ng.IDocumentService,
    private $log: ng.ILogService,
    $element: ng.IRootElementService
  ) {
    this.root = $element[0] as HTMLButtonElement | HTMLAnchorElement;

    if (this.root.tagName !== 'BUTTON' && this.root.tagName !== 'A') {
      throw new Error('mdc-button directive can only be used on a <button> or <a> tag');
    }
  }

  $onInit = () => {
    this.root.classList.add(CssClass.Root);
    this.configureLabel();
    this.setDefaults();

    if (this.ripple) {
      this.mdcRipple = new MDCRipple(this.root);
    }

    if (this.primary && this.secondary) {
      this.$log.warn(
        `mdc-button directive has both primary and secondary attributes enabled.
        You should remove one of these attributes.`,
        this.root
      );
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
    if (changes.primary) {
      this.root.classList.toggle(ThemeCssClass.PrimaryBackground, this.primary);
    }
    if (changes.secondary) {
      this.root.classList.toggle(ThemeCssClass.SecondaryBackground, this.secondary);
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
    if (this.primary === undefined) {
      this.primary = true;
    }
  };
}
