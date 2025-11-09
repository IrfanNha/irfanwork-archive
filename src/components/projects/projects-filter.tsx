"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Smartphone, Wrench, Layers, Sparkles } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

interface ProjectsFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterCategories = [
  {
    key: "all",
    label: "All Projects",
    icon: Layers,
  },
  {
    key: "web",
    label: "Web Apps",
    icon: Globe,
  },
  {
    key: "app",
    label: "Mobile Apps",
    icon: Smartphone,
  },
  {
    key: "tool",
    label: "Tools",
    icon: Wrench,
  },
  {
    key: "other",
    label: "Others",
    icon: Sparkles,
  },
];

export function ProjectsFilter({
  selectedFilter,
  onFilterChange,
}: ProjectsFilterProps) {
  const getCategoryCount = (category: string) => {
    if (category === "all") return PROJECTS.length;
    return PROJECTS.filter((project) => project.category === category)
      .length;
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((category) => {
          const isSelected = selectedFilter === category.key;
          const count = getCategoryCount(category.key);
          const Icon = category.icon;

          return (
            <Button
              key={category.key}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onFilterChange(category.key)}
              className="border-border hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-background"
                  >
                    {count}
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}