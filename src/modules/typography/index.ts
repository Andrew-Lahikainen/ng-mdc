import '@material/typography/mdc-typography';
import { CssClass } from './css-class';
import { getDirectiveFactory } from './directive-factory';

const name: string = 'mdc.ng.typography';

angular
  .module(name, [])
  .directive('mdcTypography', getDirectiveFactory('mdcTypography')(CssClass.Typography))
  .directive('mdcHeadline1', getDirectiveFactory('mdcHeadline1')(CssClass.Headline1))
  .directive('mdcHeadline2', getDirectiveFactory('mdcHeadline2')(CssClass.Headline2))
  .directive('mdcHeadline3', getDirectiveFactory('mdcHeadline3')(CssClass.Headline3))
  .directive('mdcHeadline4', getDirectiveFactory('mdcHeadline4')(CssClass.Headline4))
  .directive('mdcHeadline5', getDirectiveFactory('mdcHeadline5')(CssClass.Headline5))
  .directive('mdcHeadline6', getDirectiveFactory('mdcHeadline6')(CssClass.Headline6))
  .directive('mdcSubtitle1', getDirectiveFactory('mdcSubtitle1')(CssClass.Subtitle1))
  .directive('mdcSubtitle2', getDirectiveFactory('mdcSubtitle2')(CssClass.Subtitle2))
  .directive('mdcBody1', getDirectiveFactory('mdcBody1')(CssClass.Body1))
  .directive('mdcBody2', getDirectiveFactory('mdcBody2')(CssClass.Body2))
  .directive('mdcCaption', getDirectiveFactory('mdcCaption')(CssClass.Caption))
  .directive('mdcButton1', getDirectiveFactory('mdcButton1')(CssClass.Button))
  .directive('mdcOverline', getDirectiveFactory('mdcOverline')(CssClass.Overline));

export default name;
