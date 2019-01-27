import { Renderer } from 'marked';

export const CustomRenderer = new Renderer();

CustomRenderer.heading = (text: string, level: number): string =>
  `<h${level} mdc-headline-${level}>${text}</h${level}>`;

CustomRenderer.strong = (text: string) => `<strong mdc-body-2>${text}</strong>`;

CustomRenderer.paragraph = (text: string) => `<p mdc-body-1>${text}</p>`;
