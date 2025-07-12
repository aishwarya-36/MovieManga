import React from "react";

type Tech = {
  name: string;
  logo: string;
  url: string;
};

const techStack: Tech[] = [
  {
    name: "React",
    logo: "/logos/react.svg",
    url: "https://react.dev/",
  },
  {
    name: "Tailwind CSS",
    logo: "/logos/tailwind.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "FastAPI",
    logo: "/logos/fastapi.svg",
    url: "https://fastapi.tiangolo.com/",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className=" dark:bg-[#1e2233] dark:text-[#cdd6f4] bg-[#f4f0ec] text-[#4c4769] py-4 w-full mt-auto shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <p className="text-sm mb-2 mr-2 sm:mb-0">
          Created Using
        </p>
        {techStack.map((tech) => (
          <a
            key={tech.name}
            href={tech.url}
            target="_blank"
            className="hover:scale-105 transition-transform mr-2"
          >
            <img src={tech.logo} alt={tech.name} className="h-6 w-auto" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
