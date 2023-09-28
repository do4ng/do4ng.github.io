import visit from 'unist-util-visit';
import type * as mdast from 'mdast';
import type * as unified from 'unified';
import toString from 'mdast-util-to-string';

export const plugin: unified.Plugin<[], mdast.Root> = () => {
  return (tree, file) => {
    visit(tree, 'heading', (node, index, parent) => {
      console.log(node);

      const html = toString(node);

      (node as any).type = 'html';
      (node as any).children = undefined;
      (node as any).value = `<h${
        (node as any).depth
      } id="${html}"><a href="#${html}">#</a>${html}</h${(node as any).depth}>`;
    });
    visit(tree, 'link', (node, index, parent) => {
      console.log(node);
    });
  };
};
