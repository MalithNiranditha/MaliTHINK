import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#connect", label: "Connect" },
];

export function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-background/70 px-5 py-3 backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
          <img
            src="/navbar-logo.png?v=3"
            alt="MaliTHINK Logo"
            className="size-8 object-contain"
          />
          <span>
            Mali<span className="text-primary">THINK.</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/Malith_Niranditha_CV.pdf"
          download="Malith_Niranditha_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-20 pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-150 ease-out hover:scale-105"
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">Download CV</span>
        </a>
      </nav>
    </header>
  );
}