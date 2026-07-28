import { ArrowRight, Mail, Phone, Linkedin, Github } from "lucide-react";

export function Connect() {
  return (
    <section id="connect" className="relative py-20 md:py-24">
      <div className="absolute inset-x-0 bottom-0 h-96 bg-radial-glow opacity-60" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Let's work together
        </p>
        <h2 className="text-5xl font-bold md:text-6xl">Connect With Me</h2>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          Have a project in mind or just want to chat? I'd love to hear from you. Let's create
          something amazing together.
        </p>

        {/* Email Card */}
        <a
          href="mailto:malithniranditha@gmail.com
"
          className="group mt-10 flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 text-left backdrop-blur transition-all hover:border-primary/50"
        >
          <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Mail className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <p className="font-semibold">malithniranditha@gmail.com
</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </a>

        {/* Phone Card */}
        <a
          href="tel:+94767223502"
          className="group mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 text-left backdrop-blur transition-all hover:border-primary/50"
        >
          <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Phone className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone
            </p>
            <p className="font-semibold">+94 76 722 3502</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </a>

        {/* Social Buttons Grid */}
        <div className="mt-4 grid grid-cols-3 gap-4">

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/malith-niranditha"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            <Linkedin className="mx-auto size-6 text-primary transition-transform group-hover:scale-110" />
            <p className="mt-2 text-sm text-muted-foreground">LinkedIn</p>
          </a>

          {/* Figma Button - Fix Applied Here */}
          <a
            href="https://www.figma.com/design/knssTRBJX2zBpiy7S0FU4u/Untitled?node-id=0-1&t=88z5ah5fxYBZ7lhl-1"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            {/* Perfectly shaped Figma brand SVG */}
            <svg
              viewBox="0 0 24 24"
              className="mx-auto size-6 transition-transform group-hover:scale-110"
              aria-hidden="true"
            >
              <path d="M12 2a3 3 0 0 0-3 3v3h3a3 3 0 0 0 0-6Zm-3 6a3 3 0 0 0 0 6h3V8H9Zm0 6a3 3 0 1 0 3 3v-3H9Zm3-6h3a3 3 0 1 0-3-3v3Zm0 6v-3h3a3 3 0 1 1-3 3Z" fill="#FC530A" />
            </svg>
            <p className="mt-2 text-sm text-muted-foreground">Figma</p>
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/MalithNiranditha"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            <Github className="mx-auto size-6 text-primary transition-transform group-hover:scale-110" />
            <p className="mt-2 text-sm text-muted-foreground">GitHub</p>
          </a>

        </div>

        {/* Hire Me Button */}
        <a
          href="mailto:malithniranditha@gmail.com
"
          className="mt-6 block rounded-2xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
        >
          Hire Me
        </a>

        {/* Professional Footer Section with Logo */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>© 2026</span>
          <img
            src="/navbar-logo.png?v=3"
            alt="MaliTHINK Logo"
            className="size-5 object-contain"
          />
          <span>MaliTHINK — Designed & Built with passion</span>
        </div>
      </div>
    </section>
  );
}