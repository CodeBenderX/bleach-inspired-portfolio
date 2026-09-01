"use client";

import { Code2, Palette, GraduationCap, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  included: string[];
};

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

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Modern websites and web applications built with React, Next.js, JavaScript, and TypeScript.",
    included: [
      "Responsive websites",
      "React / Next.js applications",
      "API integration",
    ],
  },
  {
    icon: Palette,
    title: "WEBSITE & UI DEVELOPMENT",
    description:
      "Clean, responsive interfaces focused on usability, accessibility, and a smooth user experience.",
    included: ["Landing pages", "Responsive layouts", "UI implementation"],
  },
  {
    icon: GraduationCap,
    title: "PROGRAMMING TUTORING",
    description:
      "Practical, beginner-friendly programming lessons that turn complex concepts into things you can actually understand.",
    included: [
      "Python & JavaScript",
      "Web development",
      "Programming fundamentals",
    ],
  },
  {
    icon: Wrench,
    title: "TECHNICAL SUPPORT",
    description:
      "Hands-on help troubleshooting websites, applications, and common development issues.",
    included: [
      "Bug troubleshooting",
      "Development setup",
      "Debugging assistance",
    ],
  },
];

type ServiceCardProps = {
  service: Service;
  index: number;
  isInView: boolean;
};

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <article
      className={`group relative flex flex-col gap-5 border border-white/10 bg-white/[0.02] p-8 transition-all duration-700 hover:border-red-600/50 hover:bg-white/[0.04] ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Corner accent, echoes the About portrait frame */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-red-600/0 transition-colors duration-300 group-hover:border-red-600/70"
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-red-600/40 bg-red-600/10 text-red-500 transition-colors duration-300 group-hover:bg-red-600/20">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>

      <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {service.title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-400">
        {service.description}
      </p>

      <ul className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
        {service.included.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-red-500"
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};

export const ServicesSection = () => {
  const { elementRef, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="services"
      ref={elementRef}
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-black px-6 py-24 sm:px-12 lg:px-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 select-none font-serif text-[24rem] font-bold leading-none text-white/[0.025]"
      >
        技
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-3">
          <span className="font-serif text-2xl text-red-600" aria-hidden="true">
            四
          </span>
          <span className="h-px w-10 bg-red-600" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Chapter 04 — Services
          </span>
        </div>

        <h2
          id="services-heading"
          className="mb-12 font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl"
        >
          Techniques <span className="text-red-600">Offered</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
