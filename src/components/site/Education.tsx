import campusLogo from "../../assets/campus_logo.png";

export function Education() {
  return (
    <section id="education" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Academic Background
          </p>
          <h2 className="text-5xl font-bold md:text-6xl">Education</h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-primary" />
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FC530A] bg-black shadow-[0_0_20px_rgba(252,83,10,0.4)] p-4">
              <img
                src={campusLogo}
                alt="SLIIT campus logo"
                className="h-full w-full object-contain"
                style={{ WebkitImageRendering: "optimize-contrast", imageRendering: "crisp-edges" }}
              />
            </div>
            <div className="flex-1 space-y-2 self-center">
              <h3 className="text-xl font-semibold text-foreground">
                Sri Lanka Institute of Information Technology (SLIIT)
              </h3>
              <p className="text-base font-medium text-primary">
                Bachelor of Science Honours in Information Technology Specialized in Information Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
