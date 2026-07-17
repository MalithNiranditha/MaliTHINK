const items = [
  {
    role: "Software Engineer",
    company: "Eyerax Technologies",
    period: "2022 — 2023",
    desc: "Took full ownership of the front-end design and development of the BravoZero website. Designed and built responsive, user-friendly interfaces using HTML, CSS, JavaScript, and React, ensuring seamless performance across desktop, tablet, and mobile devices. Collaborated with the team to deliver clean, maintainable, and high-quality code while enhancing the overall user experience.",
    tags: ["React", "JavaScript", "CSS", "HTML"],
  },
  {
    role: "IT Co-Assistant",
    company: "Wimani Engineering Works",
    period: "2023",
    desc: "Provided technical support and managed day-to-day IT operations to ensure smooth business workflows. Assisted with system maintenance, software installation, troubleshooting hardware and network issues, and resolving technical problems while supporting employees with IT-related requirements.",
    tags: ["IT Support", "Systems Maintenance", "Technical Assistance"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              My Journey
            </p>
            <h2 className="text-5xl font-bold md:text-6xl">Experience</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-primary" />
          </div>
          <p className="text-muted-foreground md:text-right">
            3+ years of crafting digital experiences and growing as a designer and developer.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-5" />
          <div className="space-y-6">
            {items.map((it) => (
              <div key={it.role} className="relative pl-14 md:pl-20">
                <div className="absolute left-0 top-6 grid size-9 place-items-center rounded-full border-2 border-primary bg-background md:left-1">
                  <div className="size-2.5 rounded-full bg-primary shadow-glow" />
                </div>
                <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{it.role}</h3>
                      <p className="text-sm font-medium text-primary">{it.company}</p>
                    </div>
                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {it.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
