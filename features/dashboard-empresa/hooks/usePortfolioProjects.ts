"use client";

import { useMemo, useState } from "react";
import { portfolioProjects } from "@/features/dashboard-empresa/services/mockData";
import type { PortfolioProject } from "@/features/dashboard-empresa/types/investors";

export function usePortfolioProjects(
  initialProjects: PortfolioProject[] = portfolioProjects,
) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeProjectId, setActiveProjectId] = useState(
    initialProjects[0]?.id ?? "",
  );

  const activeProject = useMemo(
    () =>
      projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects],
  );

  function advanceProject(projectId: string) {
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              probability: Math.min(project.probability + 8, 96),
              phase:
                project.phase === "Exploracion"
                  ? "Due diligence"
                  : project.phase,
              updatedAt: "Ahora",
            }
          : project,
      ),
    );
  }

  function removeProject(projectId: string) {
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
    setActiveProjectId((current) => {
      if (current !== projectId) {
        return current;
      }

      return projects.find((project) => project.id !== projectId)?.id ?? "";
    });
  }

  return {
    projects,
    activeProject,
    activeProjectId,
    setActiveProjectId,
    advanceProject,
    removeProject,
  };
}
