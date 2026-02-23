'use client';

import React from 'react';
import { Message } from '@/shared/services/content';

type Props = {
  messages: Message[];
};

const AnnouncementBar = ({ messages }: Props) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="bg-primary relative flex h-[39px] w-full items-center justify-center overflow-hidden py-[6px]">
      <div className="text-[14px] font-medium text-white">{messages[0]?.message}</div>
    </div>
  );
};

export default AnnouncementBar;
