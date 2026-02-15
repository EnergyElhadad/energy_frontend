'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Message } from '@/shared/services/content';

type Props = {
  messages: Message[];
};

const AnnouncementBar = ({ messages }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (track && messages.length > 0) {
        const totalWidth = track.scrollWidth;
        const oneSetWidth = totalWidth / 4;
        gsap.to(track, {
          x: -oneSetWidth,
          duration: 10 * (messages.length / 5 + 1),
          ease: 'none',
          repeat: -1,
        });
      }
    });
    return () => ctx.revert();
  }, [messages]);

  if (!messages || messages.length === 0) return null;

  return (
    <div className="bg-primary relative flex h-[39px] w-full items-center overflow-hidden py-[6px]">
      <div ref={trackRef} className="flex whitespace-nowrap">
        {messages.map((item, index) => (
          <React.Fragment key={`${item.id}-${index}`}>
            <div className="mx-8 inline-block text-[14px] font-medium text-white">{item.message}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
