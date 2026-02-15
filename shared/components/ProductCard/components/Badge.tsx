export const Badge = ({ text }: { text: string }) => {
  return (
    <span className="bg-Alert absolute start-2 top-2 z-3 rounded px-2 py-1 text-xs font-medium text-white">
      {text}
    </span>
  );
};
