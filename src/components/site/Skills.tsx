import { Brush, Code2, Smartphone, TerminalSquare, Database, BriefcaseBusiness } from "lucide-react";

const skills = [
  { icon: Brush, title: "UI/UX Design", desc: "Figma, Adobe XD, Wireframing & Prototyping", level: 90 },
  { icon: Code2, title: "Frontend Development", desc: "React, TypeScript, Tailwind CSS, Next.js", level: 85 },
  { icon: Smartphone, title: "Mobile Design", desc: "iOS & Android UI, Responsive Layouts", level: 80 },
  { icon: TerminalSquare, title: "Development Tools", desc: "GitHub, VS Code, Postman, Android Studio", level: 86 },
  { icon: Database, title: "Database Management", desc: "MySQL, MongoDB, Database Design & SQL", level: 85 },
  { icon: BriefcaseBusiness, title: "Professional Skills", desc: "Problem Solving, Teamwork, Communication, Leadership", level: 92 },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What I do
            </p>
            <h2 className="text-5xl font-bold md:text-6xl">My Skills</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-primary" />
          </div>
          <p className="text-muted-foreground md:text-right">
            A blend of design thinking and technical expertise to craft exceptional digital
            experiences.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <div className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                      Proficiency
                    </span>
                    <span className="font-bold text-primary">{s.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-primary transition-all duration-1000"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
