import { BLOCKS, INLINES } from '@contentful/rich-text-types';

// Rich-text renderers shared by blog posts and project case studies:
// styled tables (scrolling on small screens) and links (other sites open in a new tab).
export const tableAndLinkNodes = {
  [BLOCKS.TABLE]: (_node, children) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm text-left border-collapse">
        <tbody>{children}</tbody>
      </table>
    </div>
  ),
  [BLOCKS.TABLE_ROW]: (_node, children) => <tr className="border-b border-[var(--border)] last:border-0 align-top">{children}</tr>,
  [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
    <th className="p-3 font-semibold text-[var(--text-primary)] bg-[var(--accent-subtle)] [&_p]:mb-0">{children}</th>
  ),
  [BLOCKS.TABLE_CELL]: (_node, children) => <td className="p-3 [&_p]:mb-0">{children}</td>,
  [INLINES.HYPERLINK]: (node, children) => {
    const uri = node.data.uri;
    const internal = uri.startsWith('/') || uri.startsWith('https://kithnuwan.com');
    return (
      <a
        href={uri}
        className="text-[var(--accent)] underline underline-offset-2"
        {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    );
  },
};
