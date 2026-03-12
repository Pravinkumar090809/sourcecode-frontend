"use client";
import { useState } from "react";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const toolbarButtons = [
  { icon: "B", label: "Bold", before: "**", after: "**" },
  { icon: "I", label: "Italic", before: "_", after: "_" },
  { icon: "H1", label: "Heading 1", before: "# ", after: "" },
  { icon: "H2", label: "Heading 2", before: "## ", after: "" },
  { icon: "H3", label: "Heading 3", before: "### ", after: "" },
  { icon: "•", label: "Bullet List", before: "- ", after: "" },
  { icon: "1.", label: "Numbered List", before: "1. ", after: "" },
  { icon: "</>", label: "Code Block", before: "```javascript\n", after: "\n```" },
  { icon: "`", label: "Inline Code", before: "`", after: "`" },
  { icon: "🔗", label: "Link", before: "[", after: "](url)" },
  { icon: "✓", label: "Checkbox", before: "- [x] ", after: "" },
  { icon: "—", label: "Divider", before: "\n---\n", after: "" },
  { icon: ">", label: "Quote", before: "> ", after: "" },
  { icon: "🔴", label: "Red", before: '<span style="color:#ef4444">', after: "</span>" },
  { icon: "🟢", label: "Green", before: '<span style="color:#22c55e">', after: "</span>" },
  { icon: "🟡", label: "Yellow", before: '<span style="color:#f59e0b">', after: "</span>" },
  { icon: "🔵", label: "Blue", before: '<span style="color:#3b82f6">', after: "</span>" },
];

export default function MarkdownEditor({ value = "", onChange, placeholder = "Write description here..." }) {
  const [activeTab, setActiveTab] = useState("write");

  const insertText = (before, after) => {
    const textarea = document.getElementById("md-editor");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = (value || "").substring(start, end);
    const newText = (value || "").substring(0, start) + before + selectedText + after + (value || "").substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.2)" }}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-white/10 flex-wrap" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-1 mr-3 pr-3 border-r border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "write" ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <HiOutlinePencil /> Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "preview" ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <HiOutlineEye /> Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "split" ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Split
          </button>
        </div>

        {toolbarButtons.slice(0, 13).map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={() => insertText(btn.before, btn.after)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}

        <div className="h-4 w-px bg-white/10 mx-1" />
        {toolbarButtons.slice(13).map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={() => insertText(btn.before, btn.after)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm hover:bg-white/10 transition-all"
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div className={`${activeTab === "split" ? "grid grid-cols-2 divide-x divide-white/10" : ""}`}>
        {(activeTab === "write" || activeTab === "split") && (
          <div className="relative">
            <textarea
              id="md-editor"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full min-h-[350px] p-4 bg-transparent text-sm text-slate-300 resize-y focus:outline-none font-mono"
              style={{ lineHeight: 1.7 }}
            />
            <div className="absolute bottom-2 right-2 text-xs text-slate-600">
              {(value || "").length} chars
            </div>
          </div>
        )}

        {(activeTab === "preview" || activeTab === "split") && (
          <div className="min-h-[350px] p-4 overflow-auto">
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-slate-600 text-sm italic">Nothing to preview...</p>
            )}
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-white/10 text-xs text-slate-600" style={{ background: "rgba(0,0,0,0.2)" }}>
        **bold** | _italic_ | # Heading | `code` | - list
      </div>
    </div>
  );
}

// ✅ EXPORT THIS - Used in Product Detail Page
export function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-white mb-4 mt-6 pb-2 border-b border-white/10">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-white mb-3 mt-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full flex-shrink-0" />
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-slate-400 text-sm leading-relaxed mb-3">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-4 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 ml-1 text-slate-400 text-sm">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-400 text-sm flex items-start gap-2">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && (language || codeString.includes("\n"))) {
              return (
                <div className="my-4 rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.5)" }}>
                  {language && (
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                      <span className="text-xs text-slate-500 font-medium uppercase">{language}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(codeString)}
                        className="text-xs text-slate-500 hover:text-white transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono">{codeString}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-red-500 pl-4 py-2 my-4 bg-white/5 rounded-r-lg italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-red-400 hover:text-red-300 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
          hr: () => <hr className="border-white/10 my-6" />,
          span: ({ style, children }) => <span style={style}>{children}</span>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-white/10">
              <table className="w-full text-sm text-left text-slate-400">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 bg-white/5 font-semibold text-white border-b border-white/10">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-3 border-b border-white/10">{children}</td>,
          img: ({ src, alt }) => <img src={src} alt={alt || ""} className="rounded-xl max-w-full my-4" />,
          input: ({ type, checked }) => {
            if (type === "checkbox") {
              return (
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 rounded mr-2 text-xs ${
                    checked ? "bg-green-500/20 text-green-400" : "bg-white/10 text-slate-600"
                  }`}
                >
                  {checked ? "✓" : ""}
                </span>
              );
            }
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}