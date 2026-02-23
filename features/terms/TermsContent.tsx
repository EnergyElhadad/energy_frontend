'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Section {
  title: string;
  items: string[];
}

interface TermsContentProps {
  sections: Section[];
}

export const TermsContent = ({ sections }: TermsContentProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(`section-${index}`);
    if (element) {
      // Offset for sticky header
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((_, index) => document.getElementById(`section-${index}`));

      let currentActiveIndex = 0;
      const offset = 300; // Distance from top viewport where section becomes active

      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset) {
            currentActiveIndex = index;
          }
        }
      });

      // Special case: if we are at the very bottom of the document, force the last section to be active
      const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50;
      if (isAtBottom && sectionElements.length > 0) {
        currentActiveIndex = sectionElements.length - 1;
      }

      setActiveSection(currentActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Update indicator position based on active section
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[activeSection] as HTMLElement;
      if (activeElement) {
        setIndicatorStyle({
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="relative flex flex-col items-start gap-8 lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="z-10 h-fit w-full lg:sticky lg:top-[20px] lg:w-1/4">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="relative">
            {/* The vertical tracking line (background) */}
            <div className="absolute start-0 top-0 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800" />

            {/* The animated active indicator */}
            <div
              className="bg-primary absolute start-0 w-[2px] transition-all duration-300 ease-in-out"
              style={{
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
              }}
            />

            <ul ref={listRef} className="relative m-0 flex flex-col p-0 text-sm">
              {sections.map((section, index) => (
                <li key={index} className="py-2.5 ps-4">
                  <button
                    onClick={() => scrollToSection(index)}
                    className={`w-full text-start text-sm transition-colors duration-200 md:text-[15px] ${
                      activeSection === index ? 'text-primary font-bold' : 'hover:text-primary font-medium text-gray-500'
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-full rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-10 lg:w-3/4">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div id={`section-${index}`} key={index}>
              <h2 className="mb-6 text-xl font-bold text-gray-800 md:text-2xl">{section.title}</h2>
              <ul className="marker:text-primary list-outside list-disc space-y-3 ps-5 leading-relaxed text-gray-600">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
