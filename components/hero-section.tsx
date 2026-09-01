"use client";

import { ArrowRight, Mail } from "lucide-react";
import { LuGithub } from "react-icons/lu";

type HeroSectionProps = {
  name?: string;
  role?: string;
};

export const HeroSection = ({
  name = "Angelo Tiquio",
  role = "Full-Stack Developer & Technical Educator",
}: HeroSectionProps) => {
  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewProjectsKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleViewProjects();
    }
  };

  return (
    <header className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black px-6 sm:px-12 lg:px-24">
      {/* Ambient red glow, top-right — stand-in for reiatsu / spiritual pressure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-red-600/20 blur-[120px] animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 h-[28rem] w-[28rem] rounded-full bg-red-900/20 blur-[100px]"
      />

      {/* Giant faded kanji watermark — 魂 (soul) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none font-serif text-[28rem] font-bold leading-none text-white/[0.03] sm:text-[36rem]"
      >
        魂
      </span>

      {/* Faint grid texture, Soul Society stonework nod */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* Eyebrow slash tag */}
        <div className="flex items-center gap-3 animate-fade-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
          <span className="h-px w-10 bg-red-600" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-red-500">
            {role}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[var(--font-display)] text-5xl uppercase leading-[0.95] tracking-wide text-white opacity-0 animate-fade-up [animation-delay:250ms] [animation-fill-mode:forwards] sm:text-8xl lg:text-8xl">
          {name}
          <span className="block text-red-600">Unleashed.</span>
        </h1>

        {/* Slash divider — animated draw-in, respects reduced motion */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 40"
          className="h-8 w-full max-w-md motion-reduce:opacity-100"
        >
          <line
            x1="0"
            y1="35"
            x2="600"
            y2="5"
            stroke="#dc2626"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1400"
            className="animate-slash-draw motion-reduce:[stroke-dashoffset:0] motion-reduce:opacity-100 [animation-delay:600ms]"
          />
        </svg>

        {/* Subtext — Shinigami-flavored copy, no lifted dialogue */}
        <p className="max-w-xl text-lg leading-relaxed text-gray-400 opacity-0 animate-fade-up [animation-delay:450ms] [animation-fill-mode:forwards] sm:text-xl">
          I build fast, accessible interfaces and cut through complexity to ship
          things that actually work. Every project is a Bankai release — full
          commitment, full power.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up [animation-delay:650ms] [animation-fill-mode:forwards]">
          <button
            type="button"
            onClick={handleViewProjects}
            onKeyDown={handleViewProjectsKeyDown}
            aria-label="View my projects"
            className="group inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            View Projects
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <a
            href="mailto:hello@example.com"
            aria-label="Send me an email"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-red-500 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Contact
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View my GitHub profile (opens in a new tab)"
            className="inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <LuGithub aria-hidden="true" className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-fade-up [animation-delay:1000ms] [animation-fill-mode:forwards] sm:flex"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-800">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-red-800 to-transparent" />
      </div>
    </header>
  );
};
