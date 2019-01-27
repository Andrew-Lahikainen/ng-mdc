import { Injectable, IDirectiveFactory } from 'angular';

type getDirectiveFactory = (id: string) => (classname: string) => Injectable<IDirectiveFactory>;
export const getDirectiveFactory: getDirectiveFactory = id => classname => () => ({
  restrict: 'A',
  controller: class implements ng.IController {
    static readonly id = id;
    static readonly $inject = ['$element'];

    root: HTMLElement;

    constructor($element: ng.IRootElementService) {
      this.root = $element[0];
      this.root.classList.add(classname);
    }
  }
});
