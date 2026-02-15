import Image from "next/image";
import React from "react";
import { AboutSectionDesc } from "./components/AboutSectionDesc";

export const AboutSection = ({
  aboutImage,
  title,
  text,
}: {
  aboutImage: string;
  title: string;
  text: string;
}) => {
  return (
    <section className="mt-2">
      <div className="flex items-center gap-4 lg:gap-24.75">
        <AboutSectionDesc title={title} text={text} />
        <div className="hidden shrink-0 md:block">
          <Image
            src={aboutImage}
            alt="about-image"
            width={510}
            height={352}
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};
