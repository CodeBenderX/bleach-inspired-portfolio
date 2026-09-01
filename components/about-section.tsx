"use client";

import Image from "next/image";
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

type SkillMeter = {
  label: string;
  percentage: number;
};

const SKILL_METERS: SkillMeter[] = [
  { label: "Frontend (React / Next.js)", percentage: 85 },
  { label: "Backend & APIs", percentage: 80 },
  { label: "UI / UX Design", percentage: 70 },
  { label: "DevOps & Tooling", percentage: 65 },
];

type AboutSectionProps = {
  bio?: string[];
  imageSrc?: string;
};

export const AboutSection = ({
  bio = [
    "I'm a full-stack developer who approaches every build with intention—writing thoughtful, maintainable solutions designed to perform in real-world environments.",

    "While I'm early in my professional development career, my experience has strengthened my ability to break down complex problems, learn quickly, and turn ideas into practical, user-focused solutions. I bring a strong foundation in technology, education, and problem-solving—and I'm committed to continuously growing with every project I build.",
  ],
  imageSrc = "/portrait-photo.jpeg",
}: AboutSectionProps) => {
  const { elementRef, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={elementRef}
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-black px-6 py-24 sm:px-12 lg:px-24"
    >
      {/* Faint kanji watermark, distinct from hero's 魂 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 select-none font-serif text-[24rem] font-bold leading-none text-white/[0.025]"
      >
        経
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Chapter marker */}
        <div className="mb-16 flex items-center gap-3">
          <span className="font-serif text-2xl text-red-600" aria-hidden="true">
            弐
          </span>
          <span className="h-px w-10 bg-red-600" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Chapter 02 — About
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[minmax(0,340px)_1fr]">
          {/* Portrait, framed like a HUD status window */}
          <div
            className={`relative transition-all duration-700 ${
              isInView
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-red-600/40">
              <Image
                src={imageSrc}
                alt="Portrait photo"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="object-cover contrast-125"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
              />
            </div>
            {/* Corner brackets */}
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-red-500"
            />
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-red-500"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-red-500"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-red-500"
            />
          </div>

          {/* Bio + skill meters */}
          <div
            className={`transition-all delay-150 duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2
              id="about-heading"
              className="mb-8 font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl"
            >
              Behind the <span className="text-red-600">Code</span>
            </h2>

            <div className="mb-12 flex flex-col gap-4">
              {bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl text-lg leading-relaxed text-gray-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skill meters styled as spiritual-pressure readouts */}
            <div
              className="flex flex-col gap-5"
              role="list"
              aria-label="Skill proficiency levels"
            >
              {SKILL_METERS.map((skill, index) => (
                <div key={skill.label} role="listitem">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-medium uppercase tracking-wider text-white">
                      {skill.label}
                    </span>
                    <span
                      className="text-sm font-medium text-red-500"
                      aria-hidden="true"
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-label={skill.label}
                    aria-valuenow={skill.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-500 transition-[width] duration-1000 ease-out"
                      style={{
                        width: isInView ? `${skill.percentage}%` : "0%",
                        transitionDelay: `${300 + index * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
