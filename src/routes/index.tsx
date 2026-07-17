import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Education } from "@/components/site/Education";
import { Connect } from "@/components/site/Connect";
import { HeroSpacingDebug } from "@/components/site/HeroSpacingDebug";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MaliTHINK — Portfolio" },
      {
        name: "description",
        content:
          "Malith is a UI/UX designer crafting meaningful digital experiences.",
      },
      { property: "og:title", content: "MaliTHINK — Portfolio" },
      {
        property: "og:description",
        content:
          "Portfolio of Malith — design systems, responsive interfaces, and pixel-perfect UI.",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" }
    ],
  }),
  component: Index,
});

export function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Connect />
      </main>
      <HeroSpacingDebug />
    </div>
  );
}