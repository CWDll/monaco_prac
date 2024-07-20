import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const initialMarkdown = `
# Hello World

This is a sample markdown.

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
\`\`\`

- List item 1
- List item 2
- List item 3

[Example Link](https://example.com)

![Sample Image](https://unsplash.it/600/400)
`;

const MarkdownSection: React.FC = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="markdown-input"
      />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={prism}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        className="markdown-output"
      />
    </div>
  );
};

export default MarkdownSection;
