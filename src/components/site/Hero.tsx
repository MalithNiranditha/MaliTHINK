import { Mail } from "lucide-react";
import heroCharacter from "@/assets/character.png";
import { HeroParticles } from "./HeroParticles";
import { SkillsMarquee } from "./SkillsMarquee";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden bg-background pt-20 pb-6 flex-col justify-between"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 74% 42%, rgba(255, 106, 26, 0.08), transparent 42%), radial-gradient(ellipse at 66% 58%, rgba(255, 106, 26, 0.035), transparent 58%), radial-gradient(ellipse at 18% 18%, rgba(255, 106, 26, 0.02), transparent 45%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,7,6,0)_42%,rgba(11,7,6,0.18)_72%,rgba(11,7,6,0.7)_100%)]" />

      <div className="absolute inset-0 z-0">
        <HeroParticles />
      </div>

      {/* Main Content Area - Vertically Centered */}
      <div className="relative z-10 mx-auto my-auto grid max-w-6xl w-full items-center gap-8 px-6 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="space-y-4 md:-mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            Available for hire
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">
              Hey, I am <span className="font-semibold text-white">Malith</span>
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] md:text-7xl">
              <span className="text-gradient">UI/UX Designer</span>
            </h1>

            <p className="max-w-md pt-2 text-base font-medium text-gray-200 md:text-lg">
              I design and build meaningful digital experiences that connect with people.
            </p>
          </div>

          <div className="relative mt-12 flex flex-wrap items-center gap-3">
            <div className="pointer-events-none absolute -left-6 -top-4 h-20 w-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,106,26,0.18)_0%,rgba(255,106,26,0.08)_36%,rgba(255,106,26,0)_74%)] blur-3xl opacity-80" />

            <a
              href="mailto:malithugc13@gmail.com"
              className="relative z-20 pointer-events-auto rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-150 ease-out hover:scale-105"
            >
              Hire me
            </a>

            <a
              href="#connect"
              className="relative z-20 pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-150 ease-out hover:bg-card"
            >
              <Mail className="size-4" />
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="group relative flex min-h-[380px] items-center justify-center md:min-h-[550px] md:justify-end">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-[15%] right-[0%] w-[82%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.22)_0%,rgba(255,106,26,0.1)_34%,rgba(255,106,26,0)_72%)] blur-3xl opacity-80" />
          </div>

          <div className="relative z-10 -translate-y-6 md:-translate-y-8">
            <img
              src={heroCharacter}
              alt="Malith - UI/UX Designer character illustration"
              className="w-[100%] max-w-[720px] drop-shadow-2xl animate-gentle-float md:max-w-[850px]"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Visually Balanced Marquee - Positioned perfectly above the page bounds */}
      <div className="relative z-10 w-full mt-auto pt-6 pb-2">
        <SkillsMarquee />
      </div>
    </section>
  );
}