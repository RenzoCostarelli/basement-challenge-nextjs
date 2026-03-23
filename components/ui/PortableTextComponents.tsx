import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-f-h1 md:text-f-h1-mobile text-basement-white">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-f-h2 md:text-f-h2-mobile text-basement-white">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-f-h3 md:text-f-h3-mobile text-basement-white">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="text-f-h4 md:text-f-h4-mobile text-basement-white">
        {children}
      </h4>
    ),

    normal: ({ children }) => (
      <p className="text-blog text-basement-light-grey">{children}</p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="text-f-h1 md:text-f-h1-mobile text-basement-white">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-3 mb-8 text-basement-light-grey">
        {children}
      </ul>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="text-blog">{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="text-basement-white font-semibold">{children}</strong>
    ),

    link: ({ children, value }) => (
      <Link
        href={value?.href}
        className="underline decoration-basement-grey hover:text-basement-white transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),

    code: ({ children }) => (
      <code className="bg-basement-dark-grey text-basement-orange px-1.5 py-0.5 rounded text-[0.9em] font-mono">
        {children}
      </code>
    ),
  },

  types: {
    code: ({ value }) => {
      const { code, language } = value;

      return (
        <div className="my-10">
          {language && (
            <div className="text-f-p text-basement-grey mb-2 uppercase tracking-wide">
              {language}
            </div>
          )}

          <pre className="bg-basement-dark-grey p-5 rounded-lg overflow-x-auto">
            <code className="text-f-t text-basement-white font-mono">
              {code}
            </code>
          </pre>
        </div>
      );
    },
  },
};
