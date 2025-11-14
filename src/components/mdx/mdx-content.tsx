import Image, { ImageProps } from "next/image";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/blog/code-block";

type CalloutVariant = "info" | "success" | "warning" | "danger";

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  success:
    "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  warning:
    "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  danger:
    "border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400",
};

interface CalloutProps {
  title?: string;
  icon?: string;
  variant?: CalloutVariant;
  children: ReactNode;
}

const Callout = ({
  title,
  icon = "💡",
  variant = "info",
  children,
}: CalloutProps) => (
  <div
    className={cn(
      "my-6 rounded-2xl border px-5 py-4 text-sm shadow-sm",
      CALLOUT_STYLES[variant]
    )}
  >
    <div className="flex items-start gap-3">
      <span className="text-xl leading-none">{icon}</span>
      <div className="space-y-2">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-muted-foreground text-base">{children}</div>
      </div>
    </div>
  </div>
);

interface TechBadgesProps {
  items: string[];
}

const TechBadges = ({ items }: TechBadgesProps) => (
  <div className="flex flex-wrap gap-2 py-4">
    {items.map((item) => (
      <Badge
        key={item}
        variant="outline"
        className="border-border/50 bg-muted/40 text-xs font-medium"
      >
        {item}
      </Badge>
    ))}
  </div>
);

interface VideoProps {
  src: string;
  title?: string;
  caption?: string;
}

const Video = ({ src, title = "Project demo", caption }: VideoProps) => (
  <figure className="my-8 space-y-4">
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-black">
      {src.includes("youtube") || src.includes("youtu.be") ? (
        <iframe
          src={src}
          title={title}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls className="w-full">
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
    {caption && (
      <figcaption className="text-center text-sm text-muted-foreground">
        {caption}
      </figcaption>
    )}
  </figure>
);

const MdxImage = ({ alt = "", className, ...rest }: ImageProps) => (
  <figure className="my-8 space-y-3">
    <div className="overflow-hidden rounded-3xl border border-border/60">
      <Image
        {...rest}
        alt={alt}
        className={cn(
          "h-auto w-full object-cover transition hover:scale-[1.01]",
          className
        )}
      />
    </div>
    {alt && (
      <figcaption className="text-center text-sm text-muted-foreground">
        {alt}
      </figcaption>
    )}
  </figure>
);

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link
    {...props}
    className={cn(
      "font-medium text-foreground underline decoration-dotted underline-offset-4 transition hover:text-foreground/80",
      props.className
    )}
  />
);

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const child = props.children as ReactElement;

  if (
    child &&
    typeof child === "object" &&
    "props" in child &&
    typeof child.props.children === "string"
  ) {
    const language =
      child.props.className?.replace("language-", "") || "text";
    return (
      <CodeBlock language={language} filename={child.props?.metastring}>
        {child.props.children}
      </CodeBlock>
    );
  }

  return <pre {...props} />;
};

export const mdxComponents = {
  a: Anchor,
  pre: Pre,
  Image: MdxImage,
  Callout,
  TechBadges,
  Video,
};

