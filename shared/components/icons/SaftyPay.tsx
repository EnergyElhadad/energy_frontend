import { SVGProps } from "react";

export const SaftyPayIcon = (Props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...Props}
    >
      <path
        d="M26.6602 6.66504H5.33203C3.85963 6.66504 2.66602 7.85865 2.66602 9.33105V22.6611C2.66602 24.1335 3.85963 25.3272 5.33203 25.3272H26.6602C28.1326 25.3272 29.3262 24.1335 29.3262 22.6611V9.33105C29.3262 7.85865 28.1326 6.66504 26.6602 6.66504Z"
        stroke="currentColor"
        strokeWidth="2.66602"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66602 13.3301H29.3262"
        stroke="currentColor"
        strokeWidth="2.66602"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
