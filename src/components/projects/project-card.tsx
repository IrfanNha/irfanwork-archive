"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Github, Eye, Code, ExternalLink, X } from "lucide-react";
import type { Project } from "@/constants/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        className="group"
      >
        <div className="border-b border-border py-8 transition-colors hover:bg-muted/30">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left: Content */}
            <div className="flex-1 space-y-4">
              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-light tracking-wide uppercase">
                <Badge
                  variant="outline"
                  className="border-border text-muted-foreground font-normal text-xs px-2 py-0.5 capitalize"
                >
                  {project.category}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <Code className="h-3 w-3" />
                  <span>{project.tech.length} Technologies</span>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-foreground/80 transition-colors flex-1">
                  {project.name}
                </h2>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.description}
              </p>

              {/* Tech */}
              {project.tech && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-muted-foreground/70 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 6 && (
                    <span className="text-xs text-muted-foreground/50 font-light">
                      +{project.tech.length - 6}
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="flex items-center gap-4 pt-2">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">Live Demo</span>
                  </Link>
                )}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    <span className="font-medium">Source Code</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: Thumbnail */}
            <div className="md:w-48 lg:w-64 flex-shrink-0 cursor-zoom-in">
              <div
                className="relative aspect-video md:aspect-square overflow-hidden rounded border border-border/50 group-hover:border-border transition-colors"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-contain rounded-lg shadow-xl"
              />
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
