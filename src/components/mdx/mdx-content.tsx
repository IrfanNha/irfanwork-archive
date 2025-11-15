import Image, { ImageProps } from "next/image";
import { isValidElement, type ReactNode } from "react";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/blog/code-block";

type CalloutVariant = "info" | "success" | "warning" | "danger" | "tip";

const CALLOUT_CONFIG: Record<
  CalloutVariant,
  {
    style: string;
    icon: LucideIcon;
  }
> = {
  info: {
    style: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  success: {
    style:
      "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  warning: {
    style:
      "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
    icon: AlertTriangle,
  },
  danger: {
    style: "border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400",
    icon: XCircle,
  },
  tip: {
    style:
      "border-violet-500/30 bg-violet-500/5 text-violet-600 dark:text-violet-400",
    icon: Lightbulb,
  },
};

interface CalloutProps {
  title?: string;
  variant?: CalloutVariant;
  children: ReactNode;
}

const Callout = ({ title, variant = "info", children }: CalloutProps) => {
  const config = CALLOUT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-xl border px-4 py-4 shadow-sm md:px-5",
        config.style
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex items-center gap-2 sm:block">
          <Icon className="h-5 w-5 flex-shrink-0" />
          {title && <p className="font-semibold sm:hidden">{title}</p>}
        </div>
        <div className="flex-1 space-y-2">
          {title && <p className="hidden font-semibold sm:block">{title}</p>}
          <div className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="overflow-hidden rounded-xl border border-border/60">
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

const Anchor = ({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className={cn(
      "font-medium text-foreground underline decoration-dotted underline-offset-4 transition hover:text-foreground/80",
      className
    )}
  />
);

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const child = props.children;

  if (
    isValidElement<{
      children: string;
      className?: string;
      metastring?: string;
    }>(child) &&
    typeof child.props.children === "string"
  ) {
    const language = child.props.className?.replace("language-", "") || "text";
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
