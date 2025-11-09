// src/components/blog/post-content.tsx
"use client";

import { motion } from "framer-motion";
import { Post, StrapiRichTextNode } from "@/types";
import { ANIMATION_VARIANTS } from "@/constants";
import Image from "next/image";
import { CodeBlock } from "./code-block";
import { ReactElement } from "react";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const renderContent = (content: StrapiRichTextNode[]) => {
    const processedContent: ReactElement[] = [];
    let i = 0;

    while (i < content.length) {
      const block = content[i];

      if (
        block.type === "paragraph" &&
        block.children?.[0]?.text?.startsWith("```")
      ) {
        const firstLine = block.children[0].text;
        const language = firstLine.replace("```", "").trim() || "text";

        const codeLines: string[] = [];
        let j = i + 1;
        let foundClosing = false;

        const restOfFirstLine = firstLine
          .substring(firstLine.indexOf("```") + 3 + language.length)
          .trim();
        if (restOfFirstLine) {
          codeLines.push(restOfFirstLine);
        }

        while (j < content.length) {
          const nextBlock = content[j];
          if (nextBlock.type === "paragraph" && nextBlock.children?.[0]?.text) {
            const text = nextBlock.children[0].text;
            if (text.includes("```")) {
              foundClosing = true;

              const beforeClosing = text
                .substring(0, text.indexOf("```"))
                .trim();
              if (beforeClosing) {
                codeLines.push(beforeClosing);
              }
              break;
            } else {
              codeLines.push(text);
            }
          } else {
            break;
          }
          j++;
        }

        if (codeLines.length > 0 || foundClosing) {
          processedContent.push(
            <CodeBlock
              key={`code-${i}`}
              language={language}
              allowCopy={true}
              allowDownload={language === "python"}
              isExecutable={language === "python"}
              showLineNumbers={codeLines.length > 3}
            >
              {codeLines.join("\n")}
            </CodeBlock>
          );
          i = j + 1; // Skip processed blocks
          continue;
        }
      }

      // Regular paragraph processing
      switch (block.type) {
        case "paragraph":
          processedContent.push(
            <p key={`p-${i}`} className="mb-4 leading-relaxed text-foreground">
              {block.children?.map((child, childIndex) => {
                if (child.bold && child.italic) {
                  return (
                    <strong key={childIndex}>
                      <em>{child.text}</em>
                    </strong>
                  );
                }
                if (child.bold) {
                  return (
                    <strong key={childIndex} className="font-semibold">
                      {child.text}
                    </strong>
                  );
                }
                if (child.italic) {
                  return (
                    <em key={childIndex} className="italic">
                      {child.text}
                    </em>
                  );
                }
                if (child.underline) {
                  return (
                    <u key={childIndex} className="underline">
                      {child.text}
                    </u>
                  );
                }
                return <span key={childIndex}>{child.text}</span>;
              })}
            </p>
          );
          break;

        case "heading":
          const level = (block as any).level || 2;

          const renderHeading = () => {
            const headingContent = block.children?.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ));

            const baseClasses = "font-bold mb-4 mt-8 text-foreground";

            switch (level) {
              case 1:
                return (
                  <h1 className={`${baseClasses} text-3xl`}>
                    {headingContent}
                  </h1>
                );
              case 2:
                return (
                  <h2 className={`${baseClasses} text-2xl`}>
                    {headingContent}
                  </h2>
                );
              case 3:
                return (
                  <h3 className={`${baseClasses} text-xl`}>{headingContent}</h3>
                );
              case 4:
                return (
                  <h4 className={`${baseClasses} text-lg`}>{headingContent}</h4>
                );
              case 5:
                return (
                  <h5 className={`${baseClasses} text-base font-bold`}>
                    {headingContent}
                  </h5>
                );
              case 6:
                return (
                  <h6 className={`${baseClasses} text-sm font-bold`}>
                    {headingContent}
                  </h6>
                );
              default:
                return (
                  <h2 className={`${baseClasses} text-2xl`}>
                    {headingContent}
                  </h2>
                );
            }
          };

          processedContent.push(<div key={`h-${i}`}>{renderHeading()}</div>);
          break;

        case "list":
          const isOrdered = (block as any).format === "ordered";
          const listItems = block.children?.map((listItem, listIndex) => (
            <li key={listIndex} className="mb-2 text-foreground">
              {(listItem as any).children?.map(
                (child: any, childIndex: number) => {
                  if (child.bold) {
                    return <strong key={childIndex}>{child.text}</strong>;
                  }
                  if (child.italic) {
                    return <em key={childIndex}>{child.text}</em>;
                  }
                  return <span key={childIndex}>{child.text}</span>;
                }
              )}
            </li>
          ));

          processedContent.push(
            isOrdered ? (
              <ol key={`ol-${i}`} className="mb-6 ml-6 list-decimal space-y-1">
                {listItems}
              </ol>
            ) : (
              <ul key={`ul-${i}`} className="mb-6 ml-6 list-disc space-y-1">
                {listItems}
              </ul>
            )
          );
          break;

        case "code":
          const codeText =
            block.children?.map((child) => child.text).join("") || "";
          const codeLanguage = (block as any).language;
          const filename = (block as any).filename;

          processedContent.push(
            <CodeBlock
              key={`strapi-code-${i}`}
              language={codeLanguage}
              filename={filename}
              allowCopy={true}
              allowDownload={codeLanguage}
              isExecutable={codeLanguage}
              showLineNumbers={codeText.split("\n").length > 3}
            >
              {codeText}
            </CodeBlock>
          );
          break;

        case "quote":
        case "blockquote":
          processedContent.push(
            <blockquote
              key={`quote-${i}`}
              className="border-l-4 border-border pl-6 py-2 mb-6 italic text-muted-foreground bg-muted/30 rounded-r-lg"
            >
              <div className="text-foreground/80">
                {block.children?.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </div>
            </blockquote>
          );
          break;

        case "link":
          processedContent.push(
            <a
              key={`link-${i}`}
              href={(block as any).url}
              className="text-foreground hover:text-foreground/80 underline underline-offset-2 hover:underline-offset-4 transition-all"
              target={(block as any).target || "_self"}
              rel={
                (block as any).target === "_blank"
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {block.children?.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </a>
          );
          break;

        case "image":
          const imageData = block as any;
          processedContent.push(
            <figure key={`img-${i}`} className="mb-6">
              <Image
                src={imageData.image?.url || imageData.url}
                alt={imageData.image?.alternativeText || imageData.alt || ""}
                width={800}
                height={500}
                className="w-full h-auto rounded-lg"
              />
              {imageData.image?.caption && (
                <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
                  {imageData.image.caption}
                </figcaption>
              )}
            </figure>
          );
          break;

        default:
          if (block.children && Array.isArray(block.children)) {
            processedContent.push(
              <div key={`default-${i}`} className="mb-4 text-foreground">
                {block.children.map((child, childIndex) => {
                  if (typeof child === "object" && child.text) {
                    if (child.bold) {
                      return <strong key={childIndex}>{child.text}</strong>;
                    }
                    if (child.italic) {
                      return <em key={childIndex}>{child.text}</em>;
                    }
                    return <span key={childIndex}>{child.text}</span>;
                  }
                  return <span key={childIndex}>{String(child)}</span>;
                })}
              </div>
            );
          } else {
            processedContent.push(
              <div
                key={`unsupported-${i}`}
                className="my-4 p-3 bg-muted rounded-lg border-l-4 border-border"
              >
                <p className="text-sm text-muted-foreground">
                  Unsupported content type: {block.type}
                </p>
                <pre className="text-xs mt-2 text-muted-foreground overflow-x-auto">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            );
          }
          break;
      }

      i++;
    }

    return processedContent;
  };

  return (
    <motion.div
      className="prose prose-lg max-w-none 
        prose-headings:text-foreground 
        prose-p:text-foreground 
        prose-strong:text-foreground 
        prose-a:text-foreground 
        prose-a:no-underline 
        hover:prose-a:underline 
        prose-blockquote:text-muted-foreground 
        prose-blockquote:border-border
        prose-code:text-foreground 
        prose-pre:bg-muted
        prose-li:text-foreground
        prose-ul:text-foreground
        prose-ol:text-foreground"
      variants={ANIMATION_VARIANTS.fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      <div className="space-y-4">{renderContent(post.content)}</div>
    </motion.div>
  );
}
