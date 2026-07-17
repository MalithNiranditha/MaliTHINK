import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

export function HeroParticles() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouchDevice(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: false,
      },
      pauseOnOutsideViewport: true,
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: isTouchDevice ? 24 : 52,
          density: {
            enable: false,
          },
        },
        color: {
          value: ["#FF6A1A", "#FFF4EA"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.28, max: 0.9 },
          animation: {
            enable: true,
            speed: 0.6,
            sync: false,
            minimumValue: 0.22,
          },
        },
        size: {
          value: { min: 1.1, max: 2.7 },
        },
        move: {
          enable: true,
          speed: isTouchDevice ? 0.3 : 0.7,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#FF6A1A",
          opacity: 0.22,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: !isTouchDevice,
            mode: "repulse",
          },
          onClick: {
            enable: !isTouchDevice,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.35,
          },
          push: {
            quantity: 4,
          },
        },
      },
      background: {
        color: {
          value: "transparent",
        },
      },
    }),
    [isTouchDevice],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="hero-particles"
        options={options}
        className="pointer-events-none size-full"
      />
    </ParticlesProvider>
  );
}
