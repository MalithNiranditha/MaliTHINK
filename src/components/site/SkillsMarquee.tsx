import { motion } from "framer-motion";

const skills = ["React", "Figma", "Canva", "Node.js", "HTML", "CSS"];

export function SkillsMarquee() {
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden bg-transparent py-2 md:py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "loop", duration: 24, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill}-${index}`} className="flex shrink-0 items-center">
            <span className="mx-12 text-sm font-semibold uppercase tracking-[0.35em] text-white md:mx-16 md:text-base">
              {skill}
            </span>
            {index < duplicatedSkills.length - 1 ? (
              <span className="text-xl font-semibold text-[#FC530A]">•</span>
            ) : null}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
