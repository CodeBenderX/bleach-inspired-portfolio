"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

const useInView = <T extends HTMLElement>({
  threshold = 0,
}: {
  threshold?: number;
}) => {
  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isInView };
};
type Project = {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Project One",
    description:
      "A short, punchy description of what this project does and the problem it solves.",
    imageSrc: "/placeholder-project-1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description:
      "A short, punchy description of what this project does and the problem it solves.",
    imageSrc: "/placeholder-project-2.jpg",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourusername/project-two",
  },
  {
    title: "Sigwa — Weather at a Glance",
    description:
      "Sigwa is a lightweight weather forecasting app built with Python and Django, designed to provide users with quick and reliable access to current weather conditions and forecasts. Simple, practical, and easy to use—Sigwa helps you know what the weather has in store before you step outside.",
    imageSrc: "/sigwa.png",
    tags: ["React", "Python", "Django", "OpenWeatherMap API"],
    repoUrl: "https://github.com/yourusername/project-three",
  },
];

type ProjectCardProps = {
  project: Project;
  index: number;
  isInView: boolean;
};

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] transition-all duration-700 hover:border-red-600/60 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        {/* Diagonal "seal" overlay, dissolves on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:opacity-0"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 origin-top-left scale-x-100 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/0 transition-all duration-500 group-hover:from-red-600/10"
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        <ul
          className="flex flex-wrap gap-2"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-red-600/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-red-400"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title} (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors duration-200 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              <LuGithub aria-hidden="true" className="h-4 w-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const ProjectsSection = () => {
  const { elementRef, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={elementRef}
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-black px-6 py-24 sm:px-12 lg:px-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 select-none font-serif text-[24rem] font-bold leading-none text-white/[0.025]"
      >
        闘
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-3">
          <span className="font-serif text-2xl text-red-600" aria-hidden="true">
            参
          </span>
          <span className="h-px w-10 bg-red-600" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Chapter 03 — Projects
          </span>
        </div>

        <h2
          id="projects-heading"
          className="mb-12 font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl"
        >
          Battles <span className="text-red-600">Fought</span>
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
