import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const socials = [
    {
      name: "Instagram",
      image: "/instagram.png",
    },
    {
      name: "LinkedIn",
      image: "/linkedin.png",
    },
    {
      name: "Spotify",
      image: "/spotify.png",
    },
    {
      name: "TikTok",
      image: "/tiktok.png",
    },
  ];

  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const [cliked, setCliked] = useState<boolean>(false);
  const animation = {
    scale: cliked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };
  useEffect(() => {
    const handleClick = () => {
      setCliked(true);
      setTimeout(() => {
        setCliked(false);
      }, 200);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [cliked]);

  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="flex items-center justify-center gap-0">
        {socials.map((social, index) => (
          <div
            className={`cursor-pointer relative duration-200 transition-opacity py-2 px-5 ${
              hoveredSocial && hoveredSocial !== social.name
                ? "opacity-50"
                : "opacity-100"
            }`}
            key={index}
            onMouseEnter={() => {
              setHoveredSocial(social.name);
              setRotation(Math.random() * 20 - 10);
            }}
            onMouseLeave={() => setHoveredSocial(null)}
            onClick={() => {
              setCliked(true);
            }}
          >
            <span className="text-lg block">{social.name}</span>
            <AnimatePresence>
              {hoveredSocial === social.name && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 w-full h-full flex items-center justify-center"
                  animate={animation}
                >
                  <motion.img
                    key={social.name}
                    src={social.image}
                    alt={social.name}
                    className="size-16"
                    initial={{
                      y: -40,
                      rotate: rotation,
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </main>
  );
}
