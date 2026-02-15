import React from "react";

type Props = {
  when: boolean;
  children: React.ReactNode;
};

export const Display: React.FC<Props> = ({ when: isVisible, children }) => {
  if (!isVisible) return null;
  return <>{children}</>;
};
