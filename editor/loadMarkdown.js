import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const markdownToHtml = async (markdown) => {
  const parser = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify);
  const vfile = await parser().process(markdown);
  return vfile.value;
}

const loadMarkdown = async ({ editor, markdown }) => {
  const html = await markdownToHtml(markdown);
  editor.blocks.renderFromHTML(html);
};

export default loadMarkdown;
