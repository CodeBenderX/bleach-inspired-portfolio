"use client";

import { Mail, XIcon } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
  type JSX,
  type RefAttributes,
} from "react";

import { LuGithub } from "react-icons/lu";

export const Linkedin = createLucideIcon("Linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "122w91",
    },
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "989691" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "109591" }],
]);

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

type SocialLink = {
  icon: typeof LuGithub | typeof Linkedin | typeof Mail;
  label: string;
  href: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:angelo.tiquio@outlook.com",
  },
  { icon: LuGithub, label: "GitHub", href: "https://github.com/CodeBenderX" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/angelotiquio23",
  },
];

type ContactSectionProps = {
  email?: string;
};

export const ContactSection = ({
  email = "angelo.tiquio@outlook.com",
}: ContactSectionProps) => {
  const { elementRef, isInView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={elementRef}
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden bg-black px-6 py-32 sm:px-12 lg:px-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-[28rem] font-bold leading-none text-white/[0.025]"
      >
        終
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-16 flex items-center gap-3">
          <span className="font-serif text-2xl text-red-600" aria-hidden="true">
            伍
          </span>
          <span className="h-px w-10 bg-red-600" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Final Chapter — Contact
          </span>
        </div>

        <h2
          id="contact-heading"
          className={`mb-6 font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-wide text-white transition-all duration-700 sm:text-7xl ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Let&apos;s <span className="text-red-600">Begin</span>
        </h2>

        <p
          className={`mb-12 max-w-xl text-lg leading-relaxed text-gray-400 transition-all delay-150 duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Have a project in mind, a role to fill, or a question about how
          something works? I read every message myself — no forms, no
          gatekeeping.
        </p>

        <div
          className={`flex items-center gap-6 transition-all delay-500 duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.label} profile (opens in a new tab)`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-colors duration-200 hover:border-red-600/60 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>

      <p className="relative z-10 mt-24 text-center text-xs uppercase tracking-[0.3em] text-gray-600">
        © {new Date().getFullYear()} Angelo Tiquio
      </p>
    </section>
  );
};
type IconShape =
  | ["path", { d: string; key?: string }]
  | [
      "rect",
      { width: string; height: string; x: string; y: string; key?: string },
    ]
  | ["circle", { cx: string; cy: string; r: string; key?: string }];

type LucideIconProps = ComponentPropsWithoutRef<"svg">;
type LucideIcon = ForwardRefExoticComponent<
  LucideIconProps & RefAttributes<SVGSVGElement>
>;

function createLucideIcon(name: string, shapes: IconShape[]): LucideIcon {
  const Component = forwardRef<SVGSVGElement, LucideIconProps>((props, ref) => {
    const { children, ...svgProps } = props;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label={name}
        {...svgProps}
      >
        {shapes.map(([tag, attributes], index) => {
          const { key, ...shapeProps } = attributes as Record<
            string,
            string | number | undefined
          >;
          const Tag = tag as keyof JSX.IntrinsicElements;

          return <Tag key={`${name}-${index}`} {...shapeProps} />;
        })}
        {children}
      </svg>
    );
  });

  Component.displayName = `${name}Icon`;
  return Component;
}
