'use client';

import React from 'react';
import { Message } from '@/shared/services/content';

type Props = {
  messages: Message[];
};

const AnnouncementBar = ({ messages }: Props) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="bg-primary relative flex min-h-[39px] w-full items-center justify-center px-4 py-2">
      <div className="text-center text-[11px] leading-snug font-medium text-white sm:text-[14px]">{messages[0]?.message}</div>
    </div>
  );
};

export default AnnouncementBar;
