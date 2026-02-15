"use client";

import * as React from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

interface DirectionProviderProps {
  children: React.ReactNode;
  dir: "rtl" | "ltr";
}

export function DirectionProvider({ children, dir }: DirectionProviderProps) {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
